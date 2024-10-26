import React from "react";
import { NavLink } from "@components/atoms";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondColor text-white font-playfair font-semibold mt-20">
      <div className="flex flex-col md:flex-row ms-20 p-9">
        {/* Section 1: Brand and Social Links */}
        <div className="mt-8 md:w-1/3 lg:w-1/3">
          <p className="text-2xl">Royal Key</p>
          <p className="text-[16px] mt-3 font-normal">
            2024 Royal Key. All Rights Reserved
          </p>

          {/* Social Media Icons */}
          {/*  # until know links  */}
          <div className="flex space-x-3 mt-14">
            <div>
              {/* anchor until calling api ....??? */}
              <a href="#" target="_blank">
                <IconBrandFacebook width={25} height={25} />
              </a>
            </div>
            <div>
              <a href="#" target="_blank">
                <IconBrandLinkedin width={25} height={25} />
              </a>
            </div>
            <div>
              <a href="#" target="_blank">
                <IconBrandTwitter width={25} height={25} />
              </a>
            </div>
            <div>
              <a href="#" target="_blank">
                <IconBrandInstagram width={25} height={25} />
              </a>
            </div>
          </div>
        </div>

        {/* Section 2: Navigation Links */}
        <div className="mt-8 md:w-1/3 lg:w-1/3 space-y-3 font-medium ">
          {/* # until to make brand section   */}
          <div>
            <NavLink label="Collection" to="#" unStyled={true} />{" "}
          </div>
          {/* # until to make brand section  */}
          <div>
            
            <NavLink label="Brands" to="#" unStyled={true} />
          </div>
          <div>
         
            <NavLink label="About Us" to="/about-us" unStyled={true} />
          </div>
        </div>

        {/* Section 3: Contact Information */}
        <div className="mt-8 md:w-1/3 lg:w-1/3 space-y-3">
          <div>
            <p className="font-medium">Contact Us</p>
          </div>
          {/* suppose it telegram number  */}
          <div>
            
            <a href="tel:5222524244" className="font-normal">
              522-252-4244
            </a>
          </div>
          <div>
           
            <a href="mailto:Royalkey@gmail.com" className="font-normal">
              Royalkey@gmail.com
            </a>
          </div>
          <div>
            <a
              href="#" // until i know link 
              target="_blank"
              className="font-normal "
            >
              www.Royalkey.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
