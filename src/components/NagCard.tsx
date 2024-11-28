import React from 'react';
import { motion } from 'framer-motion';
import { Power, PlayCircle, Trash2, ToggleLeft, ToggleRight, Edit2 } from 'lucide-react';
import type { Reminder } from '../types';

interface Props {
  nag: Reminder;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (nag: Reminder) => void;
  testMode: boolean;
  onTest?: (id: string) => void;
}

export default function NagCard({ nag, onToggle, onDelete, onEdit, testMode, onTest }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`rounded-lg border p-3 transition-all ${
        nag.enabled 
          ? 'border-sage bg-white shadow-sm' 
          : 'border-mist/30 bg-mist-light/50 opacity-60'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-charcoal truncate">{nag.title}</h3>
          <p className="text-sm text-sage truncate">
            {nag.recurrence === 'custom' 
              ? nag.days.map(d => d.slice(0, 3)).join(', ')
              : nag.recurrence === 'workdays'
                ? 'Weekdays'
                : nag.recurrence === 'weekends'
                  ? 'Weekends'
                  : nag.recurrence === 'today'
                    ? 'Just today'
                    : nag.recurrence === 'tomorrow'
                      ? 'Just tomorrow'
                      : 'Every day'}
          </p>
          <p className="text-xs text-sage truncate">
            {nag.timeSlots.map((slot, i) => (
              <span key={i}>
                {slot.isRandom
                  ? `${slot.frequency}x between ${slot.hours[0]}:00-${slot.hours[1]}:00`
                  : slot.hours.map(h => `${h}:00`).join(', ')}
                {i < nag.timeSlots.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {testMode && (
            <button
              onClick={() => onTest?.(nag.id)}
              className="p-2 rounded-full text-sage hover:text-forest hover:bg-mist-light transition-colors group relative"
              aria-label="Test nag"
            >
              <PlayCircle size={20} />
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Test this nag
              </span>
            </button>
          )}
          <button
            onClick={() => onEdit(nag)}
            className="p-2 rounded-full text-sage hover:text-forest hover:bg-mist-light transition-colors group relative"
            aria-label="Edit nag"
          >
            <Edit2 size={20} />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Edit
            </span>
          </button>
          <button
            onClick={() => onDelete(nag.id)}
            className="p-2 rounded-full text-sage hover:text-red-500 hover:bg-red-50 transition-colors group relative"
            aria-label="Delete nag"
          >
            <Trash2 size={20} />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Delete
            </span>
          </button>
          <button
            onClick={() => onToggle(nag.id)}
            className={`p-2 rounded-full transition-colors group relative ${
              nag.enabled
                ? 'bg-sage/10 text-forest hover:bg-sage/20'
                : 'bg-mist/10 text-charcoal/40 hover:bg-mist/20'
            }`}
            aria-label={nag.enabled ? 'Disable nag' : 'Enable nag'}
          >
            {nag.enabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {nag.enabled ? 'Turn off' : 'Turn on'}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}