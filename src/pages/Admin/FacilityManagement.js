import React from 'react';

const FacilityManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Facility Management</h1>
        <p className="text-gray-600 mt-1">Manage parking facilities and their settings</p>
      </div>

      <div className="card p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Facility Management</h3>
          <p className="mt-1 text-sm text-gray-500">This feature will be implemented soon.</p>
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;
