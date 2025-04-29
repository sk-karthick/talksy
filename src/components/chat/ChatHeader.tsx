import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Ellipsis, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';

const ChatHeader = () => {
    return (
        <div className='w-full flex items-center justify-between h-28 pr-5'>
            <div className='flex items-center gap-3'>
                <Avatar className="w-13 h-13">
                    <AvatarImage src='https://i.pravatar.cc/150?img=10' alt='https://i.pravatar.cc/150?img=10' />
                    <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <h1 className='text-2xl font-semibold'>Karlyn Carabello</h1>
            </div>
            <div>
                <MoreHorizontal className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
        </div>
    )
}

export default ChatHeader