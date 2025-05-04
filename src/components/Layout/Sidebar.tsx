"use client";
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Message from '@/types/MessageTypes';
import UserTypes from '@/types/UserTypes';
import useFetchUsers from '@/hooks/useFetchUsers';
import NotFound from '../ui/NotFound';
import MoreOptionMenu from './MoreOptionMenu';


interface MessageProps {
  messages: Message[];
  currentUserId: UserTypes[];
  setSelectedUser: Dispatch<SetStateAction<UserTypes | null>>;
}

export default function Sidebar({ messages, setSelectedUser, currentUserId }: MessageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const usersFetch = useFetchUsers();

  const handleClick = (userId: string) => {
    setActiveUser(userId);
  };

  const filteredUsers = usersFetch?.filter(user => {
    return user.username.toLowerCase().includes(searchTerm.toLowerCase()) && user.id !== currentUserId[0]?.id;
  });



  return (
    <aside className="hidden md:flex flex-col w-142 transition-all">
      <div className='bg-white h-[100%] my-auto '>
        <div className="px-4 py-4 flex items-center justify-between h-16">
          <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
          {MoreOptionMenu()}
        </div>

        <div className="px-4">
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search Name"
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>


        <div className="flex-1 mt-4 relative overflow-y-auto h-full px-4 max-h-[63vh]">
          {filteredUsers?.length === 0 ? (
            <>
              <p className="text-sm text-gray-500 px-2 flex items-center justify-center">No users found.</p>
              <NotFound text={'No users found'} />
            </>
          ) : (
            filteredUsers?.map(user => (
              <div
                key={user.id}
                onClick={() => {
                  setSelectedUser({
                    username: user.username,
                    id: user.id,
                    avatar_url: user.avatar_url,
                    name: user.username,
                    gender: "unknown",
                    age: 0,
                    email: "unknown@example.com",
                    phone_no: "unknown",
                    bio: "No bio available",
                    status: "offline",
                    last_seen: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                    password: "defaultPassword",
                    blocked_users: [],
                  });
                  handleClick(user.id);
                }}
                className={`flex items-center gap-3 py-3 mb-2 cursor-pointer transition-colors hover:bg-gray-50 relative ${activeUser === user.id ? 'bg-[#f4f7ff]' : ''}`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback className='bg-[var(--background)] text-white'>
                    {user.username?.[0] ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute left-8 bottom-3 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
                <div className="flex-1">
                  <div className='flex items-center justify-between'>
                    <p className="text-sm font-medium text-gray-900 max-w-[20dvw] overflow-ellipsis overflow-hidden">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(user.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className="text-sm text-gray-500 max-w-[20dvw] overflow-ellipsis overflow-hidden">
                      {messages
                        .filter(m => m.sender_id === user.id || m.receiver_id === user.id)
                        .slice(-1)[0]?.content ?? 'No messages yet'}
                    </p>
                    {messages.length > 0 && (
                      <span className="absolute right-1 bottom-3 bg-emerald-600 rounded-full text-[10px] text-white p-1 w-[20px] h-[20px] flex items-center justify-center">
                        {messages.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
