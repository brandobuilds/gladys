import React from 'react';
import { UserCircle, Mail } from 'lucide-react';
import type { UserData } from '../../services/userService';

interface Props {
  user: UserData;
  formData: Partial<UserData>;
  onChange: (field: keyof UserData, value: any) => void;
}

export default function AccountSettings({ user, formData, onChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-forest mb-6">Account Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Display Name
          </label>
          <div className="relative">
            <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} />
            <input
              type="text"
              value={formData.displayName ?? user.displayName ?? ''}
              onChange={(e) => onChange('displayName', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
              placeholder="Your name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} />
            <input
              type="email"
              value={formData.email ?? user.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}