import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-sm p-6 shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-forest" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-charcoal">Delete Nag?</h3>
            <p className="text-sm text-sage">This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-mist rounded-md text-charcoal hover:bg-mist-light transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-forest text-white rounded-md hover:bg-forest-light transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}