import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) return console.error(error.message);

            const sessionUser = data?.session?.user ?? null;
            if (sessionUser) {
                setUser(sessionUser);
                router.push(`/chat/${sessionUser.id}`);
            }
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(session.user);
                router.push(`/chat/${session.user.id}`);
            } else {
                setUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
            return null;
        }

        if (data?.user) {
            setUser(data.user);
            router.push(`/chat/${data.user.id}`);
        }

        return data.user;
    };

    return { user, login, error, setError };
};
