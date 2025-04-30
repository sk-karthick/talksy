"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, MoreVertical } from "lucide-react";
import supabase from '@/lib/supabaseClient';
import Message from '@/types/MessageTypes';

interface MessageProps {
  messages: Message;
}

interface UserProfile {
  id: string;
  username: string;
  avatar_url: string;
  updated_at: string;
}

export default function Sidebar({ messages }: MessageProps) {
  const [users, setUsers] = useState<Record<string, UserProfile>>({});

  // Fetch all unique users from message senders
  useEffect(() => {
    const fetchUsers = async () => {
      const uniqueSenderIds = Array.from(new Set(messages.map(m => m.sender_id)));

      if (uniqueSenderIds.length === 0) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('id', uniqueSenderIds);

      if (error) {
        console.error('Error fetching users:', error.message);
        return;
      }

      const userMap: Record<string, UserProfile> = {};
      data?.forEach(user => {
        userMap[user.id] = user;
      });

      setUsers(userMap);
    };

    fetchUsers();
  }, [messages]);

  return (
    <aside className="hidden md:flex flex-col w-142 transition-all">
      <div className='bg-white h-[95dvh] my-auto rounded-3xl shadow-r-2xl'>
        {/* Header */}
        <div className="px-4 py-4 flex items-center justify-between">
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </Button>
          <MoreVertical className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>

        {/* Search */}
        <div className="px-4">
          <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search Name" className="pl-10" />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 mt-4 relative overflow-y-auto h-full px-4">
          {messages.map((message) => {
            const sender = users[message.sender_id];
            if (!sender) return null;

            return (
              <div
                key={message.id}
                className="flex items-center gap-3 px-2 py-3 mb-2 cursor-pointer transition-colors hover:bg-gray-50"
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={sender.avatar_url} alt={sender.username} />
                    <AvatarFallback>{sender.username?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{sender.username}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
