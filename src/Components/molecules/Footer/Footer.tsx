import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import {NavLink} from "@components/atoms";
import { useTranslation } from "react-i18next";


const Footer: React.FC = () => {
  const { t } = useTranslation();

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
    <footer className="bg-secondColor text-white font-playfair font-semibold mt-20 bottom-0">
      <div className="flex flex-col md:flex-row p-9">
        {/* Section 1: Brand and Social Links */}
        <div className="mt-8 md:w-1/3 lg:w-1/3">
          <p className="text-2xl">{t("footer.brandName")}</p>
          <p className="text-[16px] mt-3 font-normal">
            {t("footer.copyright")}
          </p>

          <div className="flex space-x-3 mt-14">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t("footer.visitUs")} ${link.id}`}
                className="hover:text-eightColor"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-8 space-y-3 font-medium ltr:mr-60 rtl:ml-60">
        <NavLink label={t("footer.collection")} to="#" variant="footer" />
          <NavLink label={t("footer.brands")} to="#" variant="footer" />
          <NavLink label={t("footer.aboutUs")} to="/about-us" variant="footer" />
        </div>

        {/* Section 2: Contact Information */}
        <div className="flex flex-col  mt-8 space-y-3 font-medium ">
        <h4>{t("footer.contactUs")}:</h4>
          <NavLink
            label={`${t("footer.phone")}: ${contactInfo.phone}`}
            to={`tel:${contactInfo.phone}`}
            variant="footer"
          />
          <NavLink
            label={`${t("footer.email")}: ${contactInfo.email}`}
            to={`mailto:${contactInfo.email}`}
            variant="footer"
          />
          <NavLink
            label={`${t("footer.website")}: www.RoyalKey.com`}
            to="/"
            variant="footer"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;