'use client'
import React, { useEffect, useState , useRef }  from 'react'
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Video, Lock, ArrowRight, GripHorizontal, MessageCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import AuthCard from '@/components/auth/AuthCard'

export default function HomePage() {


  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev:any) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    { icon: MessageCircle, title: "Real-time Messaging", description: "Send and receive messages instantly" },
    { icon: Users, title: "Group Chats", description: "Collaborate with team members easily" },
    { icon: Lock, title: "End-to-End Encryption", description: "Your conversations are secure" },
    { icon: Zap, title: "Rich Media Sharing", description: "Share photos, videos, and files seamlessly" },
  ]



  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 flex justify-between shadow-lg items-center bg-black/90 py-8 pl-4 pr-10 rounded-md">
          <h1 className="text-3xl font-bold text-indigo-200">Chat And Social Media Management Platform</h1>
          <nav>
            <ul className="flex space-x-4 text-white">
              <li><Link href="#features" className=" hover:text-indigo-600">Features</Link></li>
              <li><Link href="#about" className=" hover:text-indigo-600">About</Link></li>
            </ul>
          </nav>
        </header>

        <main className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-bold mb-6">Connect with friends and family, anytime, anywhere</h2>
            <p className="text-lg text-gray-800 mb-8 italic">Experience seamless communication with our feature-rich chat application. Stay connected with those who matter most, whether you're at home or on the go.</p>
            
            
             <div className="relative h-64 rounded-lg mb-20  ">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    index === activeFeature ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="text-center p-6">
                    <feature.icon className="h-16 w-16 text-black mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-black mb-2">{feature.title}</h3>
                    <p className="text-purple-800">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

           <Link href={'#auth-card'}>
           <Button size="lg" className="mb-12" >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link>

            <div id="features" className="mb-12">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>User-friendly interface for effortless communication</li>
                <li>Cross-platform support for desktop and mobile devices</li>
                <li>Analyze your social media posts with cool analytical charts</li>
                <li>File sharing and media support</li>
                <li>24/7 customer support</li>
              </ul>
            </div>

          
          </div>

         <AuthCard/>
        </main>
       
        <footer id="about" className="mt-12 text-center text-gray-600">
          <p>&copy; 2024 ChatApp. All rights reserved.</p>
          <p>Designed and built with love for seamless communication.</p>
        </footer>
      </div>
    </div>
  )
}







