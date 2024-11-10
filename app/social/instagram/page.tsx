'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Heart, MessageCircle, Calendar, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import HomeBg from '@/public/home-bg.svg'
// Mock data for Instagram posts
const instagramPosts = [
  { id: 1, imageUrl: '/placeholder.svg?height=300&width=300', likes: 120, comments: 15, date: '2023-06-01' },
  { id: 2, imageUrl: '/placeholder.svg?height=300&width=300', likes: 80, comments: 8, date: '2023-06-05' },
  { id: 3, imageUrl: '/placeholder.svg?height=300&width=300', likes: 200, comments: 25, date: '2023-06-10' },
  { id: 4, imageUrl: '/placeholder.svg?height=300&width=300', likes: 150, comments: 20, date: '2023-06-15' },
  { id: 5, imageUrl: '/placeholder.svg?height=300&width=300', likes: 180, comments: 30, date: '2023-06-20' },
  { id: 6, imageUrl: '/placeholder.svg?height=300&width=300', likes: 90, comments: 12, date: '2023-06-25' },
]

export default function InstagramAnalytics() {
  const [globalSortOrder, setGlobalSortOrder] = useState('newest')
  const [cardSortOrders, setCardSortOrders] = useState({})

  const sortPosts = (posts:any, sortOrder:any) => {
    return [...posts].sort((a, b) => {
      if (sortOrder === 'newest' || sortOrder === 'oldest') {
        return sortOrder === 'newest'
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortOrder === 'most_likes' || sortOrder === 'least_likes') {
        return sortOrder === 'most_likes' ? b.likes - a.likes : a.likes - b.likes
      }
      return 0
    })
  }

  const sortedInstagramPosts = sortPosts(instagramPosts, globalSortOrder)

  const handleCardSortChange = (postId:any, sortOrder:any) => {
    setCardSortOrders(prev => ({ ...prev, [postId]: sortOrder }))
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#C13584]">Instagram Analytics Dashboard</h1>
        <Card className="bg-[#262626] border-[#363636]">
          <CardHeader>
            <CardTitle className="text-[#C13584]">Instagram Posts</CardTitle>
            <CardDescription className="text-gray-400">View and analyze your Instagram posts</CardDescription>
            <div className="flex justify-end">
              <Select onValueChange={setGlobalSortOrder} defaultValue={globalSortOrder}>
                <SelectTrigger className="w-[180px] bg-[#363636] border-[#525252] text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-[#363636] border-[#525252] text-white">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="most_likes">Most Likes</SelectItem>
                  <SelectItem value="least_likes">Least Likes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedInstagramPosts.map((post) => (
                <Card key={post.id} className="bg-[#1A1A1A] border-[#363636]">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{post.date}</span>
                      <Select
                        onValueChange={(value) => handleCardSortChange(post.id, value)}
                        //@ts-ignore
                        defaultValue={cardSortOrders[post.id] || 'default'}
                      >
                        <SelectTrigger className="w-[140px] bg-[#363636] border-[#525252] text-white">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#363636] border-[#525252] text-white">
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="most_likes">Most Likes</SelectItem>
                          <SelectItem value="least_likes">Least Likes</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="oldest">Oldest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative cursor-pointer">
                          <Image src={HomeBg} alt={`Post ${post.id}`} width={400} height={300} className="rounded-lg" />
                          <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white">
                            <Heart className="h-5 w-5 text-[#C13584]" />
                            <span>{post.likes}</span>
                            <MessageCircle className="h-5 w-5 text-[#C13584]" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 bg-[#262626] border-[#363636] text-white">
                        <h3 className="font-semibold mb-2 text-[#C13584]">Post Analytics</h3>
                        <ChartContainer
                          config={{
                            likes: {
                              label: "Likes",
                              color: "#C13584",
                            },
                            comments: {
                              label: "Comments",
                              color: "#E1306C",
                            },
                          }}
                          className="h-[200px]"
                        >
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { day: 1, likes: post.likes * 0.5, comments: post.comments * 0.5 },
                              { day: 2, likes: post.likes * 0.7, comments: post.comments * 0.7 },
                              { day: 3, likes: post.likes * 0.9, comments: post.comments * 0.9 },
                              { day: 4, likes: post.likes, comments: post.comments },
                            ]}>
                              <XAxis dataKey="day" stroke="#8899A6" />
                              <YAxis stroke="#8899A6" />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Line type="monotone" dataKey="likes" stroke="#C13584" strokeWidth={2} />
                              <Line type="monotone" dataKey="comments" stroke="#E1306C" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </PopoverContent>
                    </Popover>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}