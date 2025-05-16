"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import UserTypes from '@/types/UserTypes';
import useFetchUsers from '@/hooks/useFetchUsers';
import NotFound from '../ui/NotFound';
import MoreOptionMenu from './MoreOptionMenu';
import useDebounce from '@/hooks/useDebounce';
import clsx from 'clsx';
import AiButton from '../ui/AiButton';

interface MessageProps {
  setSelectedUser: React.Dispatch<React.SetStateAction<UserTypes | null>>;
}

export default function Sidebar({ setSelectedUser }: MessageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [activeUser, setActiveUser] = useState<string | null>(null);
  const { users, loading, error } = useFetchUsers();

  const filteredUsers = useMemo(() => {
    return users?.filter(user =>
      user.username.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) || [];
  }, [debouncedSearch, users]);

  const handleUserClick = useCallback((user: UserTypes) => {
    setActiveUser(user.id);
    setSelectedUser(user);
  }, [setSelectedUser]);



  const renderSearchBar = () => (
    <div className="px-4">
      <div className="relative mt-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search Name"
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );

  const renderUserItem = (user: UserTypes) => {

    return (
      <div
        key={user.id}
        onClick={() => handleUserClick(user)}
        className={clsx(
          'flex items-center gap-3 py-3 mb-2 px-3 cursor-pointer transition-colors relative rounded-xl hover:bg-gray-100',
          activeUser === user.id && 'bg-[#b2c3f37e]'
        )}
      >
        <Avatar className="w-10 h-10">
          <AvatarImage src={user.avatar_url} alt={user.username} />
          <AvatarFallback>{user.username?.[0] ?? "U"}</AvatarFallback>
        </Avatar>

        {user.status && <span className="absolute left-8 bottom-3 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white" />}

        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium truncate max-w-[20dvw] text-gray-900">
              {user.username}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(user.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500 truncate max-w-[20dvw]">
              {/* {latestMessage?.content || 'No messages yet'} */}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside className="hidden md:flex flex-col w-142 transition-all relative">
      <div className="bg-white h-full">
        <div className="px-4 py-4 flex items-center justify-between h-16">
          <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
          <MoreOptionMenu />
        </div>

        {renderSearchBar()}

        <div className="flex-1 mt-4 overflow-y-auto h-full px-4 max-h-[63vh]">
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {loading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
          {!loading && filteredUsers.length === 0 && <NotFound text="No users found" />}
          {filteredUsers.map(renderUserItem)}
        </div>
      </div>

      <div className='absolute bottom-4 right-4 p-2 rounded-full flex items-center justify-center'>
        <AiButton onClick={() => {
          const aiUser = users?.find(u => u.username === 'Talksy');
          if (aiUser) handleUserClick(aiUser);
        }} />
      </div>

    </aside>
  );
}
