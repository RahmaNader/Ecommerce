import React from "react";
import phoneIcon from "../../../assets/PhoneIcon.svg";
import letterIcon from "../../../assets/LetterIcon.svg";
import { Button } from "@components/atoms";
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldError,
} from "react-hook-form";

type formFields = {
  name: string;
  email: string;
  phone: number;
  message: string;
};

const ContactScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>();

  const onSubmit: SubmitHandler<formFields> = (data) => {
    console.log(data);
  };

  const getErrorMessage = (error: FieldError | undefined) => {
    return error?.message ? error.message : null;
  };

  return (
    <div className="bg-customBeige min-h-screen xl:px-24 lg:px-6">
      <div className="bg-customBeige min-h-screen xl:p-10 lg:p-5 flex justify-center items-center gap-5 lg:justify-between sm:flex-col sm:py-12 sm:px-4 md:px-3 xs:flex-col xs:py-12 xs:px-4 md:flex-row">
        <div className=" xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-full xs:w-full border border-skin bg-[#A78E7821] xl:p-10 lg:p-8 rounded-lg sm:px-5 sm:py-4 xs:px-5 xs:py-4 md:px-7 md:h-[550px] md:flex md:flex-col md:justify-center lg:h-[450px] lg:px-12 ">
          <div className="text-mainColor border border-b-mainColor flex-col">
            <div className="flex items-center mb-4">
              <span className="w-10 h-10 flex justify-center items-center rounded-3xl bg-mainColor">
                <img src={phoneIcon} alt="" />
              </span>
              <span className="ms-4">Call To Us</span>
            </div>
            <div className="mt-4">
              <p>We are available 24/7, 7 days a week.</p>
            </div>
            <div className="mt-4 mb-4">
              <p>Phone: +8801611112222</p>
            </div>
          </div>
          <div>
            <div className="text-mainColor mt-5 flex-col ">
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 flex justify-center items-center rounded-3xl bg-mainColor">
                  <img src={letterIcon} alt="" />
                </span>
                <span className="ms-4">Write To US</span>
              </div>
              <div className="mt-4 ">
                <p>
                  Fill out our form and we will contact you within 24 hours.
                </p>
              </div>
              <div className="mt-4">
                <p>Emails: customer@exclusive.com</p>
              </div>
              <div className="mt-4">
                <p>Emails: support@exclusive.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:w-2/3 lg:w-2/3 md:w-1/2 sm:w-full xs:w-full border border-skin bg-[#A78E7821] p-10 rounded-lg sm:px-4 xs:px-4 md:h-[550px] lg:h-[450px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between gap-3 xs:flex-col sm:flex-col  md:flex-col lg:flex-row xl:flex-row xl:justify-between">
              <div className="lg:w-1/3">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="name"
                      placeholder="Your Name"
                      className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin md:w-full xs:w-full sm:w-full focus:border-skin focus:text-skin"
                    />
                  )}
                />
                {errors.name && (
                  <span>{getErrorMessage(errors.name as FieldError)}</span>
                )}
              </div>
              <div className="lg:w-1/3 xs:w-full">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      placeholder="Your Email"
                      className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin md:w-full xs:w-full sm:w-full focus:border-skin focus:text-skin"
                    />
                  )}
                />
                {errors.email && (
                  <span>{getErrorMessage(errors.email as FieldError)}</span>
                )}
              </div>
              <div className="lg:w-1/3 xs:w-full">
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="phone"
                      placeholder="Your Phone"
                      className="bg-[#A78E7821] border border-skin px-3 py-3 rounded-md placeholder:text-skin xs:w-full sm:w-full  md:w-full focus:border-skin focus:text-skin"
                    />
                  )}
                />
                <div>
                  {errors.phone && (
                    <span>{getErrorMessage(errors.phone as FieldError)}</span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <Controller
                name="message"
                control={control}
                rules={{ required: "Message is required" }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="message"
                    placeholder="Message"
                    className="w-full h-[200px] bg-[#A78E7821] border border-skin p-5 mt-5 placeholder:text-skin focus:text-skin focus:border-skin "
                  />
                )}
              />
              {errors.message && (
                <span>{getErrorMessage(errors.message as FieldError)}</span>
              )}
            </div>
            <div className="float-right pt-5">
              <Button
                type="primary"
                size="medium"
                label="Send"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;

{
  /* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between gap-3 max-md:flex-col md:flex-col lg:flex-row xl:flex-row xl:justify-between">
              <Input {...register("name", {
                required: true
              })} placeholder="Your Name" />
              <Input {...register("email",{
                required: true,
                validate : (value) => value.includes("@")
              })} placeholder="Your Email" />
              <Input {...register("phone",{
                required: true,
                pattern: /^01[0125][0-9]{8}$/
              })} placeholder="Your Phone" />
            </div>
            <div className="mb-4">
              <textarea placeholder="Your Message" className="w-full h-[200px] bg-[#A78E7821] border border-skin p-5 mt-5 placeholder:text-skin focus:text-skin focus:border-skin "  ></textarea>
            </div>
            <div
              className="float-right pt-5">
              <Button
                type="primary"
                size="medium"
                label="Send"
                onClick={
                  handleSubmit(onSubmit)
                 } />
            </div>
          </form> */
}

{
  /* <button className="float-right pt-5" type="submit">Submit</button> */
}
