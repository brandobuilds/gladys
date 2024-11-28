import React, { useState } from 'react';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function DeleteAccount() {
  const { user } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // TODO: Implement account deletion logic
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-red-500 mb-6">Danger Zone</h2>
      
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full border-2 border-red-500 text-red-500 p-3 rounded-md hover:bg-red-50 transition-colors"
        >
          Delete Account
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-md">
            <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />
            <div>
              <p className="font-medium text-red-500">Are you absolutely sure?</p>
              <p className="text-sm text-red-600 mt-1">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-white border border-mist text-charcoal p-3 rounded-md hover:bg-mist-light transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Deleting...
                </>
              ) : (
                'Yes, delete account'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}