import React, { useState, useEffect } from 'react';
import { validateAndFormatPhone } from '../utils/phoneUtils';
import type { NotificationChannel } from '../types';

const FOLLOW_UP_TIMEOUTS = [
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 60, label: '1 hour' }
];

interface Props {
  notification: NotificationChannel;
  onChange: (updates: Partial<NotificationChannel>) => void;
}

export default function NotificationSettings({ notification, onChange }: Props) {
  const [phoneInput, setPhoneInput] = useState(notification.value);
  const [validation, setValidation] = useState({ isValid: true, message: '' });

  useEffect(() => {
    const result = validateAndFormatPhone(phoneInput);
    setValidation({
      isValid: result.isValid,
      message: result.isValid ? '' : 'Please enter a valid US phone number'
    });
    if (result.isValid && result.e164) {
      onChange({ value: result.e164 });
    }
  }, [phoneInput]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneInput(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={phoneInput}
          onChange={handlePhoneChange}
          placeholder="(555) 555-5555"
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-forest focus:border-transparent ${
            validation.isValid ? 'border-mist' : 'border-red-500'
          }`}
          required
        />
        {!validation.isValid && (
          <p className="mt-1 text-sm text-red-500">{validation.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="requireFollowUp"
          checked={notification.requireFollowUp}
          onChange={(e) => onChange({ requireFollowUp: e.target.checked })}
          className="rounded border-mist text-forest focus:ring-forest"
        />
        <label htmlFor="requireFollowUp" className="text-sm text-charcoal">
          Require follow-up confirmation
        </label>
      </div>

      {notification.requireFollowUp && (
        <div>
          <label className="block text-sm text-charcoal mb-1">
            Follow-up timeout
          </label>
          <select
            value={notification.followUpTimeout}
            onChange={(e) => onChange({ 
              followUpTimeout: parseInt(e.target.value) 
            })}
            className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
            required
          >
            {FOLLOW_UP_TIMEOUTS.map(timeout => (
              <option key={timeout.value} value={timeout.value}>
                {timeout.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-sage mt-1">
            Gladys will nag you again if you don't confirm within this time
          </p>
        </div>
      )}
    </div>
  );
}