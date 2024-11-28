import { generateSassyMessage } from '../utils/sassyMessages';
import { sendSMS } from './smsService';
import type { Reminder } from '../types';
import { toast } from 'react-hot-toast';

export async function createTestNag(): Promise<Reminder> {
  return {
    id: crypto.randomUUID(),
    title: 'Test Reminder',
    days: ['Monday', 'Wednesday', 'Friday'],
    timeSlots: [{
      hours: ['09', '12', '15'],
      isRandom: false,
      frequency: 3
    }],
    recurrence: 'custom',
    enabled: true,
    timezone: 'America/New_York',
    notifications: [{
      type: 'sms',
      value: '',
      enabled: true,
      requireFollowUp: true,
      followUpTimeout: 15
    }]
  };
}

export async function triggerNag(nag: Reminder, phoneNumber: string) {
  if (!phoneNumber) {
    toast.error('Phone number is required to test nags');
    throw new Error('Phone number is required');
  }

  const message = generateSassyMessage(nag.title);
  const result = await sendSMS(
    phoneNumber,
    message,
    nag.id,
    nag.notifications[0].requireFollowUp || false
  );

  if (!result.success) {
    throw new Error(result.error || 'Failed to send test message');
  }

  return true;
}

export async function triggerAllNags(nags: Reminder[], phoneNumber: string) {
  if (!phoneNumber) {
    toast.error('Phone number is required to test nags');
    throw new Error('Phone number is required');
  }

  const enabledNags = nags.filter(nag => nag.enabled);
  const results = await Promise.allSettled(
    enabledNags.map(nag => triggerNag(nag, phoneNumber))
  );

  const succeeded = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  if (failed > 0) {
    toast.error(`${failed} of ${enabledNags.length} messages failed to send`);
  } else if (succeeded > 0) {
    toast.success(`Successfully sent ${succeeded} test messages`);
  }

  return { succeeded, failed, total: enabledNags.length };
}