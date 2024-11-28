import React from 'react';
import { useUser } from '../hooks/useUser';
import { getTimezones } from '../utils/timeUtils';
import { validateAndFormatPhone } from '../utils/phoneUtils';

export default function Settings() {
  const { user, updateUser, loading } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get('phoneNumber') as string;
    const timezone = formData.get('timezone') as string;

    const phoneValidation = validateAndFormatPhone(phoneNumber);
    if (!phoneValidation.isValid) {
      return;
    }

    try {
      await updateUser({
        phoneNumber: phoneValidation.e164,
        timezone
      });
    } catch (error) {
      console.error('Failed to update settings:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-mist-light rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-mist-light rounded w-1/3"></div>
            <div className="h-10 bg-mist-light rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-forest mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-charcoal mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={user?.phoneNumber}
            className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-charcoal mb-1">
            Timezone
          </label>
          <select
            id="timezone"
            name="timezone"
            defaultValue={user?.timezone}
            className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
          >
            {getTimezones().map(tz => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-forest text-mist-light py-2 px-4 rounded-md hover:bg-forest-light transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}