'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Heart, Repeat, Search, X } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for Twitter analytics
const twitterData = {
  allPosts: [
    { id: 1, type: 'tweet', content: "Just launched our new product! #excited", likes: 50, retweets: 20, date: '2023-06-29', likesOverTime: [
      { date: '2023-06-29', likes: 10 },
      { date: '2023-06-30', likes: 25 },
      { date: '2023-07-01', likes: 40 },
      { date: '2023-07-02', likes: 50 },
    ] },
    { id: 2, type: 'tweet', content: "Thank you for 10K followers! #grateful", likes: 100, retweets: 30, date: '2023-06-28', likesOverTime: [
      { date: '2023-06-28', likes: 20 },
      { date: '2023-06-29', likes: 50 },
      { date: '2023-06-30', likes: 75 },
      { date: '2023-07-01', likes: 100 },
    ] },
    { id: 3, type: 'tweet', content: "Join us for our upcoming webinar on social media strategies!", likes: 75, retweets: 25, date: '2023-06-27', likesOverTime: [
      { date: '2023-06-27', likes: 15 },
      { date: '2023-06-28', likes: 35 },
      { date: '2023-06-29', likes: 55 },
      { date: '2023-06-30', likes: 75 },
    ] },
    { id: 4, type: 'retweet', content: "RT @techguru: The future of AI is here!", likes: 30, retweets: 15, date: '2023-06-26', likesOverTime: [
      { date: '2023-06-26', likes: 5 },
      { date: '2023-06-27', likes: 15 },
      { date: '2023-06-28', likes: 25 },
      { date: '2023-06-29', likes: 30 },
    ] },
    { id: 5, type: 'retweet', content: "RT @newsoutlet: Breaking: New environmental policy announced", likes: 45, retweets: 25, date: '2023-06-25', likesOverTime: [
      { date: '2023-06-25', likes: 10 },
      { date: '2023-06-26', likes: 25 },
      { date: '2023-06-27', likes: 35 },
      { date: '2023-06-28', likes: 45 },
    ] },
    { id: 6, type: 'retweet', content: "RT @influencer: 5 tips for growing your online presence", likes: 60, retweets: 40, date: '2023-06-24', likesOverTime: [
      { date: '2023-06-24', likes: 15 },
      { date: '2023-06-25', likes: 30 },
      { date: '2023-06-26', likes: 45 },
      { date: '2023-06-27', likes: 60 },
    ] },
  ],
  followerGrowth: [
    { date: '2023-06-01', followers: 5000 },
    { date: '2023-06-08', followers: 5500 },
    { date: '2023-06-15', followers: 6200 },
    { date: '2023-06-22', followers: 7000 },
    { date: '2023-06-29', followers: 8000 },
  ],
  tweetStats: [
    { date: '2023-06-01', tweets: 10, retweets: 5 },
    { date: '2023-06-08', tweets: 15, retweets: 8 },
    { date: '2023-06-15', tweets: 12, retweets: 10 },
    { date: '2023-06-22', tweets: 20, retweets: 15 },
    { date: '2023-06-29', tweets: 18, retweets: 12 },
  ],
}

