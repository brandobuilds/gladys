import React from 'react';
import { useTestMode } from '../contexts/TestModeContext';
import { useUser } from '../hooks/useUser';
import { toast } from 'react-hot-toast';
import { createTestNag, triggerAllNags } from '../services/testService';
import type { Reminder } from '../types';

interface Props {
  nags: Reminder[];
  onNagCreate: (nag: Reminder) => void;
}

export default function TestControls({ nags, onNagCreate }: Props) {
  const { testMode } = useTestMode();
  const { user } = useUser();

  const handleCreateTestNag = async () => {
    try {
      const testNag = await createTestNag();
      onNagCreate(testNag);
      toast.success('Test nag created');
    } catch (error) {
      console.error('Error creating test nag:', error);
      toast.error('Failed to create test nag');
    }
  };

  const handleTriggerAll = async () => {
    if (!user?.phoneNumber) {
      toast.error('Please add a phone number in your profile first');
      return;
    }

    try {
      const result = await triggerAllNags(nags, user.phoneNumber);
      if (result.failed > 0) {
        toast.error(`${result.failed} of ${result.total} messages failed to send`);
      } else {
        toast.success(`Successfully sent ${result.succeeded} test messages`);
      }
    } catch (error) {
      console.error('Error triggering all nags:', error);
      toast.error('Failed to send test messages');
    }
  };

  if (!testMode) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-forest text-white p-4 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={handleCreateTestNag}
          className="flex-1 px-4 py-2 bg-forest-light rounded-md hover:bg-olive transition-colors"
        >
          Create Test Nag
        </button>
        <button
          onClick={handleTriggerAll}
          className="flex-1 px-4 py-2 bg-forest-light rounded-md hover:bg-olive transition-colors"
          disabled={nags.filter(n => n.enabled).length === 0}
        >
          Trigger All ({nags.filter(n => n.enabled).length})
        </button>
      </div>
    </div>
  );
}