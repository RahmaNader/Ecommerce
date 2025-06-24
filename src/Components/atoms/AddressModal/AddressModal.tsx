import React, { useState, useEffect } from "react";
import "./AddressModal.css";
import { Button } from "@components/atoms";
import { saveAddressForUser } from "@utils/addressUtils";
import { AddressProps } from "@types";
import Cookies from "js-cookie";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import { postAddress } from "@services/api/address";
import apiClient from "src/apiClient";

type City = {
  cityName: string;
  cityNameAr: string;
  regularShippingCost: number;
  fastShippingCost: number;
};

const toEnglishDigits = (s: string) =>
  s.replace(/[\u0660-\u0669]/g, (d) => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);

interface AddressModalProps {
  closeModal: () => void;
  addAddress: (newAddress: AddressProps) => void;
  prefillData?: AddressProps;
  isArabic?: boolean;
}

const AddressModal: React.FC<AddressModalProps> = ({
  closeModal,
  addAddress,
  prefillData,
  isArabic = false,
}) => {
  const { t } = useTranslation();
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const token = Cookies.get("authToken"); // you already set this cookie on login
        const { data } = await apiClient.get(
          "/ShippingCosts/getCostsForAllCities",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // BE returns `{ shippingCosts: { $values: [...] } }`
        const received: City[] = data?.shippingCosts?.$values ?? [];
        setCities(received);
      } catch (err) {
        console.error(
          "[AddressModal] Couldn’t fetch cities, falling back:",
          err
        );
        // ⤵️  If you still want a fallback list, put it here:
        // setCities(fallbackEnglishArray.map((c, i) => ({
        //   cityName: c,
        //   cityNameAr: fallbackArabicArray[i],
        //   regularShippingCost: 0,
        //   fastShippingCost: 0,
        // })));
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  const [newAddress, setNewAddress] = useState<AddressProps>(
    prefillData || {
      id: "",
      building: "",
      aptNo: "",
      floor: "",
      street: "",
      phoneNumber: "",
      country: "",
      city: "",
      additionalDirections: "",
      saveAddress: false,
      shippingAddressId: "",
      area: "",
    }
  );

  const [errors, setErrors] = useState({
    building: "",
    aptNo: "",
    floor: "",
    street: "",
    area: "",
    phoneNumber: "",
    city: "",
  });

  const validateInput = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "building":
        if (!/^[a-zA-Z\s\d\u0600-\u06FF]+$/.test(value)) {
          error = t("addressModal.validation.buildingInvalid");
        }
        break;
      case "aptNo":
      case "floor": {
        const ascii = toEnglishDigits(value);
        if (!/^\d+$/.test(ascii)) {
          error = t("addressModal.validation.numberInvalid");
        }
        break;
      }
      case "street":
        // If the field is empty, treat it as valid (optional)
        if (
          value.trim() !== "" &&
          !/^[a-zA-Z\s\d\u0600-\u06FF]+$/.test(value)
        ) {
          error = t("addressModal.validation.streetInvalid");
        }
        break;
      case "phoneNumber": {
        const ascii = toEnglishDigits(value); // <- NEW
        if (!/^01\d{9}$/.test(ascii)) {
          error = t("addressModal.validation.phoneInvalid");
        }
        break;
      }
      case "city":
        if (!value) {
          error = t("addressModal.validation.cityRequired");
        }
        break;
      case "area":
        if (!value.trim()) {
          error = t("addressModal.validation.areaRequired");
        } else if (!/^[a-zA-Z\u0600-\u06FF\d\s]+$/.test(value)) {
          error = t("addressModal.validation.areaInvalid");
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(name, value);
  };

  const validateAllInputs = () => {
    let isValid = true;

    Object.keys(newAddress).forEach((key) => {
      if (key in errors) {
        const fieldName = key as keyof typeof errors;
        const fieldValue = newAddress[fieldName];
        const isFieldValid = validateInput(fieldName, fieldValue);
        if (!isFieldValid) isValid = false;
      }
    });

    return isValid;
  };

  useEffect(() => {
    if (prefillData) {
      setNewAddress(prefillData);
    }
  }, [prefillData]);

  const handleSubmit = async () => {
    if (validateAllInputs()) {
      try {
        const flatNumber = Number(toEnglishDigits(newAddress.aptNo)) || 0;
        const floorNumber = Number(toEnglishDigits(newAddress.floor)) || 0;
        let phoneNumber = toEnglishDigits(newAddress.phoneNumber.trim());
        if (phoneNumber.startsWith("+")) {
          phoneNumber = phoneNumber.substring(1);
        }
        if (phoneNumber.startsWith("200")) {
          phoneNumber = "2" + phoneNumber.substring(2);
          console.log("[AddressModal] Fixed +200 prefix issue:", phoneNumber);
        } else if (phoneNumber.startsWith("2020")) {
          phoneNumber = "20" + phoneNumber.substring(4);
        } else if (!phoneNumber.startsWith("20")) {
          phoneNumber = "20" + phoneNumber;
        }
        phoneNumber = "+" + phoneNumber;

        console.log("[AddressModal] Formatted phone number:", phoneNumber);

        const apiAddressData = {
          buildingName: newAddress.building,
          street: newAddress.street || "",
          area: newAddress.area,
          city: newAddress.city,
          additionalDirections: newAddress.additionalDirections || "",
          flatNumber,
          floorNumber,
          phoneNumber,
          isSaved: newAddress.saveAddress,
        };

        console.log(
          "[AddressModal] Sending address data:",
          JSON.stringify(apiAddressData, null, 2)
        );

        const response = await postAddress(apiAddressData);

        if (response) {
          console.log(
            "[AddressModal] Address saved successfully to API:",
            response
          );

          const enrichedAddress: AddressProps = {
            ...newAddress,
            id: response.shippingAddressId,
            shippingAddressId: response.shippingAddressId,
          };

          const username = Cookies.get("username");
          if (username && newAddress.saveAddress) {
            saveAddressForUser(enrichedAddress);
          }

          addAddress(enrichedAddress);
          closeModal();
        } else {
          console.log(
            "[AddressModal] Failed to save address to API, falling back to local storage"
          );

          const username = Cookies.get("username");
          if (username && newAddress.saveAddress) {
            saveAddressForUser(newAddress);
          }
          addAddress(newAddress);
          closeModal();
        }
      } catch (e) {
        console.log("[AddressModal] Exception when saving address:", e);
        const username = Cookies.get("username");
        if (username && newAddress.saveAddress) {
          saveAddressForUser(newAddress);
        }
        addAddress(newAddress);
        closeModal();
      }
    }
  };

  return (
    <div className="modal-backdrop">
      <div className={`modal-container ${isArabic ? "rtl" : "ltr"}`}>
        <div className="modal-header">
          <h2 className="text-wine text-2xl">{t("addressModal.title")}</h2>
          <button onClick={closeModal} className="close-btn">
            X
          </button>
        </div>

        <div className={`modal-body ${isArabic ? "text-right" : "text-left"}`}>
          <h4 className="text-wine">{t("addressModal.enterDetails")}</h4>
          <div className="input-group">
            <input
              className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none ${
                isArabic ? "text-right" : "text-left"
              }`}
              placeholder={t("addressModal.area")}
              type="text"
              name="area"
              value={newAddress.area}
              onChange={handleChange}
              dir={isArabic ? "rtl" : "ltr"}
            />
            {errors.area && <p className="text-red-500">{errors.area}</p>}
          </div>

          <div className="input-group">
            <input
              className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none ${
                isArabic ? "text-right" : "text-left"
              }`}
              placeholder={t("addressModal.buildingPlaceholder")}
              type="text"
              name="building"
              value={newAddress.building}
              onChange={handleChange}
              dir={isArabic ? "rtl" : "ltr"}
            />
            {errors.building && (
              <p className="text-red-500">{errors.building}</p>
            )}
          </div>

          <div
            className={`flex justify-between gap-3 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <div className="input-group w-1/2">
              <input
                className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none ${
                  isArabic ? "text-right" : "text-left"
                }`}
                placeholder={t("addressModal.aptNoPlaceholder")}
                type="text"
                name="aptNo"
                value={newAddress.aptNo}
                onChange={handleChange}
                dir={isArabic ? "rtl" : "ltr"}
              />
              {errors.aptNo && <p className="text-red-500">{errors.aptNo}</p>}
            </div>

            <div className="input-group w-1/2">
              <input
                className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none ${
                  isArabic ? "text-right" : "text-left"
                }`}
                placeholder={t("addressModal.floorPlaceholder")}
                type="text"
                name="floor"
                value={newAddress.floor}
                onChange={handleChange}
                dir={isArabic ? "rtl" : "ltr"}
              />
              {errors.floor && <p className="text-red-500">{errors.floor}</p>}
            </div>
          </div>

          <div className="input-group">
            <input
              className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none ${
                isArabic ? "text-right" : "text-left"
              }`}
              placeholder={t("addressModal.streetPlaceholder")}
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleChange}
              dir={isArabic ? "rtl" : "ltr"}
            />
            {errors.street && <p className="text-red-500">{errors.street}</p>}
          </div>

          <div className="input-group">
            {" "}
            {/* PHONE NUMBER (Egypt) */}
            <input
              type="tel"
              name="phoneNumber"
              dir={isArabic ? "rtl" : "ltr"}
              className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor
              placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none
              focus:ring-none ${isArabic ? "text-right" : "text-left"}`}
              placeholder={t(
                "addressModal.phonePlaceholder",
                "01XXXXXXXXX" // Egyptian mobile format
              )}
              value={newAddress.phoneNumber}
              onChange={(e) => {
                const v = e.target.value;
                setNewAddress((p) => ({ ...p, phoneNumber: v }));
                validateInput("phoneNumber", v);
              }}
            />
            {errors.phoneNumber && (
              <p className="text-FifthColor text-sm mt-1">
                {errors.phoneNumber}
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {t(
                "addressModal.phoneFormatHelp",
                "11-digit Egyptian number e.g. 01123456789"
              )}
            </p>
          </div>

          <div className="input-group">
            <label htmlFor="city" className="text-wine">
              {t("addressModal.city")}
            </label>
            <select
              id="city"
              name="city"
              dir={isArabic ? "rtl" : "ltr"}
              disabled={isLoadingCities}
              value={newAddress.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor
                placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none
                focus:ring-none ${isArabic ? "text-right" : "text-left"}`}
            >
              <option value="">{t("addressModal.selectCity")}</option>

              {cities.map((c) => (
                /* keep the VALUE in English so getCityId() still works */
                <option key={c.cityName} value={c.cityName}>
                  {isArabic ? c.cityNameAr : c.cityName}
                </option>
              ))}
            </select>

            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>

          <div className="input-group">
            <input
              className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none ${
                isArabic ? "text-right" : "text-left"
              }`}
              placeholder={t("addressModal.additionalDirections")}
              type="text"
              name="additionalDirections"
              value={newAddress.additionalDirections}
              onChange={handleChange}
              dir={isArabic ? "rtl" : "ltr"}
            />
          </div>

          <div
            className={`checkbox-group ${isArabic ? "flex justify-end" : ""}`}
          >
            <label className="text-wine">
              <input
                type="checkbox"
                name="saveAddress"
                checked={newAddress.saveAddress}
                onChange={() =>
                  setNewAddress((prev) => ({
                    ...prev,
                    saveAddress: !prev.saveAddress,
                  }))
                }
              />
              {isArabic ? " " : ""}
              {t("addressModal.saveAddress")}
            </label>
          </div>
        </div>

        <div className={`modal-footer ${isArabic ? "flex-row-reverse" : ""}`}>
          <Button
            label={t("addressModal.cancel")}
            onClick={closeModal}
            size="large"
            type="outlined"
          />
          <Button
            label={t("addressModal.next")}
            onClick={handleSubmit}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
