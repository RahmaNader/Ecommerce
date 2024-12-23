import React from 'react';
import { Breadcrumb } from '@components/molecules';
import { ProfileSidebar } from '@components/organisms';
import { Outlet } from 'react-router-dom';
import {PrivateRoute} from '@components/molecules';

const ProfileLayout: React.FC = () => {
  return (
    <PrivateRoute>
      <div className="flex flex-wrap md:flex-row min-h-screen p-4 md:p-10 gap-4">
        <div className='flex flex-col gap-10 mx-auto md:sticky md:top-0 md:h-screen md:overflow-y-auto'>
          <Breadcrumb />
          <ProfileSidebar />
        </div>
        <div className="flex-1 p-0 mx-0 md:mx-8">
          <Outlet />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default ProfileLayout;