export default function TwitterAnalytics() {
  const [username, setUsername] = useState("")
  const [allPostsSort, setAllPostsSort] = useState("date")
  const [tweetsSort, setTweetsSort] = useState("date")
  const [retweetsSort, setRetweetsSort] = useState("date")
  const [postType, setPostType] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Searching for user: ${username}`)
  }

  const sortPosts = (posts: any, sortBy: any) => {
    return [...posts].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "likes") {
        return b.likes - a.likes
      }
      return 0
    })
  }

  const filteredAndSortedPosts = sortPosts(
    twitterData.allPosts.filter(post => postType === "all" || post.type === postType),
    allPostsSort
  )

  const sortedTweets = sortPosts(twitterData.allPosts.filter(post => post.type === "tweet"), tweetsSort)
  const sortedRetweets = sortPosts(twitterData.allPosts.filter(post => post.type === "retweet"), retweetsSort)

  return (
    <div className="min-h-screen bg-[#15202B] text-white">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            Twitter Analytics Dashboard
          </h1>
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="text"
              placeholder="Enter Twitter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#253341] border-[#38444D] text-white placeholder-gray-500 mr-2"
            />
            <Button type="submit" className="bg-[#1DA1F2] hover:bg-[#1A91DA]">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-[#192734] border-[#38444D] col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#1DA1F2]">All Posts</CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={allPostsSort} onValueChange={setAllPostsSort}>
                  <SelectTrigger className="w-[120px] bg-[#253341] border-[#38444D] text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#253341] border-[#38444D] text-white">
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="likes">Likes</SelectItem>
                  </SelectContent>
                </Select>
                <Tabs value={postType} onValueChange={setPostType}>
                  <TabsList className="bg-[#253341]">
                    <TabsTrigger value="all" className="data-[state=active]:bg-[#1DA1F2]">All</TabsTrigger>
                    <TabsTrigger value="tweet" className="data-[state=active]:bg-[#1DA1F2]">Tweets</TabsTrigger>
                    <TabsTrigger value="retweet" className="data-[state=active]:bg-[#1DA1F2]">Retweets</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAndSortedPosts.map((post) => (
                  <Popover key={post.id}>
                    <PopoverTrigger asChild>
                      <div className="p-4 border border-[#38444D] rounded-lg cursor-pointer hover:bg-[#22303C]">
                        <p>{post.content}</p>
                        <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Heart className="h-4 w-4 mr-1 text-[#E0245E]" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center">
                              <Repeat className="h-4 w-4 mr-1 text-[#17BF63]" />
                              <span>{post.retweets}</span>
                            </div>
                          </div>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 bg-[#192734] border-[#38444D] text-white">
                      <h3 className="font-semibold mb-2 text-[#1DA1F2]">Likes Analytics</h3>
                      <ChartContainer
                        config={{
                          likes: {
                            label: "Likes",
                            color: "#E0245E",
                          },
                        }}
                        className="h-[200px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={post.likesOverTime}>
                            <XAxis dataKey="date" stroke="#8899A6" />
                            <YAxis stroke="#8899A6" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="likes" stroke="#E0245E" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </PopoverContent>
                  </Popover>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#192734] border-[#38444D]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[#1DA1F2]">Recent Tweets</CardTitle>
                <Select value={tweetsSort} onValueChange={setTweetsSort}>
                  <SelectTrigger className="w-[120px] bg-[#253341] border-[#38444D] text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#253341] border-[#38444D] text-white">
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="likes">Likes</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="text-white">
                {sortedTweets.slice(0, 3).map((tweet) => (
                  <div key={tweet.id} className="mb-4 p-4 border border-[#38444D] rounded-lg">
                    <p>{tweet.content}</p>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-[#E0245E]" />
                          <span>{tweet.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <Repeat className="h-4 w-4 mr-1 text-[#17BF63]" />
                          <span>{tweet.retweets}</span>
                        </div>
                      </div>
                      <span>{tweet.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-[#192734] border-[#38444D]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[#1DA1F2]">Recent Retweets</CardTitle>
                <Select value={retweetsSort} onValueChange={setRetweetsSort}>
                  <SelectTrigger className="w-[120px] bg-[#253341] border-[#38444D] text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#253341] border-[#38444D] text-white">
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="likes">Likes</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="text-white">
                {sortedRetweets.slice(0, 3).map((retweet) => (
                  <div key={retweet.id} className="mb-4 p-4 border border-[#38444D] rounded-lg">
                    <p>{retweet.content}</p>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-[#E0245E]" />
                          <span>{retweet.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <Repeat className="h-4 w-4 mr-1 text-[#17BF63]" />
                          <span>{retweet.retweets}</span>
                        </div>
                      </div>
                      <span>{retweet.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-[#192734] border-[#38444D]">
              <CardHeader>
                <CardTitle className="text-[#1DA1F2]">Follower Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    followers: {
                      label: "Followers",
                      color: "#1DA1F2",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={twitterData.followerGrowth}>
                      <XAxis dataKey="date" stroke="#8899A6" />
                      <YAxis stroke="#8899A6" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="followers" stroke="#1DA1F2" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="bg-[#192734] border-[#38444D]">
              <CardHeader>
                <CardTitle className="text-[#1DA1F2]">Tweet & Retweet Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    tweets: {
                      label: "Tweets",
                      color: "#1DA1F2",
                    },
                    retweets: {
                      label: "Retweets",
                      color: "#17BF63",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={twitterData.tweetStats}>
                      <XAxis dataKey="date" stroke="#8899A6" />
                      <YAxis stroke="#8899A6" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="tweets" stroke="#1DA1F2" strokeWidth={2} />
                      <Line type="monotone" dataKey="retweets" stroke="#17BF63" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}