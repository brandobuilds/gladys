import React from 'react';
import { X } from 'lucide-react';
import PolicyContent from './PolicyContent';

interface Props {
  onClose: () => void;
}

export default function PolicyModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8 shadow-xl">
        <div className="flex justify-between items-center p-6 border-b border-mist">
          <h2 className="text-xl font-bold text-forest">SMS Notification Policy</h2>
          <button
            onClick={onClose}
            className="text-sage hover:text-forest p-1 rounded-full hover:bg-mist-light transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <PolicyContent />
        </div>

        <div className="p-6 border-t border-mist bg-mist-light/30">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-forest text-white rounded-md hover:bg-forest-light transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}