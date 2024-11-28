import React, { useState, useCallback } from 'react';
import { useUser } from '../hooks/useUser';
import { Loader2 } from 'lucide-react';
import ProfileHeader from '../components/profile/ProfileHeader';
import AccountSettings from '../components/profile/AccountSettings';
import NotificationSettings from '../components/profile/NotificationSettings';
import SecuritySettings from '../components/profile/SecuritySettings';
import DeleteAccount from '../components/profile/DeleteAccount';
import { validateAndFormatPhone } from '../utils/phoneUtils';
import type { UserData } from '../services/userService';

export default function Profile() {
  const { user, loading, error, updateUser } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({});

  const hasChanges = useCallback(() => {
    if (!user) return false;
    
    return Object.entries(formData).some(([key, value]) => {
      // Handle special case for empty string vs null/undefined
      if (value === '' && !user[key as keyof UserData]) return false;
      if (!value && user[key as keyof UserData]) return true;
      return value !== user[key as keyof UserData];
    });
  }, [user, formData]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-8">
          <div className="h-24 bg-mist-light rounded-lg"></div>
          <div className="space-y-6">
            <div className="h-40 bg-mist-light rounded-lg"></div>
            <div className="h-40 bg-mist-light rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-red-500">Failed to load profile data</p>
      </div>
    );
  }

  const handleFieldChange = (field: keyof UserData, value: any) => {
    // If the value is the same as the current user data, remove it from formData
    if (value === user[field]) {
      const { [field]: removed, ...rest } = formData;
      setFormData(rest);
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasChanges()) return;

    // Validate phone number if it's being updated
    if (formData.phoneNumber) {
      const phoneValidation = validateAndFormatPhone(formData.phoneNumber);
      if (!phoneValidation.isValid) {
        return;
      }
      formData.phoneNumber = phoneValidation.e164;
    }

    setIsSaving(true);
    try {
      await updateUser(formData);
      setFormData({}); // Clear pending changes after successful save
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProfileHeader user={user} />
      
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <AccountSettings
              user={user}
              formData={formData}
              onChange={handleFieldChange}
            />
            <SecuritySettings />
          </div>
          
          <div className="space-y-6">
            <NotificationSettings
              user={user}
              formData={formData}
              onChange={handleFieldChange}
            />
            <DeleteAccount />
          </div>
        </div>

        {hasChanges() && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-mist p-4 w-full max-w-md">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 bg-forest text-white p-3 rounded-md hover:bg-forest-light transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving Changes...
                </>
              ) : (
                'Save All Changes'
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}