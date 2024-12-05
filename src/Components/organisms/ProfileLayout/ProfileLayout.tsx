import React from 'react';
import {Breadcrumb} from '@components/molecules';
import {ProfileSidebar} from '@components/organisms';
import { Outlet } from 'react-router-dom';

const ProfileLayout: React.FC = () => {
  return (
    <>
      <Breadcrumb />
      <div className="flex min-h-screen">
        <ProfileSidebar />
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
