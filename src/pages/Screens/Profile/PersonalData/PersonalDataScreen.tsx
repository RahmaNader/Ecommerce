import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { fetchPersonalData, updatePersonalData } from "@services/api/personaldetails";
import { PersonalData } from "@types";
import personalDataFields from "@data/personalData";
import addPhoto from "@assets/addPhoto.svg";
import editIcon from "@assets/edit.svg";
import { useTranslation } from "react-i18next";

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

  const [isEditable, setIsEditable] = useState<{ [key: string]: boolean }>(
    personalDataFields.reduce((acc, field) => {
      acc[field.id] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch personal data when the component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchPersonalData();
        // Set form values
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

  // Enable editing for specific fields
  const onEditClick = (field: keyof PersonalData) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle form submission (update data)
  const onSubmit: SubmitHandler<PersonalData> = async (data) => {
    try {
      // Prepare the data with only the fields that have changed
      const formattedData = Object.keys(data).reduce((acc, key) => {
        if (data[key as keyof PersonalData] !== initialData?.[key as keyof PersonalData]) {
          acc[key as keyof PersonalData] = data[key as keyof PersonalData];
        }
        return acc;
      }, {} as Partial<PersonalData>);

      if (Object.keys(formattedData).length === 0) {
        alert("No changes detected.");
        return;
      }

      console.log("Sending full form data to API:", JSON.stringify(formattedData, null, 2));

      // Send all fields to the API using PUT
      await updatePersonalData(formattedData);

      alert("Data updated successfully!");

      // Turn off edit mode after successful submission
      setEditMode(false);
      setIsEditable(
        personalDataFields.reduce((acc, field) => {
          acc[field.id] = false;
          return acc;
        }, {} as { [key: string]: boolean })
      );
    } catch (error: any) {
      if (error.response) {
        console.error("API Response Error:", error.response.data);
      } else {
        console.error("Error updating personal data:", error);
      }
      alert("Failed to update data. Please try again.");
    }
  };

  // Toggle form edit mode
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
          <div className="relative mb-4 w-[100px] h-[100px] cursor-pointer mx-auto rounded-full bg-[#A78E7821] border-wine border-[1px]">
            <div className="absolute bottom-0 right-0 hover:bg-ForthColor w-[30px] h-[30px] bg-wine flex items-center justify-center rounded-full">
              <img src={addPhoto} alt="Add Photo" className="w-4 h-4" />
            </div>
          </div>

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
