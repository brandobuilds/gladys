import React from 'react';
import { format } from 'date-fns';
import { Smartphone } from 'lucide-react';
import type { Message } from '../types';

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-8">
        <Smartphone size={28} className="mx-auto text-sage mb-2" />
        <p className="text-sage">No messages yet. Don't worry, I'll start nagging soon...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}