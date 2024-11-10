
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
import {  MoreVertical, LogOut, Settings, User, LayoutGrid, Upload } from "lucide-react"
import { Input } from '../ui/input'
import { logout } from '@/lib/helpers/auth/auth'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppContext } from '@/context/AppContext'
import UpdateProfile from '../chat/UpdateProfile'

interface UserProfile {
    name: string;
    avatar: string;
  }


  
function Menu() {


    const router=useRouter()

      
    const handleLogout =async () => {
      
       try {
         await logout()
         
         toast({
          title: "Sucess",
          description: "logged out sucessfully ",
        })
        router.push('/')
       } catch (error:any) {
        toast({
          variant: "destructive",
          title: "Failed.",
          description: error.message,
        })
       }
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

    <UpdateProfile />
      <DropdownMenuItem onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleLogout}>
        <LayoutGrid className="mr-2 h-4 w-4" />
        <span>Overview </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default Menu