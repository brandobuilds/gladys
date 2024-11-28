import React, { useState } from 'react';
import { Info } from 'lucide-react';
import PolicyModal from './PolicyModal';

interface Props {
  className?: string;
}

export default function PolicyTooltip({ className = '' }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative group inline-block">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
          className={`text-sage hover:text-forest transition-colors ${className}`}
          aria-label="View SMS policy"
        >
          <Info size={16} />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-charcoal text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="text-center">
            By opting in, you'll receive SMS notifications for reminders and follow-ups.
            Standard message rates apply.
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-charcoal rotate-45"></div>
        </div>
      </div>

      {showModal && <PolicyModal onClose={() => setShowModal(false)} />}
    </>
  );
}