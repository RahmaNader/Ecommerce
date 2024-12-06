import React from "react";
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
//Logout: make it work later
import ProfilePhoto from "@assets/ProfilePhoto.svg";

const ProfileSidebar: React.FC = () => {
  const navItems = [
    { label: "Personal Data", path: "/profile", DefaultIcon: PersonalData, ActiveIcon :PersonalData1 },
    { label: "Payment & Credit Card", path: "/profile/payment-credit-card", DefaultIcon: PaymentAndCC, ActiveIcon: PaymentAndCC1 },
    { label: "Orders", path: "/profile/orders", DefaultIcon: Orders, ActiveIcon: Orders1 },
    { label: "Returns", path: "/profile/returns", DefaultIcon: Orders, ActiveIcon: Orders1 },
    { label: "Wish List", path: "/profile/wishlist", DefaultIcon: WishList, ActiveIcon: WishList1 },
    { label: "Verification", path: "/profile/verification", DefaultIcon: verification, ActiveIcon: verification1 }, 
  ];

  return (
    <div className="h-fit bg-[#A78E7821] justify-center border-[1px] rounded-md border-ForthColor p-6">
      
      <div className="flex flex-row mb-4 font-bold items-center justify-center">
        <img src={ProfilePhoto} alt="Profile Photo" className="w-8 h-8 rounded-full" />
        <p className="ml-4 font-playfair font-semibold text-lg text-wine">John Doe</p>   
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
    </div>
  );
};

export default ProfileSidebar;
