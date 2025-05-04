'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useRegister from '@/hooks/useRegister'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const registerUser = useRegister()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setError('Email and Password are required.')
            return
        }

        await registerUser(formData, setError, setSuccess)
    }

    return (
        <div className="flex items-center justify-center h-dvh relative overflow-hidden">
            <div className="fixed inset-0 z-0">
                <Image
                    src="/images/chat-bg.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Background"
                    className="pointer-events-none"
                />
            </div>

            <div className="w-full max-w-xl z-10 backdrop-blur-[30px] border border-white/20 bg-white/10 p-8 rounded-xl shadow-xl">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/images/logo-dark.png"
                        alt="Logo"
                        width={200}
                        height={100}
                        className="drop-shadow-[0px_4px_6px_rgba(0,0,0,0.5)]"
                    />
                </div>

                <h2 className="text-2xl font-bold text-white text-center mb-4">Register</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Username" name="username" type="text" value={formData.username} onChange={handleChange} />
                    <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
                    <button
                        type="submit"
                        className="w-full bg-green-500 mt-3 text-white py-2 rounded-md cursor-pointer hover:bg-green-400 transition"
                    >
                        Register
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-white/80">
                        Already have an account?
                        <Link href="/" className="text-blue-300 ml-1 hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register

const Input = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
}: {
    label: string
    name: string
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
    <div>
        <label className="block text-sm text-white mb-1">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md bg-white/20 text-white placeholder:text-white/80 focus:outline-none focus:ring focus:ring-blue-300"
        />
    </div>
)
