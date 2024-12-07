import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { PersonalData } from "@types";
import personalDataFields from "@data/personalData";
import addPhoto from "@assets/addPhoto.svg";
import editIcon from "@assets/edit.svg";

const PersonalDataScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>({
    mode: "onBlur",
  });

  const [isEditable, setIsEditable] = useState<{ [key: string]: boolean }>(
    personalDataFields.reduce((acc, field) => {
      acc[field.id] = false;
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const onEditClick = (field: keyof PersonalData) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit: SubmitHandler<PersonalData> = (data) => {
    console.log("Submitted Data:", data);
  };

  const onNext = () => {
    console.log("Navigating to the next step without submitting form...");
  };

  return (
    <div className="flex flex-col mt-8 md:mt-16 items-center justify-center">
      <h1 className="text-2xl font-semibold text-wine font-playfair md:self-start">
        Identification
      </h1>
      <p className="text-ForthColor font-playfair text-xl mb-4 md:self-start mx-auto md:mx-0">
          Profile details
      </p>

      

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
                placeholder={field.placeholder}
                {...register(field.id, isEditable[field.id] ? field.validation : {})}
                className={`w-full px-4 py-2 border rounded ${
                  isEditable[field.id] ? "border-wine border-[2px]" : "border-ForthColor"
                }  placeholder-wine text-wine bg-ForthColor/[0.13] focus:outline-none focus:ring-none`}
              />
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => onEditClick(field.id)}
              >
                <img
                  src={editIcon}
                  alt="Edit"
                  className="w-5 h-5 hover:opacity-80"
                />
              </button>
              {isEditable[field.id] && errors[field.id] && (
                <p className="text-FifthColor text-sm mt-1">
                  {errors[field.id]?.message as string}
                </p>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={onNext}
            className="bg-wine text-mainColor font-playfair text-2xl rounded-md w-[100%] py-3 px-8 hover:bg-ForthColor transition duration-300"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDataScreen;