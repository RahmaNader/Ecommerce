import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import NavLink from "@components/atoms/Link/NavLink";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      id: "facebook",
      href: "https://facebook.com",
      icon: <IconBrandFacebook width={25} height={25} />,
    },
    {
      id: "linkedin",
      href: "https://linkedin.com",
      icon: <IconBrandLinkedin width={25} height={25} />,
    },
    {
      id: "twitter",
      href: "https://twitter.com",
      icon: <IconBrandTwitter width={25} height={25} />,
    },
    {
      id: "instagram",
      href: "https://instagram.com",
      icon: <IconBrandInstagram width={25} height={25} />,
    },
  ];

  const contactInfo = {
    phone: "522-252-4244",
    email: "Royalkey@gmail.com",
  };

  return (
    <footer className="bg-secondColor text-white font-playfair font-semibold mt-20">
      <div className="flex flex-col md:flex-row ms-20 p-9">
        {/* Section 1: Brand and Social Links */}
        <div className="mt-8 md:w-1/3 lg:w-1/3">
          <p className="text-2xl">Royal Key</p>
          <p className="text-[16px] mt-3 font-normal">
            2024 Royal Key. All Rights Reserved
          </p>

          <div className="flex space-x-3 mt-14">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit us on ${link.id}`}
                className="hover:text-eightColor"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-8 space-y-3 font-medium mr-60">
          <NavLink label="Collection" to="#" variant="footer" />
          <NavLink label="Brands" to="#" variant="footer" />
          <NavLink label="About Us" to="/about-us" variant="footer" />
        </div>

        {/* Section 3: Contact Information */}
        <div className="flex flex-col mt-8 space-y-3 font-medium mr-60">
          <h4>Contact Us:</h4>
          <NavLink
            label={contactInfo.phone}
            to={`tel:${contactInfo.phone}`}
            variant="footer"
          />
          <NavLink
            label={contactInfo.email}
            to={`mailto:${contactInfo.email}`}
            variant="footer"
          />
          <NavLink
            label="www.RoyalKey.com"
            to="/"
            variant="footer"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;