import React from 'react';
import facebook from '@assets/facebook.svg'
import instagram from '@assets/instgram.svg'
import linkedin from '@assets/Linkedin.svg'
import twier from '@assets/twiter.svg'
const Footer: React.FC = () => {
  return (
    <footer className="bg-secondColor text-white mt-6 py-14 font-mainFontFamily">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between px-4">
        {/* Section 1: Links */}
        <div className="mb-4 md:mb-0">
           <p className='text-2xl'>Royal Key</p>
           <p className='mt-2 text-[16px]'>2024 Royal key . All Rights Reserved</p>
    <div className='flex space-x-4 mt-10'>
        <img src={facebook} alt="" />
        <img src={linkedin} alt="" />
        <img src={twier} alt="" />
        <img src={instagram} alt="" />
    </div>
         
        </div>

        {/* Section 2: Contact Info */}
   
        <div className=" space-y-2">
           <p>Home</p>
           <p>Collection</p>
           <p>Brands</p>
           <p>About Us</p>
         
        </div>
        {/* Section 3: Social Media */}

        <div className=" space-y-2">
       <p>Contact Us</p> 
<p>522-252-4244</p>
<p>Royalkey@gmail.com</p>
<p>www.Royalkey.com</p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
