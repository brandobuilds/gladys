import React from 'react';
import { Phone, Globe } from 'lucide-react';
import { getTimezones } from '../../utils/timeUtils';
import PolicyTooltip from '../policy/PolicyTooltip';
import type { UserData } from '../../services/userService';

interface Props {
  user: UserData;
  formData: Partial<UserData>;
  onChange: (field: keyof UserData, value: any) => void;
}

export default function NotificationSettings({ user, formData, onChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-forest mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} />
            <input
              type="tel"
              value={formData.phoneNumber ?? user.phoneNumber ?? ''}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
              placeholder="(555) 555-5555"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Timezone
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} />
            <select
              value={formData.timezone ?? user.timezone}
              onChange={(e) => onChange('timezone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent appearance-none"
            >
              {getTimezones().map(tz => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-mist-light/50 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="smsOptIn"
              checked={formData.smsOptIn ?? user.smsOptIn}
              onChange={(e) => onChange('smsOptIn', e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-mist text-forest focus:ring-forest cursor-pointer"
            />
            <div className="flex-1">
              <label htmlFor="smsOptIn" className="text-charcoal font-medium cursor-pointer">
                I agree to receive SMS notifications from Gladys
              </label>
              <div className="flex items-center gap-2 mt-2 text-sage text-sm">
                <PolicyTooltip className="flex-shrink-0" />
                <span>You can change this setting at any time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}