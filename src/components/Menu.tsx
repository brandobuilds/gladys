import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, Bell, HelpCircle, MessageSquare, UserCircle, Beaker } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useTestMode } from '../contexts/TestModeContext';
import UserProfile from './auth/UserProfile';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { testMode, toggleTestMode } = useTestMode();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const menuItems = [
    { to: '/', icon: Bell, label: 'Dashboard' },
    { to: '/profile', icon: UserCircle, label: 'User & Settings' },
    { to: '/sms-policy', icon: MessageSquare, label: 'SMS Policy' },
    { to: '/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-mist-light/80 hover:text-mist-light hover:bg-forest-light transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
            >
              {user && (
                <div className="p-4 bg-forest-light">
                  <UserProfile />
                </div>
              )}

              <div className="p-2">
                <div className="space-y-1">
                  {user && (
                    <button
                      onClick={() => {
                        toggleTestMode();
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors ${
                        testMode
                          ? 'bg-forest text-mist-light'
                          : 'text-charcoal hover:bg-mist-light'
                      }`}
                    >
                      <Beaker size={18} />
                      Test Mode
                    </button>
                  )}

                  {user && menuItems.map(({ to, icon: Icon, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setIsOpen(false)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors ${
                        location.pathname === to
                          ? 'bg-forest text-mist-light'
                          : 'text-charcoal hover:bg-mist-light'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  ))}

                  <div className="my-2 border-t border-mist/20" />

                  <div className="px-4 py-2">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 text-charcoal hover:text-forest transition-colors"
                      >
                        <X size={18} />
                        <span className="text-sm">Logout</span>
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="w-full flex items-center gap-2 text-charcoal hover:text-forest transition-colors"
                      >
                        <UserCircle size={18} />
                        <span className="text-sm">Sign In</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}