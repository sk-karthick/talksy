"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/lib/supabaseClient';
import Image from 'next/image';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { User } from '@supabase/supabase-js';


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error.message);
                return;
            }

            if (data?.session?.user) {
                setUser(data.session.user);
                if (data.session) {
                    router.push(`/chat/${data.session.user.id}`);
                }
                console.log('Session:', data.session);
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

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        console.log('Logged in user:', data.user);

        if (data.user) {
            router.push(`/chat/${data.user.id}`);
        }
    };

    return (
        <div className="flex items-center justify-center h-dvh">
            <div className="bg-blue-50 w-[70dvw] h-[70dvh] rounded-3xl shadow-lg z-10 flex items-center justify-center overflow-hidden">
                <div className="w-[50%] flex-shrink-1 h-full flex items-center justify-center">
                    <Image
                        src="/images/logo.png"
                        alt="Talksy Logo"
                        layout="intrinsic"
                        width={400}
                        height={500}
                    />
                </div>
                <div className="flex-shrink-0 w-[50%] h-full bg-[#A769F7]">
                    <div className="space-y-2 text-center pt-12">
                        <h2 className="text-2xl font-bold mb-12">Login</h2>
                    </div>
                    <form className="px-8 flex flex-col items-center justify-evenly h-[60%]" onSubmit={handleLogin}>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                className="rounded-full h-12 border-[#bdc3c7] bg-white"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-full h-12 border-[#bdc3c7] bg-white"
                                required
                            />
                        </div>
                        <Button
                            className="w-full h-[50px] rounded-3xl bg-green-500 cursor-pointer text-2xl hover:bg-green-600"
                            type="submit"
                        >
                            Login
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </form>
                    <div className="flex items-center justify-center mt-4">
                        <p className="text-sm text-gray-600">Don't have an account? </p>
                        <a href="/register" className="text-white ml-1 hover:underline">Register</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
