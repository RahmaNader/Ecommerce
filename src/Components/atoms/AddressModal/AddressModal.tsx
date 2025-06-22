import React, { useState, useEffect } from "react";
import "./AddressModal.css";
import { Button } from "@components/atoms";
import { saveAddressForUser } from "@utils/addressUtils";
import { AddressProps } from "@types";
import Cookies from "js-cookie";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import { postAddress, getCityId } from "@services/api/address";
import { MuiTelInput } from "mui-tel-input";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  const phoneInputTheme = createTheme({
    palette: {
      primary: { main: "#A78E78" }, // wine
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "0.25rem",
            backgroundColor: "rgba(167, 142, 120, 0.13)",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78E78",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78E78",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#A78E78",
            },
          },
          input: {
            color: "#A78E78",
            "&::placeholder": { color: "#A78E78", opacity: 0.7 },
          },
        },
      },
    },
  });

  const citiesOfEgypt = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Sharm El Sheikh",
    "Hurghada",
    "Luxor",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Ismailia",
    "Gharbia",
    "Kafr el-Sheikh",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Sharqia",
    "Sohag",
    "Suez",
  ];

  const arabicCities = [
    "القاهرة",
    "الإسكندرية",
    "الجيزة",
    "شرم الشيخ",
    "الغردقة",
    "الأقصر",
    "أسوان",
    "أسيوط",
    "البحيرة",
    "بني سويف",
    "الدقهلية",
    "دمياط",
    "الفيوم",
    "الإسماعيلية",
    "الغربية",
    "كفر الشيخ",
    "مطروح",
    "المنيا",
    "المنوفية",
    "الوادي الجديد",
    "شمال سيناء",
    "بورسعيد",
    "القليوبية",
    "الشرقية",
    "سوهاج",
    "السويس",
  ];

  const cities = isArabic ? arabicCities : citiesOfEgypt;

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
    }
  );

  const [errors, setErrors] = useState({
    building: "",
    aptNo: "",
    floor: "",
    street: "",
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
      case "floor":
        if (!/^\d+$/.test(value)) {
          error = t("addressModal.validation.numberInvalid");
        }
        break;
      case "street":
        if (!/^[a-zA-Z\s\d\u0600-\u06FF]+$/.test(value)) {
          error = t("addressModal.validation.streetInvalid");
        }
        break;
      case "phoneNumber": {
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length !== 13) {
          error = t("addressModal.validation.phoneInvalid");
        }
        break;
      }
      case "city":
        if (!value) {
          error = t("addressModal.validation.cityRequired");
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
        let phoneNumber = newAddress.phoneNumber.trim();
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
          street: newAddress.street,
          city: getCityId(newAddress.city),
          additionalDirections: newAddress.additionalDirections || "",
          flatNumber: parseInt(newAddress.aptNo) || 0,
          floorNumber: parseInt(newAddress.floor) || 0,
          phoneNumber: phoneNumber,
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
            <ThemeProvider theme={phoneInputTheme}>
              <MuiTelInput
                value={newAddress.phoneNumber}
                onChange={(v) => {
                  setNewAddress((p) => ({ ...p, phoneNumber: v }));
                  validateInput("phoneNumber", v);
                }}
                defaultCountry="EG"
                forceCallingCode
                placeholder={t("addressModal.phonePlaceholder")}
                langOfCountryName="en"
                dir={document.dir || "ltr"}
                className="w-full"
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: document.dir === "rtl" ? "right" : "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: document.dir === "rtl" ? "right" : "left",
                  },
                }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root": {
                    width: "100%",
                    height: "45px",
                    backgroundColor: "rgba(167, 142, 120, 0.13)",
                    color: "#A78E78",
                    textAlign: document.dir === "rtl" ? "right" : "left",
                    fontFamily: "Poppins, sans-serif",
                  },
                  "& .MuiOutlinedInput-input": {
                    height: "11px",
                    padding: "14px",
                    fontSize: "15px",
                    textAlign: document.dir === "rtl" ? "right" : "left",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A78E78",
                  },
                  "& .MuiSvgIcon-root": { color: "#A78E78" },
                  "& .MuiTelInput-Flag": {
                    mr: document.dir === "rtl" ? 0 : 1,
                    ml: document.dir === "rtl" ? 1 : 0,
                    order: document.dir === "rtl" ? 1 : 0,
                  },
                  "& .MuiMenu-paper": { fontFamily: "Poppins, sans-serif" },
                }}
              />
            </ThemeProvider>
            {errors.phoneNumber && (
              <p className="text-FifthColor text-sm mt-1">
                {errors.phoneNumber}
              </p>
            )}
            {/* Add helper text for phone format */}
            <p className="text-gray-500 text-xs mt-1">
              {t(
                "addressModal.phoneFormatHelp",
                "Phone number should be in format +201XXXXXXXX"
              )}
            </p>
          </div>

          <div className="input-group">
            <label htmlFor="city" className="text-wine">
              {t("addressModal.city")}
            </label>
            <select
              id="city"
              className={`w-full px-4 py-2 mt-1 text-wine border rounded border-ForthColor placeholder-ForthColor bg-ForthColor/[0.13] focus:outline-none focus:ring-none ${
                isArabic ? "text-right" : "text-left"
              }`}
              name="city"
              value={newAddress.city}
              onChange={handleChange}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <option value="">{t("addressModal.selectCity")}</option>
              {cities.map((city, index) => (
                <option
                  key={city}
                  value={isArabic ? citiesOfEgypt[index] : city}
                >
                  {city}
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
