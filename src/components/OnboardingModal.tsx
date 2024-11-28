import React, { useState } from 'react';
import { X } from 'lucide-react';
import { validateAndFormatPhone } from '../utils/phoneUtils';
import { getTimezones } from '../utils/timeUtils';

interface Props {
  onComplete: (data: {
    phoneNumber: string;
    timezone: string;
    smsOptIn: boolean;
  }) => void;
  onClose: () => void;
}

export default function OnboardingModal({ onComplete, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timezone, setTimezone] = useState('America/New_York');
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneValidation = validateAndFormatPhone(phoneNumber);
    if (!phoneValidation.isValid) {
      setError('Please enter a valid phone number');
      return;
    }

    onComplete({
      phoneNumber: phoneValidation.e164 || phoneNumber,
      timezone,
      smsOptIn
    });
  };

  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-mist/20">
          <h2 className="text-xl font-bold text-forest">Welcome to Gladys</h2>
          <button 
            onClick={onClose}
            className="text-sage hover:text-forest p-1"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError('');
              }}
              className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
              placeholder="(555) 555-5555"
              required
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              Your Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
            >
              {getTimezones().map(tz => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="smsOptIn"
              checked={smsOptIn}
              onChange={(e) => setSmsOptIn(e.target.checked)}
              className="rounded border-mist text-forest focus:ring-forest"
            />
            <label htmlFor="smsOptIn" className="text-sm text-charcoal">
              I agree to receive SMS notifications
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-forest text-mist-light py-2 px-4 rounded-md hover:bg-forest-light transition-colors"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}