import React, { useEffect, useState } from "react";
import {NavLink} from "@components/atoms";
import verification from "@assets/verification.svg";
import WishList from "@assets/Wishlist.svg";
import Orders from "@assets/Orders.svg";
import PaymentAndCC from "@assets/PaymentAndCC.svg";
import PersonalData from "@assets/PersonalData.svg";
import verification1 from "@assets/verification1.svg";
import WishList1 from "@assets/Wishlist1.svg";
import Orders1 from "@assets/Orders1.svg";
import PaymentAndCC1 from "@assets/PaymentAndCC1.svg";
import PersonalData1 from "@assets/PersonalData1.svg";
import ProfilePhoto from "@assets/ProfilePhoto.svg";
import { useTranslation } from "react-i18next";
import { fetchPersonalData } from "@services/api/personaldetails";
import LogoutIcon from "@assets/Logout.svg";
import Cookies from "js-cookie"; 


const ProfileSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchPersonalData();
        setUserName(data.fullName || "Guest");
      } catch (error) {
        console.error("Failed to fetch personal data:", error);
      }
    };

    loadUserData();
  }, []);

const handleLogout = async () => {
    try {
      Cookies.remove("authToken");
      Cookies.remove("refreshToken");
      Cookies.remove("username");
      console.log("User successfully logged out");
      window.location.href = "/authentication";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navItems = [
    { label: t("profileSidebar.personalData"), path: "/profile", DefaultIcon: PersonalData, ActiveIcon: PersonalData1 },
    { label: t("profileSidebar.paymentAndCC"), path: "/profile/payment-credit-card", DefaultIcon: PaymentAndCC, ActiveIcon: PaymentAndCC1 },
    { label: t("profileSidebar.orders"), path: "/profile/orders", DefaultIcon: Orders, ActiveIcon: Orders1 },
    { label: t("profileSidebar.returns"), path: "/profile/returns", DefaultIcon: Orders, ActiveIcon: Orders1 },
    { label: t("profileSidebar.wishList"), path: "/profile/wishlist", DefaultIcon: WishList, ActiveIcon: WishList1 },
    { label: t("profileSidebar.verification"), path: "/profile/verification", DefaultIcon: verification, ActiveIcon: verification1 },
  ];

  return (
    <div className="h-fit bg-[#A78E7821] justify-center border-[1px] rounded-md border-ForthColor p-6 md:sticky md:top-0 md:overflow-y-auto">
      <div className="flex flex-row mb-4 font-bold items-center rtl:gap-4 justify-center">
        <img src={ProfilePhoto} alt="Profile Photo" className="w-8 h-8 rounded-full" />
        <p className="ml-4 font-playfair font-semibold text-lg text-wine">{userName}</p>
      </div>
      
      <nav className="flex flex-col space-y-6">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            label={item.label}
            to={item.path}
            DefaultIcon={item.DefaultIcon}
            ActiveIcon={item.ActiveIcon}
            variant="sidebar"
          />
        ))}
      </nav>


      <button
        onClick={handleLogout}
        className="flex items-center mt-6 text-ForthColor font-semibold"
      >
        <img src={LogoutIcon} alt="Logout Icon" className="w-8 h-8 mr-2 " />
        <p className="space-x-4 p-2 rounded-md font-playfair text-xl font-semibold"> {t("profileSidebar.logout")} </p>
      </button>

    </div>
  );
};

export default ProfileSidebar;