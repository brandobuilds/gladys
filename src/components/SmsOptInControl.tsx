import React from 'react';

interface Props {
  checked: boolean;
  disabled: boolean;
  onToggle: (checked: boolean) => void;
}

export default function SmsOptInControl({ checked, disabled, onToggle }: Props) {
  return (
    <div className="bg-mist-light/50 p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="smsOptIn"
          checked={checked}
          onChange={(e) => onToggle(e.target.checked)}
          disabled={disabled}
          className="w-5 h-5 rounded border-mist text-forest focus:ring-forest cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        />
        <label 
          htmlFor="smsOptIn" 
          className={`text-charcoal font-medium cursor-pointer select-none ${disabled ? 'opacity-50' : ''}`}
        >
          I agree to receive SMS notifications from Gladys
        </label>
      </div>
      <p className="text-sage text-sm mt-2 ml-8">
        You can change this setting at any time
      </p>
    </div>
  );
}