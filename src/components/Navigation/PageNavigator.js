import React from 'react';
import { Link } from 'react-router-dom';

const PageNavigator = () => {
  return (
    <div className="fixed top-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="font-semibold text-gray-900 mb-3">Quick Navigation</h3>
      <div className="space-y-2">
        <Link 
          to="/login" 
          className="block px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
        >
          Login Page
        </Link>
        <Link 
          to="/register" 
          className="block px-3 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
        >
          Register Page
        </Link>
        <Link 
          to="/dashboard" 
          className="block px-3 py-2 text-sm bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
        >
          User Dashboard
        </Link>
        <Link 
          to="/booking" 
          className="block px-3 py-2 text-sm bg-orange-100 text-orange-800 rounded hover:bg-orange-200"
        >
          Booking Page
        </Link>
        <Link 
          to="/booking-history" 
          className="block px-3 py-2 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
        >
          Booking History
        </Link>
        <Link 
          to="/payment" 
          className="block px-3 py-2 text-sm bg-pink-100 text-pink-800 rounded hover:bg-pink-200"
        >
          Payment Page
        </Link>
        <Link 
          to="/profile" 
          className="block px-3 py-2 text-sm bg-indigo-100 text-indigo-800 rounded hover:bg-indigo-200"
        >
          Profile Page
        </Link>
        <Link 
          to="/admin" 
          className="block px-3 py-2 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Admin Dashboard
        </Link>
        <Link 
          to="/admin/users" 
          className="block px-3 py-2 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          User Management
        </Link>
        <Link 
          to="/admin/slots" 
          className="block px-3 py-2 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Slot Management
        </Link>
        <Link 
          to="/admin/facilities" 
          className="block px-3 py-2 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Facility Management
        </Link>
        <Link 
          to="/admin/analytics" 
          className="block px-3 py-2 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Analytics Dashboard
        </Link>
        <Link 
          to="/manager" 
          className="block px-3 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
        >
          Manager Dashboard
        </Link>
        <Link 
          to="/security" 
          className="block px-3 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
        >
          Security Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PageNavigator;
