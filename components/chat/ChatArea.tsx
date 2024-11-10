import React, { useEffect, useRef, useState } from 'react'

import { Send, Menu as MenuIcon ,Image as ImageIcon } from "lucide-react"
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

interface ChatAreaProps{
    selectedChat:any
    data:any
    setIsSidebarOpen:any
}

function ChatArea({selectedChat  ,data , setIsSidebarOpen}:ChatAreaProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [profileOpen,setProfileOpen]=useState(false)

        


    useEffect(() => {
    
    
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
      }, [messages]); 


    useEffect(()=>{

        setMessages([])
        if(selectedChat==null) return ;
        
        const msgId=selectedChat.messageId;
          const unsub=onSnapshot((doc(db,"messages",msgId)),(res:any)=>{
            console.log(res.data());
            
            if(res?.data()?.messages?.length>0){
              setMessages(res.data().messages)
           
            }
            
    
    
          })
          return ()=>{
            unsub()
          }
        
      },[selectedChat])
    
  const handleMessageSend=async (input : string)=>{
    if(input.trim().length==0) return ;
    
    try {
        await updateDoc(doc(db,"messages",selectedChat.messageId),{
          messages:arrayUnion({
            sId:data.uid,
            text:input,
            createdAt:new Date()
          })
        })

        const ids=[selectedChat.rId,data.uid]

        ids.forEach(async (id:any)=>{
          const userRef= doc(db,"chats",id)
          const userChatSnapshot=await getDoc(userRef)
          if(userChatSnapshot.exists()){
            const userChatData=userChatSnapshot.data()
            const chatIndex=userChatData.chatData.findIndex((c:any)=>{
              return c.messageId===selectedChat.messageId
            })  
            userChatData.chatData[chatIndex].lastMessage=input.slice(0,30)
            userChatData.chatData[chatIndex].updatedAt=Date.now()

            if(userChatData.chatData[chatIndex].rId==data.uid){
              userChatData.chatData[chatIndex].messageSeen=false;
            }

            await updateDoc(userRef,{
              chatData:userChatData.chatData
            })
          }
        })
        setInput("")
    } catch (error) {
      console.log('error in adding messages:',error);
      
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "failed to update message",
      })
    }

  }



  
  const sendImage=async (e:any)=>{
    try {
      const fileUrl=await upload(e.target.files[0]);
      if(fileUrl && selectedChat){
        await updateDoc(doc(db,"messages",selectedChat.messageId),{
          messages:arrayUnion({
            sId:data.uid,
            image:fileUrl,
            createdAt:new Date()
          })
        })

        

        const ids=[selectedChat.rId,data.uid]

        ids.forEach(async (id:any)=>{
          const userRef= doc(db,"chats",id)
          const userChatSnapshot=await getDoc(userRef)
          if(userChatSnapshot.exists()){
            const userChatData=userChatSnapshot.data()
            const chatIndex=userChatData.chatData.findIndex((c:any)=>{
              return c.messageId===selectedChat.messageId
            })  
            userChatData.chatData[chatIndex].lastMessage="Image"
            userChatData.chatData[chatIndex].updatedAt=Date.now()

            if(userChatData.chatData[chatIndex].rId==data.uid){
              userChatData.chatData[chatIndex].messageSeen=false;
            }

            await updateDoc(userRef,{
              chatData:userChatData.chatData
            })
          }
        })
      }
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "failed to send image",
      })
    }
    
  }


  return (
    
    <div className="flex-grow flex flex-col">
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsSidebarOpen((prev:any)=>!prev)}>
          <MenuIcon className="h-6 w-6" />
        </Button>
        {selectedChat ? (
            <UserProfileModal messages={messages} profileData={selectedChat.userData} profileOpen={profileOpen} setProfileOpen={setProfileOpen}>
          <div className='flex gap-2 items-center cursor-pointer  ' onClick={()=>{setProfileOpen(true)}}>
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={selectedChat.userData.avatar} alt={selectedChat.userData.name} />
              <AvatarFallback>{selectedChat.userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold text-slate-700 ">{selectedChat.userData.name}</h1>
          </div>
          </UserProfileModal>
        ) : (
          <h1 className="text-xl font-bold">Select a contact</h1>
        )}
      </div>
   
    </header>
    
    <ScrollArea  className="flex-grow p-4 h-[72vh]   ">
      <div className="space-y-4">
        {messages.length==0 && selectedChat!=null ?
         <div  className='font-semibold text-gray-500 w-full h-full flex items-center justify-center mt-48'>
          send message to start the conversation !
        </div>
        :


        messages.map((message:any) =>{ 
          
          return (
          
          <div
            key={message.id}
            className={`flex ${message.sId === data.uid ? 'justify-end' : 'justify-start'}`}
          >
            {
              
              message["image"]  ? <Image alt='img' src={message.image}  width={150} height={200} className='my-4 rounded-lg'/> :
            <div className={`max-w-[70%] rounded-lg p-3 ${ message.sId !== data.uid  ? 'bg-primary text-primary-foreground'  : 'bg-muted'  }`} >
              {message.text}
            </div>
            }


          </div>
        )}
      
      )
        }
      <div  />

      </div>
    </ScrollArea>
    
    <div className="p-4 border-t">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSend(input)
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
          <Input onChange={(e)=>{if(selectedChat){sendImage(e)}}} id='image-input' type='file' accept='image/png ,image/jpeg' hidden className={` hidden`}/>
          <Label htmlFor='image-input'>
            <ImageIcon size={37} className={`cursor-pointer  ${selectedChat!=null ? 'text-black':'text-gray-500  cursor-not-allowed'}`}/>
          </Label>
        <Button type="submit" size="icon" disabled={!selectedChat}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
       
      </form>
    </div>
  </div>
  )
}

export default ChatArea