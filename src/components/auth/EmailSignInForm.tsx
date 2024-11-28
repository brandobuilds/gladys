import React, { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  onForgotPassword: () => void;
  onSignUp: () => void;
}

export default function EmailSignInForm({ onForgotPassword, onSignUp }: Props) {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-sage" size={18} />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-forest hover:text-forest-light"
        >
          Forgot password?
        </button>
        <button
          type="button"
          onClick={onSignUp}
          className="text-sm text-forest hover:text-forest-light"
        >
          Create account
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-forest text-white p-3 rounded-lg hover:bg-forest-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in with Email'
        )}
      </button>
    </form>
  );
}