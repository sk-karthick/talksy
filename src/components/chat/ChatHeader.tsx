import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal } from 'lucide-react';
import UserTypes from '@/types/UserTypes';

export interface UserProps {
    selectedUser: UserTypes;
}

const ChatHeader: React.FC<UserProps> = (props) => {
    const { selectedUser } = props;

    return (
        <div className='w-full flex items-center justify-between h-16 pr-5 px-10 bg-white shadow'>
            <div className='flex items-center gap-3'>
                <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedUser.avatar_url} alt={selectedUser.username} />
                    <AvatarFallback className='bg-[var(--background)] text-white'>{selectedUser.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className='text-2xl font-semibold'>{selectedUser.username}</h1>
            </div>
            <div>
                <MoreHorizontal className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
        </div>
    )
}

export default ChatHeader