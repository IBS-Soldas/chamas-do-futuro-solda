import { useState } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    User
} from 'firebase/auth';
import { useFirebase } from '@/contexts/FirebaseContext';
import { useUsers } from './useUsers';

export const useAuth = () => {
    const { auth, user } = useFirebase();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: users = [], isLoading: usersLoading, error: usersError } = useUsers();

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = users.find(u => u.firebaseUid === result.user.uid);
            console.log(result, user.accessLevel)
            
            return user;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string, displayName?: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if (displayName) {
                await updateProfile(result.user, { displayName });
            }
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signOutUser = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }) => {
        setLoading(true);
        setError(null);
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, updates);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        signIn,
        signUp,
        signOut: signOutUser,
        resetPassword,
        updateUserProfile,
        loading,
        error,
        clearError: () => setError(null),
    };
}; 