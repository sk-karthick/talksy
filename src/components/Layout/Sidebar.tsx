"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, MoreVertical } from "lucide-react";

interface Chat {
  id: number;
  name: string;
  avatar: string;
  time: string;
  unread?: boolean;
}

// Dummy chat data
const dummyChats: Chat[] = [
  { id: 1, name: "Karlyn Carabello", avatar: "https://i.pravatar.cc/150?img=10", time: "23 mins ago", unread: true },
  { id: 2, name: "Junior Sabine", avatar: "https://i.pravatar.cc/150?img=20", time: "1 hour ago" },
  { id: 3, name: "Melonie Sherk", avatar: "https://i.pravatar.cc/150?img=30", time: "3 hours ago" },
  { id: 4, name: "Harrison Palmatier", avatar: "https://i.pravatar.cc/150?img=40", time: "7 hours ago" },
  { id: 5, name: "Tressa Duhart", avatar: "https://i.pravatar.cc/150?img=50", time: "10 hours ago" },
  { id: 6, name: "Erick Spiva", avatar: "https://i.pravatar.cc/150?img=60", time: "13 hours ago" },
  { id: 7, name: "Josefina Simpson", avatar: "https://i.pravatar.cc/150?img=70", time: "Yesterday" },
];

export default function Sidebar() {
  const [selectedChat, setSelectedChat] = useState(dummyChats[2].id);

  return (
    <aside className="hidden md:flex flex-col w-142 transition-all">

      <div className='bg-white h-[95dvh] my-auto rounded-3xl shadow-r-2xl'>
        <div className="px-4 py-4 flex items-center justify-between">
          <Button className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create New</span>
          </Button>
          <MoreVertical className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
        </div>

        <div className="px-4">
          <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search Name" className="pl-10" />
          </div>
        </div>

        <div className="flex-1 mt-4 relative overflow-y-auto h-[100%]">
          {dummyChats.map((chat) => {
            const isSelected = selectedChat === chat.id;
            return (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`
                flex items-center gap-3 px-2 py-3 mb-2 cursor-pointer transition-colors
                ${isSelected ? "bg-[#f4f7ff] border-l-4 border-pink-500" : "hover:bg-gray-50"}
              `}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {chat.unread && (
                    <span className="absolute left-0 bottom-0 block h-2 w-2 bg-green-500 rounded-full ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{chat.name}</p>
                  <p className="text-xs text-gray-500">{chat.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
