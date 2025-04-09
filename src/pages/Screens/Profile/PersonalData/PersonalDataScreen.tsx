import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { fetchPersonalData, updatePersonalData } from "@services/api/personaldetails";
import { PersonalData } from "@types";
import personalDataFields from "@data/personalData";
import addPhoto from "@assets/addPhoto.svg";
import editIcon from "@assets/edit.svg";
import { useTranslation } from "react-i18next";
import axios from 'axios';

const PersonalDataScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<PersonalData>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [initialData, setInitialData] = useState<PersonalData | null>(null);
  const [isEditable, setIsEditable] = useState<{ [key: string]: boolean }>(
    personalDataFields.reduce((acc, field) => {
      acc[field.id] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // New states & ref for photo upload
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchPersonalData();
        setInitialData(data);
        Object.keys(data).forEach((key) => {
          setValue(key as keyof PersonalData, data[key]);
        });
      } catch (error) {
        console.error("Failed to fetch personal data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [setValue]);

  const onEditClick = (field: keyof PersonalData) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit: SubmitHandler<PersonalData> = async (data) => {
    try {
      const formattedData = Object.keys(data).reduce((acc, key) => {
        if (initialData && data[key as keyof PersonalData] !== initialData[key as keyof PersonalData]) {
          acc[key as keyof PersonalData] = data[key as keyof PersonalData];
        }
        return acc;
      }, {} as Partial<PersonalData>);

      if (Object.keys(formattedData).length === 0) {
        alert("No changes detected.");
        return;
      }
      console.log("Sending changes to API:", JSON.stringify(formattedData, null, 2));
      await updatePersonalData(formattedData);
      setInitialData({ ...initialData, ...formattedData } as PersonalData);
      alert("Data updated successfully!");
      setEditMode(false);
      setIsEditable(
        personalDataFields.reduce((acc, field) => {
          acc[field.id] = false;
          return acc;
        }, {} as { [key: string]: boolean })
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("API Response Error:", error.response.data);
      } else if (error instanceof Error) {
        console.error("Error updating personal data:", error.message);
      } else {
        console.error("Unknown error occurred");
      }
      alert("Failed to update data. Please try again.");
    }
  };

  const onToggleEditMode = () => {
    if (editMode) {
      if (isValid) {
        handleSubmit(onSubmit)();
      } else {
        alert(t("profile.fillAllFields"));
      }
    } else {
      setEditMode(true);
      setIsEditable(
        personalDataFields.reduce((acc, field) => {
          acc[field.id] = true;
          return acc;
        }, {} as { [key: string]: boolean })
      );
    }
  };

  // --- Photo Upload handlers ---
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        alert(t("profile.onlyImagesAllowed"));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert(t("profile.fileTooLarge"));
        return;
      }
      setIsUploadingPhoto(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTimeout(() => {
          setProfilePhoto(reader.result as string);
          setIsUploadingPhoto(false);
          alert(t("profile.photoUpdateSuccess"));
        }, 1500); // simulate network delay
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col mt-8 md:mt-16 items-center justify-center">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start">
        {t("profile.identification")}
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
        {t("profile.profileDetails")}
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full max-w-md">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center mb-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div
              className="relative w-[100px] h-[100px] mx-auto rounded-full bg-[#A78E7821] border-wine border-[1px]"
            >
              {isUploadingPhoto ? (
                <div className="absolute inset-0 flex items-center justify-center bg-ForthColor/20">
                  <div className="w-8 h-8 border-4 border-wine border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-wine text-2xl">
                    {initialData?.fullName?.[0] || "?"}
                  </span>
                </div>
              )}
              {/* Add Photo Button positioned on bottom left of the circle */}
              <div
                onClick={triggerFileInput}
                className="absolute bottom-0 right-0 hover:bg-ForthColor w-[30px] h-[30px] bg-wine flex items-center justify-center rounded-full"
              >
                <img src={addPhoto} alt="Add Photo" className="w-4 h-4" />
              </div>
            </div>
            {profilePhoto && (
              <button
                type="button"
                onClick={removeProfilePhoto}
                className="mt-2 text-sm text-FifthColor hover:underline"
              >
                {t("profile.removePhoto")}
              </button>
            )}
          </div>

          {/* Existing Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {personalDataFields.map((field) => (
              <div key={field.id} className="mb-4 relative">
                <input
                  type={field.type}
                  id={field.id}
                  disabled={!isEditable[field.id]}
                  placeholder={t(`${field.placeholder}`)}
                  {...register(
                    field.id,
                    isEditable[field.id] ? field.validation : {}
                  )}
                  className={`w-full px-4 py-2 border rounded ${
                    isEditable[field.id]
                      ? "border-wine border-[2px]"
                      : "border-ForthColor"
                  } placeholder-wine text-wine bg-ForthColor/[0.13] ltr:text-left rtl:text-right focus:outline-none focus:ring-none`}
                />

                {editMode && (
                  <button
                    type="button"
                    className={`absolute rtl:left-2 ltr:right-2 top-2`}
                    onClick={() => onEditClick(field.id)}
                  >
                    <img
                      src={editIcon}
                      alt="Edit"
                      className="w-5 h-5 hover:opacity-80"
                    />
                  </button>
                )}

                {isEditable[field.id] && errors[field.id] && (
                  <p className="text-FifthColor text-sm mt-1">
                    {t(errors[field.id]?.message as string)}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={onToggleEditMode}
              className="bg-wine text-mainColor font-playfair text-2xl rounded-md w-[100%] py-3 px-8 hover:bg-ForthColor transition duration-300"
            >
              {editMode ? t("profile.submit") : t("profile.edit")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PersonalDataScreen;
