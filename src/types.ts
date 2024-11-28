export interface TimeSlot {
  hours: string[];
  isRandom: boolean;
  frequency?: number;
}

export interface NotificationChannel {
  type: 'sms';
  value: string;
  enabled: boolean;
  requireFollowUp?: boolean;
  followUpTimeout?: number;
}

export interface Reminder {
  id: string;
  title: string;
  days: string[];
  timeSlots: TimeSlot[];
  recurrence: 'daily' | 'today' | 'tomorrow' | 'workdays' | 'weekends' | 'custom';
  enabled: boolean;
  timezone: string;
  notifications: NotificationChannel[];
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  reminderTitle: string;
  nagId: string;
  notificationType: 'sms';
  requiresFollowUp?: boolean;
  followedUp?: boolean;
}