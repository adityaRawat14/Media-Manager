import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN
  const appId = process.env.FACEBOOK_APP_ID

  if (!accessToken || !appId) {
    return NextResponse.json({ error: 'Facebook credentials are not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${username}?fields=id,name,picture&access_token=${accessToken}`
    )
    console.log(response);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data from Facebook')
    }

    const userData = await response.json()
    return NextResponse.json(userData)
  } catch (error) {
    console.error('Error fetching Facebook user data:', error)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}