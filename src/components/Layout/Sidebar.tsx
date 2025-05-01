"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, MoreVertical } from "lucide-react";
import supabase from '@/lib/supabaseClient';
import Message from '@/types/MessageTypes';

interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
  updated_at: string;
}

interface MessageProps {
  messages: Message[];
  currentUserId: string;
  setSelectedUser: (user: UserProfile) => void;
}

export default function Sidebar({ messages, setSelectedUser, currentUserId }: MessageProps) {
  const [users, setUsers] = useState<Record<string, UserProfile>>({});

  const [activeUser, setActiveUser] = useState<Boolean | null>(false);

  const handleClick = (userId: string) => {
    setActiveUser(true);
  };

  useEffect(() => {
    const fetchChatParticipants = async () => {
      if (!messages || messages.length === 0 || !currentUserId) return;

      const participantIds = new Set<string>();

      messages.forEach(m => {
        if (m.sender_id && m.sender_id !== currentUserId) {
          participantIds.add(m.sender_id);
        }
        if (m.receiver_id && m.receiver_id !== currentUserId) {
          participantIds.add(m.receiver_id);
        }
      });

      const idsArray = Array.from(participantIds);
      if (idsArray.length === 0) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url, updated_at')
        .in('id', idsArray);

      if (error) {
        console.error('Error fetching profiles:', error.message);
        return;
      }
      const userMap: Record<string, UserProfile> = {};
      data?.forEach(user => {
        userMap[user.id] = user;
      });

      setUsers(userMap);
    };

    fetchChatParticipants();
  }, [messages, currentUserId]);


  return (
    <aside className="hidden md:flex flex-col w-142 transition-all">
      <div className='bg-white h-[95dvh] my-auto rounded-3xl shadow-r-2xl'>
        <div className="px-4 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
          <MoreVertical className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>

        <div className="px-4">
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search Name" className="pl-10" />
          </div>
        </div>

        <div className="flex-1 mt-4 relative overflow-y-auto h-full px-4 max-h-[63vh]">
          {Object.values(users).map(user => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedUser(user)
                handleClick(user.id)
              }}
              className={`flex items-center gap-3 py-3 mb-2 cursor-pointer transition-colors hover:bg-gray-50 relative ${activeUser ? 'bg-[#f4f7ff]' : ''}`}
            >
              <Avatar className="w-10 h-10 ">
                <AvatarImage src={user.avatar_url} alt={user.username} />
                <AvatarFallback className='bg-[var(--background)] text-white'>{user.username?.[0] ?? "U"}</AvatarFallback>
              </Avatar>
              {user && (
                <span className="absolute left-8 bottom-3 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />
              )}
              <div className="flex-1">
                <div className='flex items-center justify-between'>
                  <p className="text-sm font-medium text-gray-900 max-w-[20dvw] overflow-ellipsis overflow-hidden">{user.username}</p>
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
                    <span className="absolute right-1 bottom-3 bg-emerald-600 rounded-full  text-[10px] text-white p-0.5">
                      {messages.length}
                    </span>
                  )}  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
