"use client"
 import React, { useState } from 'react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
  } from "@/components/ui/dropdown-menu"
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Label } from "@/components/ui/label"
import { Button } from '../ui/button'
import {  MoreVertical, LogOut, Settings, User } from "lucide-react"
import { Input } from '../ui/input'
import { logout } from '@/lib/helpers/auth/auth'
import { toast } from '@/hooks/use-toast'


interface UserProfile {
    name: string;
    avatar: string;
  }


  
function Setting() {
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: "Your Name",
        avatar: "/placeholder-user.jpg"
      });

    const handleLogout =async () => {
      
       try {
         await logout()
         
         toast({
          title: "Sucess",
          description: "logged out sucessfully ",
        })
       } catch (error:any) {
        toast({
          variant: "destructive",
          title: "Failed.",
          description: error.message,
        })
       }
      };
    
      const handleProfileUpdate = (name: string, avatar: string) => {
        setUserProfile({ name, avatar });
      };
    


  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={userProfile.name}
                onChange={(e) => handleProfileUpdate(e.target.value, userProfile.avatar)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">
                Avatar URL
              </Label>
              <Input
                id="avatar"
                value={userProfile.avatar}
                onChange={(e) => handleProfileUpdate(userProfile.name, e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Setting