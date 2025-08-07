// src/contexts/AppContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface UserData {
    accessLevel: number;
    asaasCustomerId: string;
    asaasPaymentId: string;
    city: string;
    contratoUrl: string;
    courses: { id: string; time: string }[];
    cpfCnpj: string;
    createdAt: Date | string;
    email: string;
    firebaseUid: string;
    isActive: boolean;
    motivoInadimplencia: string;
    name: string;
    neighborhood: string;
    number: string;
    phone: string;
    state: string;
    updatedAt: Date | string;
}

interface AppContextType {
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    users: UserData[];
    setUsers: (users: UserData[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [users, setUsers] = useState<UserData[]>([]);

    return (
        <AppContext.Provider value={{ isAdmin, setIsAdmin, theme, setTheme, users, setUsers }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};