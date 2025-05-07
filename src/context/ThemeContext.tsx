"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import supabase from '@/lib/supabaseClient';

type Theme = boolean;

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(true);

    useEffect(() => {
        const fetchTheme = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('dark_mode')
                    .eq('id', user.id)
                    .single();

                if (data && !error) {
                    setTheme(data.dark_mode);
                }
                localStorage.setItem('dark_mode', data?.dark_mode.toString());

            } else {
                const savedTheme = localStorage.getItem('dark_mode');
                if (savedTheme) {
                    setTheme(savedTheme === 'true');
                }
            }
        };

        fetchTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = !theme;
        setTheme(newTheme);
        localStorage.setItem('dark_mode', newTheme.toString());
        document.documentElement.classList.toggle('dark', newTheme);

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase
                .from('profiles')
                .update({ id: user.id, dark_mode: newTheme })
                .eq('id', user.id);
        }

    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
