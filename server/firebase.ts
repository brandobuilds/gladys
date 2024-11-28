import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
} = process.env;

if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
  throw new Error('Missing Firebase configuration');
}

const app = initializeApp({
  credential: cert({
    projectId: FIREBASE_PROJECT_ID,
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: FIREBASE_CLIENT_EMAIL,
  }),
});

export const db = getFirestore(app);

// Helper functions for common operations
export async function getUser(auth0Id: string) {
  const userDoc = await db.collection('users').doc(auth0Id).get();
  return userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
}

export async function updateUser(auth0Id: string, data: any) {
  const userRef = db.collection('users').doc(auth0Id);
  await userRef.set({
    ...data,
    updatedAt: new Date(),
  }, { merge: true });
  
  const updated = await userRef.get();
  return { id: updated.id, ...updated.data() };
}

export async function getNags(userId: string) {
  const nagsSnapshot = await db.collection('nags')
    .where('userId', '==', userId)
    .get();
  
  return nagsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function createNag(data: any) {
  const nagRef = await db.collection('nags').add({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  
  const created = await nagRef.get();
  return { id: created.id, ...created.data() };
}

export async function updateNag(id: string, data: any) {
  const nagRef = db.collection('nags').doc(id);
  await nagRef.update({
    ...data,
    updatedAt: new Date(),
  });
  
  const updated = await nagRef.get();
  return { id: updated.id, ...updated.data() };
}

export async function deleteNag(id: string) {
  await db.collection('nags').doc(id).delete();
}