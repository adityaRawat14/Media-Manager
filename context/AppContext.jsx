"use client"

import { OnAuthStateChange } from '@/lib/helpers/auth/auth';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';


const AppContext = createContext();

export const useAppContext=()=>{
    return useContext(AppContext);
}

export function AppContextProvider({children}) {
    const [user,setUser]=useState(null)
    const [chats,setChats]=useState(null)
    let path;

    const router=useRouter()
    const handleAuthStateChange=async (u)=>{
      
      if(u){
        setUser(u)
        if(path=='/') router.push('/social/chat');

      }else{
        if(path=='/social/chat')  router.push('/');
          setUser(null)
         
      }
  
    }


    useEffect(()=>{
    path  =window.location.pathname;
      OnAuthStateChange(handleAuthStateChange) 
      if(!user && path=="/social/chat") {
        router.push('/')
      }
    },[])

  return (
    <AppContext.Provider value={{ user,chats,setUser,setChats }}>
      {children}
    </AppContext.Provider>
  );
}