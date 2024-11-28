import React, { useState, useEffect } from 'react';
import { Bell, Plus } from 'lucide-react';
import ReminderForm from '../components/ReminderForm';
import MessageList from '../components/MessageList';
import DeleteConfirmation from '../components/DeleteConfirmation';
import NagCard from '../components/NagCard';
import TestControls from '../components/TestControls';
import { useTestMode } from '../contexts/TestModeContext';
import { useUser } from '../hooks/useUser';
import { getUserReminders, createReminder, updateReminder, deleteReminder } from '../services/reminderService';
import { toast } from 'react-hot-toast';
import type { Reminder, Message } from '../types';

export default function Dashboard() {
  const { user } = useUser();
  const { testMode } = useTestMode();
  const [showForm, setShowForm] = useState(false);
  const [nags, setNags] = useState<Reminder[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingNag, setEditingNag] = useState<Reminder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadReminders();
    }
  }, [user?.id]);

  const loadReminders = async () => {
    if (!user?.id) return;
    
    try {
      const userReminders = await getUserReminders(user.id);
      setNags(userReminders);
    } catch (error) {
      console.error('Error loading reminders:', error);
      toast.error('Failed to load reminders');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNag = async (nagData: Omit<Reminder, 'id' | 'enabled'>) => {
    if (!user?.id) return;

    try {
      const newNag = await createReminder(user.id, { ...nagData, enabled: true });
      setNags(prev => [...prev, newNag]);
      setShowForm(false);
      toast.success('Reminder created successfully');
    } catch (error) {
      console.error('Error creating reminder:', error);
      toast.error('Failed to create reminder');
    }
  };

  const handleEditNag = async (nagData: Omit<Reminder, 'id' | 'enabled'>) => {
    if (!editingNag) return;
    
    try {
      await updateReminder(editingNag.id, nagData);
      setNags(prev => prev.map(nag => 
        nag.id === editingNag.id
          ? { ...nag, ...nagData }
          : nag
      ));
      setShowForm(false);
      setEditingNag(null);
      toast.success('Reminder updated successfully');
    } catch (error) {
      console.error('Error updating reminder:', error);
      toast.error('Failed to update reminder');
    }
  };

  const toggleNag = async (id: string) => {
    const nag = nags.find(n => n.id === id);
    if (!nag) return;

    try {
      await updateReminder(id, { enabled: !nag.enabled });
      setNags(prev =>
        prev.map(nag =>
          nag.id === id
            ? { ...nag, enabled: !nag.enabled }
            : nag
        )
      );
    } catch (error) {
      console.error('Error toggling reminder:', error);
      toast.error('Failed to update reminder');
    }
  };

  const handleDeleteNag = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm) return;

    try {
      await deleteReminder(showDeleteConfirm);
      setNags(prev => prev.filter(nag => nag.id !== showDeleteConfirm));
      toast.success('Reminder deleted successfully');
    } catch (error) {
      console.error('Error deleting reminder:', error);
      toast.error('Failed to delete reminder');
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  if (loading) {
    return (
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 h-fit mb-6 md:mb-0">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-mist-light rounded w-1/4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-mist-light rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:grid md:grid-cols-2 md:gap-6">
      <section className="bg-white rounded-lg shadow-md p-4 md:p-6 h-fit mb-6 md:mb-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-forest">Your Nags</h2>
          <button
            onClick={() => {
              setEditingNag(null);
              setShowForm(true);
            }}
            className="bg-forest text-mist-light p-2 rounded-full hover:bg-forest-light active:bg-olive transition-colors"
            aria-label="Add new nag"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {nags.map(nag => (
            <NagCard
              key={nag.id}
              nag={nag}
              onToggle={toggleNag}
              onDelete={handleDeleteNag}
              onEdit={setEditingNag}
              testMode={testMode}
            />
          ))}

          {nags.length === 0 && (
            <div className="text-center py-6">
              <Bell size={28} className="mx-auto text-sage mb-2" />
              <p className="text-sage">No nags yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold text-forest mb-4">Gladys's Latest</h2>
        <MessageList messages={messages} />
      </section>

      {showForm && (
        <ReminderForm
          onAdd={handleAddNag}
          onEdit={handleEditNag}
          editingNag={editingNag}
          onClose={() => {
            setShowForm(false);
            setEditingNag(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(null)}
        />
      )}

      <TestControls
        nags={nags}
        onNagCreate={(nag) => setNags(prev => [...prev, nag])}
      />
    </div>
  );
}