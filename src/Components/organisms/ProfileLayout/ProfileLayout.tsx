import React from 'react';
import {Breadcrumb} from '@components/molecules';
import {ProfileSidebar} from '@components/organisms';
import { Outlet } from 'react-router-dom';

const ProfileLayout: React.FC = () => {
  return (
      <div className="flex flex-wrap md:flex-row min-h-screen p-10 gap-4 items-start">
        <div className='flex flex-col gap-10'>
          <Breadcrumb />
          <ProfileSidebar />
        </div>
        <div className="flex-1 mx-8">
          <Outlet />
        </div>
      </div>
  );
};

export default ProfileLayout;
