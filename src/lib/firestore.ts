import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  DocumentReference,
  CollectionReference,
} from 'firebase/firestore';
import { db } from './firebase';

// Generic CRUD operations
export const firestore = {
  // Create a new document
  async create<T extends DocumentData>(
    collectionName: string,
    data: T
  ): Promise<string> {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  },

  // Get a single document by ID
  async get<T = DocumentData>(
    collectionName: string,
    docId: string
  ): Promise<T | null> {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  },

  // Get all documents from a collection
  async getAll<T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  },

  // Update a document
  async update<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: Partial<T>
  ): Promise<void> {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  },

  // Delete a document
  async delete(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  },

  // Query documents with filters
  async query<T = DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[]
  ): Promise<T[]> {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  },
};

// Helper functions for common queries
export const queryHelpers = {
  where: (field: string, operator: any, value: any) => where(field, operator, value),
  orderBy: (field: string, direction?: 'asc' | 'desc') => orderBy(field, direction),
  limit: (count: number) => limit(count),
};

// Export Firestore types for convenience
export { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit }; 