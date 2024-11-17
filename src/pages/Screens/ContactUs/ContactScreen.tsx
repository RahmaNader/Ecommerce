import React from "react";
import phoneIcon from '../../../assets/PhoneIcon.svg'
import letterIcon from '../../../assets/LetterIcon.svg'
import Input from '../../../Components/atoms/Input/Input';
import { Button } from "@components/atoms";

const ContactScreen: React.FC = () => {
  return (
    <div className="bg-customBeige min-h-screen xl:px-24 lg:px-6">
      <div className="bg-customBeige min-h-screen xl:p-10 lg:p-5 flex justify-center items-center gap-5 lg:justify-between max-md:flex-col max-md:py-12 max-md:px-4 md:px-3">
        <div className=" xl:w-1/3 lg:w-1/3 md:w-1/2 border border-skin bg-[#A78E7821] xl:p-10 lg:p-8 rounded-lg max-md:px-5 max-md:py-4 max-md:w-full md:px-7 md:h-[550px] md:flex md:flex-col md:justify-center lg:h-[450px] lg:px-12 ">
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
                <p>Fill out our form and we will contact you within 24 hours.</p>
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
        <div className="xl:w-2/3 lg:w-2/3 md:w-1/2 max-md:w-full border border-skin bg-[#A78E7821] p-10 rounded-lg max-md:px-4 md:h-[550px] lg:h-[450px]">
          <div className="flex justify-between gap-3 max-md:flex-col md:flex-col lg:flex-row xl:flex-row xl:justify-between">
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" />
            <Input placeholder="Your Phone" />
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
            onClick={function (): void {
              throw new Error("Function not implemented.");
            }} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactScreen;
