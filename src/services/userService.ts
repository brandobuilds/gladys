import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User as FirebaseUser } from 'firebase/auth';

export interface UserData {
  id: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  timezone: string;
  smsOptIn: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserDocument(userId: string): Promise<UserData | null> {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    const data = userSnap.data();
    return {
      id: userSnap.id,
      email: data.email,
      displayName: data.displayName || null,
      phoneNumber: data.phoneNumber || null,
      timezone: data.timezone || 'America/New_York',
      smsOptIn: data.smsOptIn || false,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date()
    };
  } catch (error) {
    console.error('Error fetching user document:', error);
    return null;
  }
}

export async function createUserDocument(user: FirebaseUser): Promise<UserData> {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      email: user.email!,
      displayName: user.displayName || null,
      phoneNumber: user.phoneNumber || null,
      timezone: 'America/New_York',
      smsOptIn: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(userRef, userData);

    return {
      id: user.uid,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error creating user document:', error);
    throw new Error('Failed to create user document');
  }
}

export async function updateUserDocument(
  userId: string, 
  updates: Partial<UserData>
): Promise<UserData> {
  try {
    const userRef = doc(db, 'users', userId);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(userRef, updateData);
    
    const updatedDoc = await getDoc(userRef);
    if (!updatedDoc.exists()) {
      throw new Error('User document not found');
    }

    const data = updatedDoc.data();
    return {
      id: updatedDoc.id,
      email: data.email,
      displayName: data.displayName || null,
      phoneNumber: data.phoneNumber || null,
      timezone: data.timezone,
      smsOptIn: data.smsOptIn,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  } catch (error) {
    console.error('Error updating user document:', error);
    throw new Error('Failed to update user document');
  }
}