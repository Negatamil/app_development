import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

const Profile = () => {
  const { user, role } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setIsEditing(false);
      // Show success message
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      email: user?.email || '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
    });
    setFormErrors({});
    setIsEditing(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'MANAGER':
        return 'bg-blue-100 text-blue-800';
      case 'SECURITY':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.email?.split('@')[0]}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRoleColor(role)}`}>
                {role}
              </span>
            </div>
          </div>

          {/* Account Stats */}
          <div className="card p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span className="font-medium">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total bookings:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total spent:</span>
                <span className="font-medium">$156.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Favorites:</span>
                <span className="font-medium">3 slots</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  error={formErrors.firstName}
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  error={formErrors.lastName}
                />
              </div>

              <Input
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={formErrors.email}
                required
              />

              <Input
                name="phone"
                label="Phone Number"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                error={formErrors.phone}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className={`input resize-none ${!isEditing ? 'bg-gray-50' : ''}`}
                  placeholder="Enter your address"
                />
                {formErrors.address && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  loading={saving}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="card p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Security</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Login Sessions</h4>
                  <p className="text-sm text-gray-600">Manage your active login sessions</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="card p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive email updates about your bookings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-600">Receive SMS alerts for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Auto-Extend Bookings</h4>
                  <p className="text-sm text-gray-600">Automatically extend bookings when time is running out</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
