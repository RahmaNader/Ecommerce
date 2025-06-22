import React from "react";
import { Breadcrumb } from "@components/molecules";
import { ProfileSidebar } from "@components/organisms";
import { Outlet } from "react-router-dom";
import { PrivateRoute } from "@components/molecules";
import ScrollToTop from "@utils/ScrollToTop";

const ProfileLayout: React.FC = () => {
  return (
    <PrivateRoute>
      {/* Changed to flex-col by default for mobile, md:flex-row for larger screens */}
      <div className="flex flex-col md:flex-row min-h-screen p-4 md:p-10 gap-8">
        <ScrollToTop />

        {/* Mobile: full width, Desktop: sticky sidebar */}
        <div className="w-full md:w-auto flex flex-col gap-6 md:gap-10 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
          <Breadcrumb />
          <ProfileSidebar />
        </div>

        {/* Content area */}
        <div className="w-full mt-6 md:mt-0 md:flex-1 p-0 mx-0 md:mx-8">
          <Outlet />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProfileLayout;
