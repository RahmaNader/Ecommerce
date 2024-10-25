import React from "react";
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondColor text-white font-mainFontFamily font-semibold mt-20">
      <div className="flex flex-col md:flex-row   ms-20  p-9">
        {/* Section 1: Links */}
        <div className=" mt-8   md:w-1/3 lg:w-1/3 ">
          <p className="text-2xl">Royal Key</p>
          <p className="text-[16px] mt-3 font-normal ">
            2024 Royal key. All Rights Reserved
          </p>

          {/* Brand Icons */}
          {/* use icon or image and why ...... ??? */}
          <div className="flex   space-x-3 mt-14">
            <IconBrandFacebook width={25} height={25} />
            <IconBrandLinkedin width={25} height={25} />
            <IconBrandTwitter width={25} height={25} />
            <IconBrandInstagram width={25} height={25} />
          </div>
        </div>

        {/* Section 2: Links */}
        <div className="mt-8 md:w-1/3 lg:w-1/3 space-y-3 font-medium ">
          <p>Home</p>
          <p>Collection</p>
          <p>Brands</p>
          <p>About Us</p>
        </div>

        {/* Section 3: Contact Info */}
        <div className="mt-8 md:w-1/3 lg:w-1/3  space-y-3">
          <p className="font-medium">Contact Us</p>
          <p className=" font-normal ">522-252-4244</p>
          <p className=" font-normal ">Royalkey@gmail.com</p>
          <p className=" font-normal ">www.Royalkey.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
