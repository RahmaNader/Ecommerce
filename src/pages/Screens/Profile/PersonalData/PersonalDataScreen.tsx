import React, { useEffect, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { fetchPersonalData, updatePersonalData } from "@services/api/personaldetails";
import { PersonalData } from "@types";
import personalDataFields from "@data/personalData";
import addPhoto from "@assets/addPhoto.svg";
// import editIcon from "@assets/edit.svg";
import { useTranslation } from "react-i18next";
import axios from 'axios';

const PersonalDataScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors},
  } = useForm<PersonalData>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [initialData, setInitialData] = useState<PersonalData | null>(null);
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
    // Only used for entering edit mode now
    setEditMode(true);
  };

  const onCancelEdit = () => {
    // Reset form to initial data
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof PersonalData, initialData[key as keyof PersonalData]);
      });
    }
    setEditMode(false);
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
      <div className="w-full max-w-3xl px-4">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-wine font-playfair">
              {t("profile.identification")}
            </h1>
            <p className="text-ForthColor font-playfair text-xl">
              {t("profile.profileDetails")}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-10 h-10 border-4 border-wine border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="w-full">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center mb-8">
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

            {/* New Improved Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                {personalDataFields.map((field) => (
                  <div key={field.id} className="relative">
                    <label 
                      htmlFor={field.id}
                      className="block text-sm font-medium text-wine mb-1"
                    >
                      {t(`${field.placeholder}`)}
                    </label>
                    <div className={`relative rounded-md ${editMode ? 'shadow-sm' : ''}`}>
                      <input
                        type={field.type}
                        id={field.id}
                        disabled={!editMode}
                        placeholder={t(`${field.placeholder}`)}
                        {...register(
                          field.id,
                          editMode ? field.validation : {}
                        )}
                        className={`w-full px-4 py-3 border rounded-md transition-all duration-300 ${
                          editMode
                            ? "border-wine bg-white"
                            : "border-ForthColor bg-ForthColor/[0.13]"
                        } text-wine ltr:text-left rtl:text-right focus:outline-none focus:ring-1 focus:ring-wine`}
                      />
                      {editMode && field.id === "phoneNumber" && (
                        <div className="absolute inset-y-0 ltr:left-0 rtl:right-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-wine text-sm">+</span>
                        </div>
                      )}
                    </div>
                    {editMode && errors[field.id] && (
                      <p className="text-FifthColor text-sm mt-1">
                        {t(errors[field.id]?.message as string)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Updated button layout */}
              <div className="mt-8 flex justify-center gap-4">
                {editMode ? (
                  <>
                    <button
                      type="button"
                      onClick={onCancelEdit}
                      className="bg-white text-wine border-2 border-wine font-playfair px-6 py-2 rounded-md hover:opacity-90 transition duration-300"
                    >
                      {t("profile.cancel")}
                    </button>
                    <button
                      type="submit"
                      className="bg-wine text-mainColor font-playfair px-6 py-2 rounded-md hover:opacity-90 transition duration-300"
                    >
                      {t("profile.submit")}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={onToggleEditMode}
                    className="bg-wine text-mainColor font-playfair text-xl rounded-md py-3 px-8 hover:bg-ForthColor transition duration-300"
                  >
                    {t("profile.edit")}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDataScreen;
