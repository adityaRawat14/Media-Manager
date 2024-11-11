"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function FacebookUserData() {
    const [currentUser , setCurrentUser ] = useState<any>(null);
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
const [isClient,setIsClient] = useState(false)
const reqUrlUser=`https://graph.facebook.com/me?fields=id,name&access_token=${process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN_USER}`
const reqUrlPage=`https://graph.facebook.com/me?fields=id,name&access_token=${process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN_PAGE}`
useEffect(()=>{
    setIsClient(true)
},[])

    useEffect(() => {
        if(!isClient) return ;
        const loadFacebookSDK = () => {
            window.fbAsyncInit = function () {
              window.FB.init({
                appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID, 
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v14.0', 
              });
            };
      
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.crossOrigin = 'anonymous';
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
      
            document.body.appendChild(script);
          };
      
          loadFacebookSDK();
    
          console.log(window.FB);
          
    }, [isClient]);


    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Facebook User Data</CardTitle>
                <CardDescription>Enter a Facebook username to fetch their public data</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2">
                    <Input
                        type="text"
                        placeholder="Enter Facebook username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button  disabled={loading || !username}>
                        {loading ? 'Loading...' : 'Fetch Data'}
                    </Button>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {userData && (
                    <div className="mt-4">
                        <h3 className="font-semibold">User  Information:</h3>
                        <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                            {JSON.stringify(userData, null, 2)}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}