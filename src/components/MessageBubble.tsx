import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Smartphone } from 'lucide-react';
import type { Message } from '../types';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg bg-mist-light/50 p-3"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-forest rounded-full flex items-center justify-center">
            <Smartphone size={16} className="text-mist-light" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-forest text-sm md:text-base mb-1">Gladys</p>
          <p className="text-charcoal text-sm md:text-base break-words">{message.text}</p>
          <div className="mt-2 flex items-center gap-2 text-xs md:text-sm text-sage">
            <span>{format(new Date(message.timestamp), 'MMM d, h:mm a')}</span>
            <span>•</span>
            <span className="truncate">{message.reminderTitle}</span>
            {message.requiresFollowUp && !message.followedUp && (
              <span className="bg-forest/10 text-forest px-2 py-0.5 rounded-full text-xs">
                Awaiting response
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}