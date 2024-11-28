import React from 'react';
import { PlayCircle, Plus } from 'lucide-react';

interface Props {
  onCreateTestNag: () => void;
  onTriggerAll: () => void;
  enabledNagsCount: number;
}

export default function TestModePanel({ onCreateTestNag, onTriggerAll, enabledNagsCount }: Props) {
  return (
    <div className="bg-forest-light text-mist-light p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">Test Mode Active</h3>
          <p className="text-sm text-mist-light/80">Use these tools to test your nags</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCreateTestNag}
            className="px-4 py-2 bg-forest hover:bg-olive transition-colors rounded-md flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Create Test Nag</span>
          </button>
          <button
            onClick={onTriggerAll}
            className="px-4 py-2 bg-forest hover:bg-olive transition-colors rounded-md flex items-center gap-2"
            disabled={enabledNagsCount === 0}
          >
            <PlayCircle size={18} />
            <span>Trigger All ({enabledNagsCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
}