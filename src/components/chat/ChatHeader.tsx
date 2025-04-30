import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal } from 'lucide-react';
import UserTypes from '@/types/UserTypes';

export interface UserProps {
    user: UserTypes;
}

const ChatHeader: React.FC<UserProps> = (props) => {
    const { user } = props;

    return (
        <div className='w-full flex items-center justify-between h-28 pr-5'>
            <div className='flex items-center gap-3'>
                <Avatar className="w-13 h-13">
                    <AvatarImage src={String(user.avatar_url)} alt={user.username} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className='text-2xl font-semibold'>{user.username}</h1>
            </div>
            <div>
                <MoreHorizontal className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </div>
        </div>
    )
}

export default ChatHeader