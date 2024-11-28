import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import TimeSelection from './TimeSelection';
import NotificationSettings from './NotificationSettings';
import { useUser } from '../hooks/useUser';
import type { Reminder, NotificationChannel } from '../types';

const RECURRENCE_OPTIONS = [
  { value: 'daily', label: 'Every day' },
  { value: 'today', label: 'Just today' },
  { value: 'tomorrow', label: 'Just tomorrow' },
  { value: 'workdays', label: 'Weekdays (Mon-Fri)' },
  { value: 'weekends', label: 'Weekends (Sat-Sun)' },
  { value: 'custom', label: 'Custom days' }
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Props {
  onAdd: (reminder: Omit<Reminder, 'id' | 'enabled'>) => void;
  onEdit?: (reminder: Omit<Reminder, 'id' | 'enabled'>) => void;
  editingNag?: Reminder | null;
  onClose: () => void;
}

export default function ReminderForm({ onAdd, onEdit, editingNag, onClose }: Props) {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [recurrence, setRecurrence] = useState<Reminder['recurrence']>('daily');
  const [frequency, setFrequency] = useState(1);
  const [selectedHours, setSelectedHours] = useState<string[]>(['09']);
  const [isRandom, setIsRandom] = useState(false);
  const [notification, setNotification] = useState<NotificationChannel>({
    type: 'sms',
    value: user?.phoneNumber || '',
    enabled: true,
    requireFollowUp: false,
    followUpTimeout: 15
  });

  // Update notification value when user data changes
  useEffect(() => {
    if (user?.phoneNumber && !editingNag) {
      setNotification(prev => ({
        ...prev,
        value: user.phoneNumber || ''
      }));
    }
  }, [user, editingNag]);

  useEffect(() => {
    if (editingNag) {
      setTitle(editingNag.title);
      setDays(editingNag.days);
      setRecurrence(editingNag.recurrence);
      setSelectedHours(editingNag.timeSlots[0].hours);
      setIsRandom(editingNag.timeSlots[0].isRandom);
      setFrequency(editingNag.timeSlots[0].frequency || 1);
      setNotification(editingNag.notifications[0]);
    }
  }, [editingNag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || selectedHours.length === 0 || !notification.value) return;
    
    // Set days based on recurrence pattern
    const selectedDays = recurrence === 'custom' 
      ? days
      : recurrence === 'workdays' 
        ? DAYS.slice(0, 5)
        : recurrence === 'weekends'
          ? DAYS.slice(5)
          : DAYS;

    if (selectedDays.length === 0) return;
    
    const nagData = {
      title,
      days: selectedDays,
      timeSlots: [{
        hours: selectedHours,
        isRandom,
        frequency: isRandom ? frequency : undefined
      }],
      recurrence,
      notifications: [notification]
    };

    if (editingNag && onEdit) {
      onEdit(nagData);
    } else {
      onAdd(nagData);
    }
  };

  return (
    <div className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-md my-8 shadow-xl">
        <div className="p-4 border-b border-mist/20">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-forest">
              {editingNag ? 'Edit Nag' : 'New Nag'}
            </h2>
            <button 
              onClick={onClose}
              className="text-sage hover:text-forest p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">
              What should I nag you about?
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
              placeholder="e.g., Do 10 pushups"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-1">Recurrence</label>
            <select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as Reminder['recurrence'])}
              className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
            >
              {RECURRENCE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {recurrence === 'custom' && (
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1">Select Days</label>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setDays(days.includes(day) 
                      ? days.filter(d => d !== day)
                      : [...days, day]
                    )}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      days.includes(day)
                        ? 'bg-forest text-mist-light'
                        : 'bg-mist-light text-charcoal hover:bg-mist'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <TimeSelection
            selectedHours={selectedHours}
            onChange={setSelectedHours}
            isRandom={isRandom}
            onRandomChange={setIsRandom}
            frequency={frequency}
          />

          <NotificationSettings
            notification={notification}
            onChange={(updates) => setNotification(prev => ({ ...prev, ...updates }))}
          />

          <button
            type="submit"
            className="w-full bg-forest text-mist-light py-2 px-4 rounded-md hover:bg-forest-light active:bg-olive transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            {editingNag ? 'Save Changes' : 'Add Nag'}
          </button>
        </form>
      </div>
    </div>
  );
}