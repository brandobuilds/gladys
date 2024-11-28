import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Chrome } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import EmailSignInForm from '../components/auth/EmailSignInForm';
import EmailSignUpForm from '../components/auth/EmailSignUpForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';

type AuthView = 'signin' | 'signup' | 'forgot-password';

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const location = useLocation();
  const [view, setView] = useState<AuthView>('signin');
  const from = (location.state as any)?.from?.pathname || '/';

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-mist-light flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-forest mb-2">Welcome to Gladys</h1>
          <p className="text-sage">
            {view === 'signup' 
              ? 'Create an account to get started'
              : view === 'forgot-password'
                ? 'Reset your password'
                : 'Sign in to start managing your reminders'}
          </p>
        </div>

        {view === 'signin' && (
          <>
            <EmailSignInForm
              onForgotPassword={() => setView('forgot-password')}
              onSignUp={() => setView('signup')}
            />

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-mist"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-sage">Or continue with</span>
              </div>
            </div>

            <button
              onClick={signInWithGoogle}
              className="w-full bg-forest text-white p-4 rounded-lg hover:bg-forest-light transition-colors flex items-center justify-center gap-3"
            >
              <Chrome size={20} />
              <span>Continue with Google</span>
            </button>
          </>
        )}

        {view === 'signup' && (
          <EmailSignUpForm onBack={() => setView('signin')} />
        )}

        {view === 'forgot-password' && (
          <ForgotPasswordForm onBack={() => setView('signin')} />
        )}

        <p className="mt-6 text-center text-sm text-sage">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}