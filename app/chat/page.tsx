'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Send, Menu,  } from "lucide-react"
import Setting from '@/components/chat/Setting'

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'contact';
}



const contacts: Contact[] = [
  { id: 1, name: "Alice Johnson", avatar: "/placeholder-user.jpg", status: 'online' },
  { id: 2, name: "Bob Smith", avatar: "/placeholder-user.jpg", status: 'offline' },
  { id: 3, name: "Charlie Brown", avatar: "/placeholder-user.jpg", status: 'online' },
  { id: 4, name: "Diana Prince", avatar: "/placeholder-user.jpg", status: 'offline' },
  { id: 5, name: "Ethan Hunt", avatar: "/placeholder-user.jpg", status: 'online' },
]

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() && selectedContact) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: input.trim(),
        sender: 'user'
      };
      setMessages([...messages, newMessage]);
      setInput('');
      
      // Simulate contact response
      setTimeout(() => {
        const contactResponse: Message = {
          id: messages.length + 2,
          text: `This is a simulated response from ${selectedContact.name}.`,
          sender: 'contact'
        };
        setMessages(prevMessages => [...prevMessages, contactResponse]);
      }, 1000);
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages([]);  // Clear messages when switching contacts
    setIsSidebarOpen(false);  // Close sidebar on mobile after selecting a contact
  };

 
  return (
    <div className="flex  bg-background">
      {/* Sidebar */}
      <aside className={`border-r w-80 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Contacts</h2>
          <Setting/>
        </div>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-accent ${selectedContact?.id === contact.id ? 'bg-accent' : ''}`}
              onClick={() => handleContactSelect(contact)}
            >
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className={`text-sm ${contact.status === 'online' ? 'text-green-500' : 'text-gray-500'}`}>
                  {contact.status}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
            {selectedContact ? (
              <>
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold">{selectedContact.name}</h1>
              </>
            ) : (
              <h1 className="text-xl font-bold">Select a contact</h1>
            )}
          </div>
       
        </header>
        
        <ScrollArea className="flex-grow p-4 h-[72vh] md:h-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex space-x-2"
          >
            <Input
              type="text"
              placeholder={selectedContact ? "Type a message..." : "Select a contact to start chatting"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              disabled={!selectedContact}
            />
            <Button type="submit" size="icon" disabled={!selectedContact}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}