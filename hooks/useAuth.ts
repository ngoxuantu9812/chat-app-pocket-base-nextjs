import { useState, useEffect } from 'react';
import pb from '../lib/pocketbase';
import { User } from '../lib/types';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(pb.authStore.model as User | null);

    useEffect(() => {
        pb.authStore.onChange((auth) => {
            setUser(pb.authStore.model as User | null);
        });
    }, []);

    const login = async (email: string, password: string) => {
        await pb.collection('users').authWithPassword(email, password);
    };

    const logout = () => {
        pb.authStore.clear();
    };

    return { user, login, logout };
};
