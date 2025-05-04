'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
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
        <div className="flex items-center justify-center h-dvh ">
            <div className='fixed inset-0 w-full h-full z-0'>
                <Image
                    src='/images/chat-bg.jpg'
                    layout='fill'
                    objectFit='cover'
                    alt='Background Image'
                />
            </div>

            <div className="w-[40%] h-[70dvh] rounded-4xl rounded-br-none overflow-hidden shadow-lg z-10 backdrop-blur-[30px] border border-white/20">
                    <div className="flex items-center justify-center pt-5">
                        <Image
                            src="/images/logo-dark.png"
                            alt="Talksy Logo"
                            width={400}
                            height={500}
                            loading="lazy"
                            placeholder="blur"
                            className='filter drop-shadow-[0px_6px_5px_#000]'
                            blurDataURL="/images/logo-placeholder.png"
                        />
                    </div>
                    <form className="px-8 flex flex-col items-center justify-evenly h-[60%]" onSubmit={handleSubmit}>
                        <div className="space-y-2 w-full">
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="rounded-full h-12 border-[#bdc3c7] bg-white"
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-full h-12 border-[#bdc3c7] bg-white"
                                placeholder="Password"
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
    );
};

export default LoginForm;
