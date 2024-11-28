import { useState, useEffect } from 'react';
import { useUser } from './useUser';
import { toast } from 'react-hot-toast';

export function useSmsPreferences() {
  const { user, updateUser } = useUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [localOptIn, setLocalOptIn] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalOptIn(user.smsOptIn);
    }
  }, [user]);

  const updateSmsPreferences = async (checked: boolean) => {
    setLocalOptIn(checked);
    
    if (user) {
      setIsUpdating(true);
      try {
        await updateUser({ 
          smsOptIn: checked,
          phoneNumber: checked && !user.phoneNumber ? '' : user.phoneNumber 
        });
        toast.success(checked ? 'SMS notifications enabled' : 'SMS notifications disabled');
      } catch (error) {
        console.error('Failed to update SMS opt-in:', error);
        toast.error('Failed to update SMS preferences');
        setLocalOptIn(!checked); // Revert on error
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return {
    isOptedIn: localOptIn,
    isUpdating,
    updatePreferences: updateSmsPreferences
  };
}