import React, { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function SecuritySettings() {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    const { user } = useAuth();
    if (!user?.email) return;

    setLoading(true);
    try {
      await resetPassword(user.email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-forest mb-6">Security Settings</h2>
      
      <div className="space-y-4">
        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-forest text-white p-3 rounded-md hover:bg-forest-light transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending Reset Link...
            </>
          ) : (
            <>
              <Lock size={18} />
              Reset Password
            </>
          )}
        </button>
      </div>
    </div>
  );
}