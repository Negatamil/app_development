import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-primary-600">P</span>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Parking Pro
        </h2>
        <p className="mt-2 text-center text-sm text-primary-100">
          Smart Parking Solutions
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-primary-100">
          © 2024 Parking Pro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
