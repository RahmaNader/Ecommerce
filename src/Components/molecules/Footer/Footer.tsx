import { NavLink } from "@components/atoms";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

const socialLinks = [
  { id: 'facebook', href: "https://facebook.com", icon: <IconBrandFacebook width={25} height={25} /> },
  { id: 'linkedin', href: "https://linkedin.com", icon: <IconBrandLinkedin width={25} height={25} /> },
  { id: 'twitter', href: "https://twitter.com", icon: <IconBrandTwitter width={25} height={25} /> },
  { id: 'instagram', href: "https://instagram.com", icon: <IconBrandInstagram width={25} height={25} /> },
];


const Footer: React.FC = () => {
  return (
    <footer className="bg-secondColor text-white font-playfair font-semibold mt-20">
      <div className="flex flex-col md:flex-row ms-20 p-9">
        <div className="mt-8 md:w-1/3 lg:w-1/3">
          <p className="text-2xl" >Royal Key</p>
          
          <p className="text-[16px] mt-3 font-normal">
            2024 Royal Key. All Rights Reserved
          </p>

          <div className="flex space-x-3 mt-14">
            {socialLinks.map((link) => (
              <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-sixColor">
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 md:w-1/3 lg:w-1/3 space-y-3 font-medium ">
          <div>
            <NavLink label="Collection" to="#" />
          </div>

          <div>
            <NavLink label="Brands" to="#" />
          </div>

          <div>
            <NavLink label="About Us" to="/about-us"/>
          </div>
        </div>

        <div className="mt-8 md:w-1/3 lg:w-1/3 space-y-3">
          <div>
            <h4>Contact Us:</h4>
          </div>

          <div>
            <a href="tel:5222524244" className="font-normal hover:text-ThirdColor">
              522-252-4244
            </a>
          </div>

          <div>
            <a href="mailto:Royalkey@gmail.com" className="font-normal hover:text-ThirdColor">
              Royalkey@gmail.com
            </a>
          </div>

          <div>
            <NavLink label="www.RoyalKey.com" to="/" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
