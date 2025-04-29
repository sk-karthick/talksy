'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, setError } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        await login(email, password);
    };

    return (
        <div className="flex items-center justify-center h-dvh">
            <div className="bg-blue-50 w-[70dvw] h-[70dvh] rounded-3xl shadow-lg z-10 flex items-center justify-center overflow-hidden">
                <div className="w-[50%] flex-shrink-1 h-full flex items-center justify-center">
                    <Image
                        src="/images/logo.png"
                        alt="Talksy Logo"
                        width={400}
                        height={500}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="/images/logo-placeholder.png"
                    />
                </div>
                <div className="flex-shrink-0 w-[50%] h-full bg-[#A769F7]">
                    <div className="text-center pt-12">
                        <h2 className="text-2xl font-bold mb-12">Login</h2>
                    </div>
                    <form className="px-8 flex flex-col items-center justify-evenly h-[60%]" onSubmit={handleSubmit}>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="m@example.com"
                                required
                                className="rounded-full h-12 border-[#bdc3c7] bg-white"
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
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
                        <p className="text-sm text-gray-600">Dont have an account?</p>
                        <Link href="/register" className="text-white ml-1 hover:underline">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
