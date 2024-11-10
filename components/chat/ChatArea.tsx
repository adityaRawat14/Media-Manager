"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Send, Menu as MenuIcon, Image as ImageIcon, X, Paperclip, Download } from "lucide-react"
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import UserProfileModal from '@/components/chat/UserProfileModal'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '@/config/firsbase'
import { upload } from '@/lib/helpers/upload/upload'
import { Input } from '../ui/input'
import { toast } from '@/hooks/use-toast'

interface ChatAreaProps {
  selectedChat: any
  data: any
  setIsSidebarOpen: any
}

function ChatArea({ selectedChat, data, setIsSidebarOpen }: ChatAreaProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tempImage, setTempImage] = useState<File | null>(null);
  const [tempImagePreview, setTempImagePreview] = useState<string | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([])
    if (selectedChat == null) return;

    const msgId = selectedChat.messageId;
    const unsub = onSnapshot((doc(db, "messages", msgId)), (res: any) => {
      console.log(res.data());

      if (res?.data()?.messages?.length > 0) {
        setMessages(res.data().messages)
      }
    })
    return () => {
      unsub()
    }
  }, [selectedChat])

  const handleMessageSend = async () => {
    if (input.trim().length === 0 && !tempImage && !tempFile) return;

    try {
      let messageContent: any = {};

      if (tempImage) {
        const fileUrl = await upload(tempImage);
        messageContent = {
          sId: data.uid,
          image: fileUrl,
          fileName: tempImage.name,
          createdAt: new Date()
        };
      } else if (tempFile) {
        const fileUrl = await upload(tempFile);
        messageContent = {
          sId: data.uid,
          file: fileUrl,
          fileName: tempFile.name,
          createdAt: new Date()
        };
      } else {
        messageContent = {
          sId: data.uid,
          text: input,
          createdAt: new Date()
        };
      }

      await updateDoc(doc(db, "messages", selectedChat.messageId), {
        messages: arrayUnion(messageContent)
      })

      const ids = [selectedChat.rId, data.uid]

      ids.forEach(async (id: any) => {
        const userRef = doc(db, "chats", id)
        const userChatSnapshot = await getDoc(userRef)
        if (userChatSnapshot.exists()) {
          const userChatData = userChatSnapshot.data()
          const chatIndex = userChatData.chatData.findIndex((c: any) => {
            return c.messageId === selectedChat.messageId
          })
          userChatData.chatData[chatIndex].lastMessage = tempImage ? `image-${tempImage.name}` : tempFile ? `file-${tempFile.name}` : input.slice(0, 30)
          userChatData.chatData[chatIndex].updatedAt = Date.now()

          if (userChatData.chatData[chatIndex].rId == data.uid) {
            userChatData.chatData[chatIndex].messageSeen = false;
          }

          await updateDoc(userRef, {
            chatData: userChatData.chatData
          })
        }
      })

      setInput("")
      setTempImage(null)
      setTempImagePreview(null)
      setTempFile(null)
      
      toast({
        title: "Success!",
        description: tempImage ? "Image sent successfully" : tempFile ? "File sent successfully" : "Message sent successfully",
      })
    } catch (error) {
      console.log('error in sending message:', error);

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to send message",
      })
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTempImage(file);
    setTempFile(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setTempImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTempFile(file);
    setTempImage(null);
    setTempImagePreview(null);
  }

  const removeTempFile = () => {
    setTempFile(null);
  }

  const removeTempImage = () => {
    setTempImage(null);
    setTempImagePreview(null);
  }

  const handleDownload = async (url: string, fileName: string) => {
      window.open(url)
   
  }
  return (
    <div className="flex-grow flex flex-col">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsSidebarOpen((prev: any) => !prev)}>
            <MenuIcon className="h-6 w-6" />
          </Button>
          {selectedChat ? (
            <UserProfileModal messages={messages} profileData={selectedChat.userData} profileOpen={profileOpen} setProfileOpen={setProfileOpen}>
              <div className='flex gap-2 items-center cursor-pointer' onClick={() => { setProfileOpen(true) }}>
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={selectedChat.userData.avatar} alt={selectedChat.userData.name} />
                  <AvatarFallback>{selectedChat.userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-semibold text-slate-700">{selectedChat.userData.name}</h1>
              </div>
            </UserProfileModal>
          ) : (
            <h1 className="text-xl font-bold">Select a contact</h1>
          )}
        </div>
      </header>

      <ScrollArea className="flex-grow p-4 h-[72vh]">
        <div className="space-y-4">
          {messages.length == 0 && selectedChat != null ?
            <div className='font-semibold text-gray-500 w-full h-full flex items-center justify-center mt-48'>
              send message to start the conversation !
            </div>
            :
            messages.map((message: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex ${message.sId === data.uid ? 'justify-end' : 'justify-start'}`}
                >
                  {
                    message["image"] ? (
                      <div className="relative group">
                        <Image 
                          alt='img' 
                          src={message.image} 
                          width={150} 
                          height={200} 
                          className='my-4 rounded-lg cursor-pointer' 
                         
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                          <Download   onClick={() => handleDownload(message.image, message.fileName || 'image.jpg')} className="text-white cursor-pointer" />
                        </div>
                      </div>
                    ) : message["file"] ? (
                      <div 
                        className="flex items-center p-2 bg-blue-100 rounded-lg cursor-pointer group"
                        onClick={() => handleDownload(message.file, message.fileName)}
                      >
                        <Paperclip className="mr-2 " size={15} />
                        <span>{message.fileName}</span>
                        <Download size={20} className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ) : (
                      <div className={`max-w-[70%] rounded-lg p-3 ${message.sId !== data.uid ? 'bg-primary text-primary-foreground' : 'bg-muted'}`} >
                        {message.text}
                      </div>
                    )
                  }
                </div>
              )
            }
            )
          }
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        {tempImagePreview && (
          <div className="relative w-32 h-32 mb-2">
            <Image src={tempImagePreview} alt="Temp" layout="fill" objectFit="cover" className="rounded-lg" />
            <button
              onClick={removeTempImage}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}
        {tempFile && (
          <div className="flex items-center mb-2 p-2 bg-blue-100 rounded-lg">
            <Paperclip className="mr-2" />
            <span>{tempFile.name}</span>
            <button
              onClick={removeTempFile}
              className="ml-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleMessageSend()
          }}
          className="flex space-x-2 items-center"
        >
          <Input
            type="text"
            placeholder={selectedChat ? "Type a message..." : "Select a contact to start chatting"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow outline-none border-none"
            disabled={!selectedChat}
          />
          <Input onChange={handleImageSelect} id='image-input' type='file' accept='image/png, image/jpeg' hidden className={`hidden`} />
          <Label htmlFor='image-input'>
            <ImageIcon size={30} className={`cursor-pointer ${selectedChat != null ? 'text-black' : 'text-gray-500 cursor-not-allowed'}`} />
          </Label>
          <Input onChange={handleFileSelect} id='file-input' type='file' hidden className={`hidden`} />
          <Label htmlFor='file-input'>
            <Paperclip size={30} className={`cursor-pointer ${selectedChat != null ? 'text-black' : 'text-gray-500 cursor-not-allowed'}`} />
          </Label>
          <Button type="submit" className='h-[30px] w-[30px]' disabled={!selectedChat}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChatArea