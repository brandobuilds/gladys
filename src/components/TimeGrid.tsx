import React from 'react';
import { Clock } from 'lucide-react';
import { generateTimeGrid } from '../utils/timeUtils';

interface Props {
  selectedHours: string[];
  onChange: (hours: string[]) => void;
}

export default function TimeGrid({ selectedHours, onChange }: Props) {
  const hours = generateTimeGrid();

  const toggleHour = (hour: string) => {
    onChange(
      selectedHours.includes(hour)
        ? selectedHours.filter(h => h !== hour)
        : [...selectedHours, hour].sort()
    );
  };

  const formatHour = (hour: string): string => {
    const hourNum = parseInt(hour, 10);
    if (hourNum === 0) return '12am';
    if (hourNum === 12) return '12pm';
    return hourNum > 12 
      ? `${hourNum - 12}pm`
      : `${hourNum}am`;
  };

  return (
    <div className="grid grid-cols-8 gap-2">
      {hours.map(hour => (
        <button
          key={hour}
          type="button"
          onClick={() => toggleHour(hour)}
          className={`
            relative p-2 rounded-md text-sm transition-all
            ${selectedHours.includes(hour)
              ? 'bg-forest text-mist-light shadow-sm hover:bg-forest-light'
              : 'bg-mist-light text-charcoal hover:bg-mist/30'
            }
          `}
        >
          {formatHour(hour)}
        </button>
      ))}
    </div>
  );
}