import React from 'react';
import { Undo2 } from 'lucide-react';

interface Props {
  message: string;
  onUndo: () => void;
}

export default function UndoToast({ message, onUndo }: Props) {
  return (
    <div className="flex items-center gap-3 bg-forest text-mist-light px-4 py-3 rounded-lg shadow-lg">
      <p>{message}</p>
      <button
        onClick={onUndo}
        className="flex items-center gap-1 text-sm hover:text-white transition-colors"
      >
        <Undo2 size={14} />
        Undo
      </button>
    </div>
  );
}