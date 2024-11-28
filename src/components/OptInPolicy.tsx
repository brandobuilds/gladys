import React from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function OptInPolicy({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-md my-4 shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-mist/20">
          <h2 className="text-lg font-bold text-forest">SMS Policy</h2>
          <button
            onClick={onClose}
            className="text-sage hover:text-forest p-1"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4 text-sm overflow-y-auto max-h-[60vh]">
          <p className="text-charcoal">
            By opting in, you'll receive text messages for reminders and follow-ups. 
            Standard message and data rates may apply.
          </p>

          <div>
            <h3 className="font-semibold text-forest mb-2">What to Expect</h3>
            <ul className="list-disc pl-4 space-y-1 text-charcoal">
              <li>Scheduled reminder messages</li>
              <li>Follow-up confirmations</li>
              <li>Response receipts</li>
              <li>Important setting updates</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-forest mb-2">Message Frequency</h3>
            <p className="text-charcoal">
              You'll receive messages only at your scheduled times, plus any enabled follow-ups.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-forest mb-2">How to Opt Out</h3>
            <ul className="list-disc pl-4 space-y-1 text-charcoal">
              <li>Uncheck the SMS opt-in box</li>
              <li>Reply STOP to any message</li>
              <li>Contact support</li>
            </ul>
          </div>

          <p className="text-xs text-sage pt-2">
            By enabling SMS notifications, you agree to these terms.
          </p>
        </div>

        <div className="p-4 border-t border-mist/20">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-forest text-white rounded-md hover:bg-forest-light transition-colors text-sm font-medium"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}