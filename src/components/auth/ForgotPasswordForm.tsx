import React, { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  onBack: () => void;
}

export default function ForgotPasswordForm({ onBack }: Props) {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      onBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-forest mb-2">Reset Password</h2>
        <p className="text-sage text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-forest text-forest p-3 rounded-lg hover:bg-forest-light hover:text-white transition-colors"
        >
          Back to Sign In
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-forest text-white p-3 rounded-lg hover:bg-forest-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Sending...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </div>
    </form>
  );
}