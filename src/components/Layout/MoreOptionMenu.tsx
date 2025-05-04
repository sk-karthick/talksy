import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LogOut, MoreVertical } from 'lucide-react'
import React from 'react'
import ThemeSwitcher from '../ui/ThemeSwitcher'
import supabase from '@/lib/supabaseClient'

const MoreOptionMenu = () => {

    const switchTheme = () => {
        console.log("Theme switched");
    }

    const handleLogout = () => {
        supabase.auth.signOut().then(({ error }) => {
            console.log("Logout clicked", error);
        });
    }

    return (
        <Popover>
            <PopoverTrigger asChild className="relative z-40">
                <MoreVertical className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent align="start" className="relative z-50 bg-white p-2 rounded-md shadow-md">
                <ul className="flex flex-col">
                    <li className="py-3 px-4 cursor-pointer hover:bg-blue-50 flex items-center gap-4"
                    >
                        <ThemeSwitcher switchTheme={switchTheme}/>
                    </li>
                    <li className="py-3 px-4 pl-8 cursor-pointer text-red-500 hover:bg-blue-50 flex items-center gap-10"
                        onClick={() => handleLogout()}
                    >
                        <LogOut className="w-6 h-6 " />
                        <span>Logout</span>
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    )
}

export default MoreOptionMenu