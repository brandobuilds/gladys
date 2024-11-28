import React, { useState } from 'react';
import { Info } from 'lucide-react';
import OptInPolicy from './OptInPolicy';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SmsOptIn({ checked, onChange }: Props) {
  const [showPolicy, setShowPolicy] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!checked && e.target.checked) {
      setShowPolicy(true);
    } else {
      onChange(e.target.checked);
    }
  };

  const handlePolicyClose = () => {
    setShowPolicy(false);
    onChange(true);
  };

  return (
    <>
      <div className="flex items-center gap-2 bg-mist-light/50 p-3 rounded-lg">
        <input
          type="checkbox"
          id="smsOptIn"
          checked={checked}
          onChange={handleChange}
          className="rounded border-mist text-forest focus:ring-forest"
        />
        <label htmlFor="smsOptIn" className="text-sm text-charcoal flex items-center gap-2">
          I agree to receive SMS notifications from Gladys
          <button
            onClick={() => setShowPolicy(true)}
            className="text-sage hover:text-forest transition-colors"
            aria-label="View SMS policy"
          >
            <Info size={16} />
          </button>
        </label>
      </div>

      {showPolicy && <OptInPolicy onClose={handlePolicyClose} />}
    </>
  );
}