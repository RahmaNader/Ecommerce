import React from 'react';
import { NavLink } from 'react-router-dom';

const ProfileSidebar: React.FC = () => {
  const navItems = [
    { name: 'Personal Data', path: '/profile' },
    { name: 'Orders', path: '/profile/orders' },
    { name: 'Returns', path: '/profile/returns' },
    { name: 'Wish List', path: '/profile/wishlist' },
    { name: 'Verification', path: '/profile/verification' },
    { name: 'Payment & Credit Card', path: '/profile/payment-credit-card' },
    // { name: 'Logout', path: '/profile/logout' },
  ];

  return (
    <div className="w-64 p-4 bg-gray-100">
      <div className="mb-4 font-bold">User's Name</div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/profile'} // Apply `end` only for the "Personal Data" path
            className={({ isActive }) =>
              `p-2 rounded ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default ProfileSidebar;
