import React, { useState, useEffect } from 'react';
import { generateTimeOptions, generateDefaultHours } from '../utils/timeUtils';

interface Props {
  selectedHours: string[];
  onChange: (hours: string[]) => void;
  isRandom: boolean;
  onRandomChange: (isRandom: boolean) => void;
  frequency: number;
}

export default function TimeSelection({ selectedHours, onChange, isRandom, onRandomChange, frequency }: Props) {
  const [showRandomSection, setShowRandomSection] = useState(false);
  const [showSpecificSection, setShowSpecificSection] = useState(false);

  useEffect(() => {
    // Update selected hours when frequency changes and specific times are shown
    if (showSpecificSection) {
      onChange(generateDefaultHours(frequency));
    }
  }, [frequency, showSpecificSection]);

  const handleModeChange = (mode: 'random' | 'specific') => {
    if (mode === 'random') {
      setShowRandomSection(!showRandomSection);
      setShowSpecificSection(false);
      onRandomChange(true);
      // Set default random time range (9am to 9pm)
      onChange(['09', '21']);
    } else {
      setShowRandomSection(false);
      setShowSpecificSection(!showSpecificSection);
      onRandomChange(false);
      if (!showSpecificSection) {
        // Set default specific times based on frequency
        onChange(generateDefaultHours(frequency));
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleModeChange('specific')}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-all
            ${showSpecificSection
              ? 'bg-forest text-mist-light shadow-sm'
              : 'bg-mist-light text-charcoal hover:bg-mist'
            }
          `}
        >
          Send at specific times
        </button>
        <button
          type="button"
          onClick={() => handleModeChange('random')}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-all
            ${showRandomSection
              ? 'bg-forest text-mist-light shadow-sm'
              : 'bg-mist-light text-charcoal hover:bg-mist'
            }
          `}
        >
          Send at random times
        </button>
      </div>

      {showRandomSection && (
        <div className="space-y-3">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-charcoal mb-1">Start Time</label>
              <select
                value={selectedHours[0]}
                onChange={(e) => onChange([e.target.value, selectedHours[selectedHours.length - 1]])}
                className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
              >
                {generateTimeOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-charcoal mb-1">End Time</label>
              <select
                value={selectedHours[selectedHours.length - 1]}
                onChange={(e) => onChange([selectedHours[0], e.target.value])}
                className="w-full px-3 py-2 border border-mist rounded-md focus:ring-2 focus:ring-forest focus:border-transparent"
              >
                {generateTimeOptions()
                  .filter(option => parseInt(option.value) > parseInt(selectedHours[0]))
                  .map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <p className="text-sm text-sage">
            Nags will be sent at random times between these hours, spaced roughly equally apart
          </p>
        </div>
      )}

      {showSpecificSection && (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {generateTimeOptions().map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(
                    selectedHours.includes(option.value)
                      ? selectedHours.filter(h => h !== option.value)
                      : [...selectedHours, option.value].sort()
                  );
                }}
                className={`
                  px-3 py-2 rounded-md text-sm transition-all
                  ${selectedHours.includes(option.value)
                    ? 'bg-forest text-mist-light shadow-sm'
                    : 'bg-mist-light text-charcoal hover:bg-mist'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-sm text-sage">
            Select specific times when you want to receive nags
          </p>
        </div>
      )}
    </div>
  );
}