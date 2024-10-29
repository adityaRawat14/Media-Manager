'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <Card className="w-[350px] h-full ">
      <CardHeader>
        <CardTitle>Lets Start</CardTitle>
        <CardDescription>
          Login to your account or create a new one
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" placeholder="Enter your password" />
                </div>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" placeholder="Enter your email" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" placeholder="Enter your password" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" type="submit">
          {activeTab === "login" ? "Login" : "Sign Up"}
        </Button>
        <div className="mt-4 flex flex-col gap-2 w-full">
          <Button variant="outline" className="w-full">
            {activeTab === "login" ? "Login with Google" : "Sign up with Google"}
          </Button>
          <Button variant="outline" className="w-full">
            {activeTab === "login" ? "Login with GitHub" : "Sign up with GitHub"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}