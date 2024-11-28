import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Reminder } from '../types';

export async function getUserReminders(userId: string): Promise<Reminder[]> {
  try {
    const remindersRef = collection(db, 'reminders');
    const q = query(remindersRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Reminder));
  } catch (error) {
    console.error('Error fetching reminders:', error);
    throw new Error('Failed to fetch reminders');
  }
}

export async function createReminder(userId: string, reminder: Omit<Reminder, 'id'>): Promise<Reminder> {
  try {
    const remindersRef = collection(db, 'reminders');
    const docRef = await addDoc(remindersRef, {
      ...reminder,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return {
      id: docRef.id,
      ...reminder
    };
  } catch (error) {
    console.error('Error creating reminder:', error);
    throw new Error('Failed to create reminder');
  }
}

export async function updateReminder(id: string, updates: Partial<Reminder>): Promise<void> {
  try {
    const reminderRef = doc(db, 'reminders', id);
    await updateDoc(reminderRef, {
      ...updates,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating reminder:', error);
    throw new Error('Failed to update reminder');
  }
}

export async function deleteReminder(id: string): Promise<void> {
  try {
    const reminderRef = doc(db, 'reminders', id);
    await deleteDoc(reminderRef);
  } catch (error) {
    console.error('Error deleting reminder:', error);
    throw new Error('Failed to delete reminder');
  }
}