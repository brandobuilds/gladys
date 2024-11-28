import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUserDocument, createUserDocument, updateUserDocument, type UserData } from '../services/userService';
import { toast } from 'react-hot-toast';

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  updateUser: (updates: Partial<UserData>) => Promise<UserData | null>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchOrCreateUser = async () => {
      try {
        let userData = await getUserDocument(authUser.uid);
        
        if (!userData) {
          userData = await createUserDocument(authUser);
        }
        
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateUser();
  }, [authUser]);

  const updateUser = async (updates: Partial<UserData>) => {
    if (!authUser || !user) {
      toast.error('Please sign in to update your settings');
      return null;
    }

    try {
      const updatedUser = await updateUserDocument(authUser.uid, updates);
      setUser(updatedUser);
      toast.success('Settings updated successfully');
      return updatedUser;
    } catch (err) {
      console.error('Error updating user:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update settings';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}