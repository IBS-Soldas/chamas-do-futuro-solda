import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { auth, db, storage } from '@/lib/firebase';

interface FirebaseContextType {
    user: User | null;
    loading: boolean;
    auth: typeof auth;
    db: typeof db;
    storage: typeof storage;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (context === undefined) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

interface FirebaseProviderProps {
    children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe: () => void;

        const initAuth = async () => {
            try {
                await setPersistence(auth, browserLocalPersistence);
                unsubscribe = onAuthStateChanged(auth, (user) => {
                    setUser(user);
                    setLoading(false);
                });
            } catch (error) {
                console.error('Failed to set auth persistence:', error);
                setLoading(false);
            }
        };

        initAuth();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const value = {
        user,
        loading,
        auth,
        db,
        storage,
    };

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};