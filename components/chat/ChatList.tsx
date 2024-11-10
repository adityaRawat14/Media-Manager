"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatProps{
    chats:any[],
    setChats:React.Dispatch<any>
    setSelectedChat:React.Dispatch<any>
    selectedChat:any
    data:any
}
function ChatList({chats,setChats , setSelectedChat , selectedChat,data}:ChatProps) {
  return (
    <div>
    {chats?.map((chat:any) => {
        
return  ( 
   <div 
      key={chat.messageId}
      className={`flex items-center p-4 cursor-pointer hover:bg-accent ${ (selectedChat!=null && selectedChat.userData.uid==chat.userData.uid) ? " bg-accent":""}`}
      onClick={()=>{setSelectedChat(chat)}}
    >
      <Avatar className="h-10 w-10 mr-4">
        <AvatarImage src={chat.userData.avatar} alt={chat.userData.name} />
        <AvatarFallback>{chat.userData.name.charAt(0)}</AvatarFallback>   
      </Avatar>
      <div className="flex-grow">
        <h3 className="font-semibold">{chat.userData.name}</h3>
        <p className={`text-[12px]    ${!chat.messageSeen && chat.sId==data.uid ? " text-green-500 font-semibold ":"text-gray-700"} `}>
          {chat.lastMessage ? chat.lastMessage  : ""}
        </p>
      </div>
    </div>)
})}
    </div>
  )
}

export default ChatList