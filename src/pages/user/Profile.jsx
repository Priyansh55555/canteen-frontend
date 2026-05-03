import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <User size={40} className="text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-500 mt-1">Manage your account settings</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <User size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">-</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Mail size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-900">-</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Phone size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900">-</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <MapPin size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">-</p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Calendar size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Joined Date</p>
                <p className="font-medium text-gray-900">-</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Building size={20} className="text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
