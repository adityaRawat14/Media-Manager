"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageCircle, ChevronDown } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import FbProfile from '@/public/FbProfile.jpg'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
  
const userData = {
    "id": "Adi Rawat",
    "name": "Aditya Rawat",
    "friends": {
      "data": [
        {"id": "friend_0", "name": "Anand Bisht"},
        {"id": "friend_1", "name": "Deepa Joshi"},
        {"id": "friend_2", "name": "Govind Rawat"},
        {"id": "friend_3", "name": "Hemant Negi"},
        {"id": "friend_4", "name": "Kavita Rana"},
        {"id": "friend_5", "name": "Mohan Upreti"},
        {"id": "friend_6", "name": "Nandini Pant"},
        {"id": "friend_7", "name": "Pankaj Bhatt"},
        {"id": "friend_8", "name": "Rekha Gusain"},
        {"id": "friend_9", "name": "Sanjay Dimri"},
        {"id": "friend_10", "name": "Uma Bhatt"},
        {"id": "friend_11", "name": "Vijay Negi"},
        {"id": "friend_12", "name": "Yogesh Joshi"},
        {"id": "friend_13", "name": "Arun Nautiyal"},
        {"id": "friend_14", "name": "Bhawna Rawat"},
        {"id": "friend_15", "name": "Chandan Bisht"},
        {"id": "friend_16", "name": "Divya Panwar"},
        {"id": "friend_17", "name": "Ekta Negi"},
        {"id": "friend_18", "name": "Gaurav Semwal"},
        {"id": "friend_19", "name": "Himani Joshi"},
        {"id": "friend_20", "name": "Ishaan Rawat"},
        {"id": "friend_21", "name": "Jyoti Negi"},
        {"id": "friend_22", "name": "Karan Bisht"},
        {"id": "friend_23", "name": "Leela Rana"},
        {"id": "friend_16", "name": "Divya Panwar"},
        {"id": "friend_17", "name": "Ekta Negi"},
        {"id": "friend_18", "name": "Gaurav Semwal"},
        {"id": "friend_19", "name": "Himani Joshi"},
        {"id": "friend_20", "name": "Ishaan Rawat"},
        {"id": "friend_21", "name": "Jyoti Negi"},
        {"id": "friend_22", "name": "Karan Bisht"},
        {"id": "friend_23", "name": "Leela Rana"},
        {"id": "friend_24", "name": "Manish Upreti"},
        {"id": "friend_3", "name": "Hemant Negi"},
        {"id": "friend_4", "name": "Kavita Rana"},
        {"id": "friend_5", "name": "Mohan Upreti"},
        {"id": "friend_6", "name": "Nandini Pant"},
        {"id": "friend_7", "name": "Pankaj Bhatt"},
        {"id": "friend_8", "name": "Rekha Gusain"},
        {"id": "friend_9", "name": "Sanjay Dimri"},
        {"id": "friend_10", "name": "Uma Bhatt"},
        {"id": "friend_11", "name": "Vijay Negi"},
        {"id": "friend_12", "name": "Yogesh Joshi"},
        {"id": "friend_13", "name": "Arun Nautiyal"},
        {"id": "friend_14", "name": "Bhawna Rawat"},
        {"id": "friend_15", "name": "Chandan Bisht"},
        {"id": "friend_16", "name": "Divya Panwar"},
        {"id": "friend_17", "name": "Ekta Negi"},
        {"id": "friend_18", "name": "Gaurav Semwal"},
        {"id": "friend_19", "name": "Himani Joshi"},
        {"id": "friend_20", "name": "Ishaan Rawat"},
        {"id": "friend_21", "name": "Jyoti Negi"},
        {"id": "friend_22", "name": "Karan Bisht"},
        {"id": "friend_23", "name": "Leela Rana"},
        {"id": "friend_16", "name": "Divya Panwar"},
        {"id": "friend_17", "name": "Ekta Negi"},
        {"id": "friend_18", "name": "Gaurav Semwal"},
        {"id": "friend_19", "name": "Himani Joshi"},
        {"id": "friend_20", "name": "Ishaan Rawat"},
        {"id": "friend_21", "name": "Jyoti Negi"},
        {"id": "friend_22", "name": "Karan Bisht"},
        {"id": "friend_23", "name": "Leela Rana"},
        {"id": "friend_24", "name": "Manish Upreti"}
      ],
      "summary": {
        "total_count": 487
      }
    },
    "posts": {
  "data": [
    {
      "id": "post_1",
      "message": " Nainital Lake! The reflections were surreal. ",
      "created_time": "2023-06-02T14:23:12Z",
      "likes": {
        "data": [
          {"id": "like_post_1_0", "name": "Hemant Negi", "created_time": "2023-06-04T14:45:30Z"},
          {"id": "like_post_1_1", "name": "Kavita Rana", "created_time": "2023-07-02T15:12:45Z"},
          {"id": "like_post_1_2", "name": "Pankaj Bhatt", "created_time": "2023-06-02T15:30:22Z"},
          {"id": "like_post_1_3", "name": "Rekha Gusain", "created_time": "2023-06-02T16:05:10Z"},
          {"id": "like_post_1_4", "name": "Vijay Negi", "created_time": "2023-06-04T17:20:05Z"},
          {"id": "like_post_1_5", "name": "Uma Bhatt", "created_time": "2023-08-02T18:45:30Z"},
          {"id": "like_post_1_6", "name": "Govind Rawat", "created_time": "2023-06-02T19:30:15Z"},
          {"id": "like_post_1_7", "name": "Deepa Joshi", "created_time": "2023-06-04T20:10:40Z"},
          {"id": "like_post_1_8", "name": "Arun Nautiyal", "created_time": "2023-06-02T21:05:55Z"},
          {"id": "like_post_1_9", "name": "Bhawna Rawat", "created_time": "2023-06-02T22:15:20Z"},
          {"id": "like_post_1_10", "name": "Chandan Bisht", "created_time": "2023-06-04T07:30:10Z"},
          {"id": "like_post_1_11", "name": "Divya Panwar", "created_time": "2023-06-03T08:45:30Z"},
          {"id": "like_post_1_12", "name": "Ekta Negi", "created_time": "2023-06-03T09:20:15Z"},
          {"id": "like_post_1_13", "name": "Gaurav Semwal", "created_time": "2023-06-03T10:10:05Z"},
          {"id": "like_post_1_14", "name": "Himani Joshi", "created_time": "2023-06-03T11:30:40Z"},
          {"id": "like_post_1_15", "name": "Ishaan Rawat", "created_time": "2023-06-03T12:45:25Z"},
          {"id": "like_post_1_16", "name": "Jyoti Negi", "created_time": "2023-06-03T14:20:10Z"},
          {"id": "like_post_1_17", "name": "Karan Bisht", "created_time": "2023-06-03T15:35:50Z"},
          {"id": "like_post_1_18", "name": "Leela Rana", "created_time": "2023-06-03T16:50:30Z"},
          {"id": "like_post_1_19", "name": "Manish Upreti", "created_time": "2023-06-03T18:15:15Z"},
          {"id": "like_post_1_20", "name": "Nandini Pant", "created_time": "2023-06-03T19:40:05Z"},
          {"id": "like_post_1_21", "name": "Yogesh Joshi", "created_time": "2023-06-03T21:25:45Z"},
          {"id": "like_post_1_22", "name": "Sanjay Dimri", "created_time": "2023-07-03T22:50:20Z"}
        ]
      },
      "comments": {
        "data": [
          {"id": "comment_post_1_0", "from": {"name": "Deepa Joshi", "id": "friend_1"}, "message": "Wow, the photos look stunning! Can't wait to see more.", "created_time": "2023-06-02T16:00:00Z"},
          {"id": "comment_post_1_1", "from": {"name": "Mohan Upreti", "id": "friend_5"}, "message": "Nainital is always magical. Great capture!", "created_time": "2023-06-03T10:30:15Z"}
        ]
      }
    },
    {
      "id": "post_2",
      "message": "Got to  the Pindari Glacier trek! ",
      "created_time": "2023-06-03T09:45:30Z",
      "likes": {
        "data": [
          {"id": "like_post_2_0", "name": "Vijay Negi", "created_time": "2023-06-03T10:00:00Z"},
          {"id": "like_post_2_1", "name": "Bhawna Rawat", "created_time": "2023-06-03T10:15:45Z"},
          {"id": "like_post_2_2", "name": "Ishaan Rawat", "created_time": "2023-06-03T10:30:22Z"},
          {"id": "like_post_2_3", "name": "Kavita Rana", "created_time": "2023-06-03T10:45:10Z"},
          {"id": "like_post_2_4", "name": "Hemant Negi", "created_time": "2023-06-03T11:00:05Z"},
          {"id": "like_post_2_5", "name": "Pankaj Bhatt", "created_time": "2023-06-03T11:20:30Z"},
          {"id": "like_post_2_6", "name": "Rekha Gusain", "created_time": "2023-06-03T11:45:15Z"},
          {"id": "like_post_2_7", "name": "Uma Bhatt", "created_time": "2023-06-03T12:10:40Z"},
          {"id": "like_post_2_8", "name": "Govind Rawat", "created_time": "2023-06-03T12:35:55Z"},
          {"id": "like_post_2_9", "name": "Deepa Joshi", "created_time": "2023-06-03T13:15:20Z"},
          {"id": "like_post_2_10", "name": "Arun Nautiyal", "created_time": "2023-06-03T14:30:10Z"},
          {"id": "like_post_2_11", "name": "Chandan Bisht", "created_time": "2023-06-03T15:45:30Z"},
          {"id": "like_post_2_12", "name": "Divya Panwar", "created_time": "2023-06-03T17:20:15Z"},
          {"id": "like_post_2_13", "name": "Ekta Negi", "created_time": "2023-06-03T18:10:05Z"},
          {"id": "like_post_2_14", "name": "Gaurav Semwal", "created_time": "2023-06-03T19:30:40Z"},
          {"id": "like_post_2_15", "name": "Himani Joshi", "created_time": "2023-06-03T20:45:25Z"},
          {"id": "like_post_2_16", "name": "Jyoti Negi", "created_time": "2023-06-03T22:20:10Z"},
          {"id": "like_post_2_17", "name": "Karan Bisht", "created_time": "2023-06-04T07:35:50Z"},
          {"id": "like_post_2_18", "name": "Leela Rana", "created_time": "2023-06-04T08:50:30Z"},
          {"id": "like_post_2_19", "name": "Manish Upreti", "created_time": "2023-06-04T10:15:15Z"},
          {"id": "like_post_2_20", "name": "Nandini Pant", "created_time": "2023-06-04T11:40:05Z"},
          {"id": "like_post_2_21", "name": "Yogesh Joshi", "created_time": "2023-06-04T13:25:45Z"},
          {"id": "like_post_2_22", "name": "Sanjay Dimri", "created_time": "2023-06-04T14:50:20Z"},
          {"id": "like_post_2_23", "name": "Anand Bisht", "created_time": "2023-06-04T16:15:35Z"},
          {"id": "like_post_2_24", "name": "Mohan Upreti", "created_time": "2023-06-04T17:40:50Z"}
        ]
      },
      "comments": {
        "data": [
          {"id": "comment_post_2_0", "from": {"name": "Anand Bisht", "id": "friend_0"}, "message": "What an achievement! The views must have been incredible.", "created_time": "2023-06-03T11:00:00Z"}
        ]
      }
    },
    {
      "id": "post_3",
      "message": "Captured . The colors, the music, the dance - pure magic! ",
      "created_time": "2023-06-03T18:30:00Z",
      "likes": {
        "data": [
          {"id": "like_post_3_0", "name": "Govind Rawat", "created_time": "2023-06-03T18:45:15Z"},
          {"id": "like_post_3_1", "name": "Nandini Pant", "created_time": "2023-06-03T19:00:30Z"},
          {"id": "like_post_3_2", "name": "Sanjay Dimri", "created_time": "2023-06-03T19:20:00Z"},
          {"id": "like_post_3_3", "name": "Deepa Joshi", "created_time": "2023-06-03T19:35:10Z"},
          {"id": "like_post_3_4", "name": "Hemant Negi", "created_time": "2023-06-03T20:00:05Z"},
          {"id": "like_post_3_5", "name": "Kavita Rana", "created_time": "2023-06-03T20:20:30Z"},
          {"id": "like_post_3_6", "name": "Pankaj Bhatt", "created_time": "2023-06-03T20:45:15Z"},
          {"id": "like_post_3_7", "name": "Rekha Gusain", "created_time": "2023-06-03T21:10:40Z"},
          {"id": "like_post_3_8", "name": "Vijay Negi", "created_time": "2023-06-03T21:35:55Z"},
          {"id": "like_post_3_9", "name": "Uma Bhatt", "created_time": "2023-06-03T22:15:20Z"},
          {"id": "like_post_3_10", "name": "Arun Nautiyal", "created_time": "2023-06-03T23:30:10Z"},
          {"id": "like_post_3_11", "name": "Bhawna Rawat", "created_time": "2023-06-04T07:45:30Z"},
          {"id": "like_post_3_12", "name": "Chandan Bisht", "created_time": "2023-06-04T08:20:15Z"},
          {"id": "like_post_3_13", "name": "Divya Panwar", "created_time": "2023-06-04T09:10:05Z"},
          {"id": "like_post_3_14", "name": "Ekta Negi", "created_time": "2023-06-04T10:30:40Z"},
          {"id": "like_post_3_15", "name": "Gaurav Semwal", "created_time": "2023-06-04T11:45:25Z"},
          {"id": "like_post_3_16", "name": "Himani Joshi", "created_time": "2023-06-04T13:20:10Z"},
          {"id": "like_post_3_17", "name": "Ishaan Rawat", "created_time": "2023-06-04T14:35:50Z"},
          {"id": "like_post_3_18", "name": "Jyoti Negi", "created_time": "2023-06-04T15:50:30Z"},
          {"id": "like_post_3_19", "name": "Karan Bisht", "created_time": "2023-06-04T17:15:15Z"},
          {"id": "like_post_3_20", "name": "Leela Rana", "created_time": "2023-06-04T18:40:05Z"},
          {"id": "like_post_3_21", "name": "Manish Upreti", "created_time": "2023-06-04T20:25:45Z"},
          {"id": "like_post_3_22", "name": "Yogesh Joshi", "created_time": "2023-06-04T21:50:20Z"},
          {"id": "like_post_3_23", "name": "Anand Bisht", "created_time": "2023-06-04T23:15:35Z"},
          {"id": "like_post_3_24", "name": "Mohan Upreti", "created_time": "2023-06-05T07:40:50Z"},
          {"id": "like_post_3_25", "name": "Nandini Pant", "created_time": "2023-06-05T09:05:15Z"},
          {"id": "like_post_3_26", "name": "Sanjay Dimri", "created_time": "2023-06-05T10:30:40Z"}
        ]
      },
      "comments": {
        "data": [
          {"id": "comment_post_3_0", "from": {"name": "Uma Bhatt", "id": "friend_10"}, "message": "Your photos truly capture the spirit of our beautiful culture!", "created_time": "2023-06-03T20:15:00Z"},
          {"id": "comment_post_3_1", "from": {"name": "Yogesh Joshi", "id": "friend_12"}, "message": "Wish I could have been there. Thanks for sharing these moments!", "created_time": "2023-06-04T09:30:45Z"}
        ]
      }
    },
    {
      "id": "post_4",
      "message": "Early morning photoshoot at Corbett National Park",
      "created_time": "2023-06-04T11:15:00Z",
      "likes": {
        "data": [
          {"id": "like_post_4_0", "name": "Chandan Bisht", "created_time": "2023-06-04T11:30:30Z"},
          {"id": "like_post_4_1", "name": "Ekta Negi", "created_time": "2023-06-04T11:45:15Z"},
          {"id": "like_post_4_2", "name": "Karan Bisht", "created_time": "2023-06-04T12:00:00Z"},
          {"id": "like_post_4_3", "name": "Deepa Joshi", "created_time": "2023-06-04T12:15:10Z"},
          {"id": "like_post_4_4", "name": "Govind Rawat", "created_time": "2023-06-04T12:30:05Z"},
          {"id": "like_post_4_5", "name": "Hemant Negi", "created_time": "2023-06-04T12:45:30Z"},
          {"id": "like_post_4_6", "name": "Kavita Rana", "created_time": "2023-06-04T13:00:15Z"},
          {"id": "like_post_4_7", "name": "Pankaj Bhatt", "created_time": "2023-06-04T13:15:40Z"},
          {"id": "like_post_4_8", "name": "Rekha Gusain", "created_time": "2023-06-04T13:30:55Z"},
          {"id": "like_post_4_9", "name": "Vijay Negi", "created_time": "2023-06-04T13:45:20Z"},
          {"id": "like_post_4_10", "name": "Uma Bhatt", "created_time": "2023-06-04T14:00:10Z"},
          {"id": "like_post_4_11", "name": "Arun Nautiyal", "created_time": "2023-06-04T14:15:30Z"},
          {"id": "like_post_4_12", "name": "Bhawna Rawat", "created_time": "2023-06-04T14:30:15Z"},
          {"id": "like_post_4_13", "name": "Divya Panwar", "created_time": "2023-06-04T14:45:05Z"},
          {"id": "like_post_4_14", "name": "Gaurav Semwal", "created_time": "2023-06-04T15:00:40Z"},
          {"id": "like_post_4_15", "name": "Himani Joshi", "created_time": "2023-06-04T15:15:25Z"},
          {"id": "like_post_4_16", "name": "Ishaan Rawat", "created_time": "2023-06-04T15:30:10Z"},
          {"id": "like_post_4_17", "name": "Jyoti Negi", "created_time": "2023-06-04T15:45:50Z"},
          {"id": "like_post_4_18", "name": "Leela Rana", "created_time": "2023-06-04T16:00:30Z"},
          {"id": "like_post_4_19", "name": "Manish Upreti", "created_time": "2023-06-04T16:15:15Z"},
          {"id": "like_post_4_20", "name": "Nandini Pant", "created_time": "2023-06-04T16:30:05Z"},
          {"id": "like_post_4_21", "name": "Yogesh Joshi", "created_time": "2023-06-04T16:45:45Z"},
          {"id": "like_post_4_22", "name": "Sanjay Dimri", "created_time": "2023-06-04T17:00:20Z"},
          {"id": "like_post_4_23", "name": "Anand Bisht", "created_time": "2023-06-04T17:15:35Z"},
          {"id": "like_post_4_24", "name": "Mohan Upreti", "created_time": "2023-06-04T17:30:50Z"},
          {"id": "like_post_4_25", "name": "Chandan Bisht", "created_time": "2023-06-04T17:45:15Z"},
          {"id": "like_post_4_26", "name": "Ekta Negi", "created_time": "2023-06-04T18:00:40Z"},
          {"id": "like_post_4_27", "name": "Karan Bisht", "created_time": "2023-06-04T18:15:05Z"},
          {"id": "like_post_4_28", "name": "Deepa Joshi", "created_time": "2023-06-04T18:30:30Z"}
        ]
      },
      "comments": {
        "data": [
          {"id": "comment_post_4_0", "from": {"name": "Arun Nautiyal", "id": "friend_13"}, "message": "Incredible shot! You're so lucky to have seen a tiger.", "created_time": "2023-06-04T13:45:00Z"}
        ]
      }
    },
    {
      "id": "post_5",
      "message": "Sunset photoshoot at Mussoorie's Gun Hill. ",
      "created_time": "2023-06-04T20:00:00Z",
      "likes": {
        "data": [
          {"id": "like_post_5_0", "name": "Divya Panwar", "created_time": "2023-06-04T20:15:45Z"},
          {"id": "like_post_5_1", "name": "Gaurav Semwal", "created_time": "2023-06-04T20:30:00Z"},
          {"id": "like_post_5_2", "name": "Leela Rana", "created_time": "2023-06-04T20:45:30Z"},
          {"id": "like_post_5_3", "name": "Hemant Negi", "created_time": "2023-06-04T21:00:10Z"},
          {"id": "like_post_5_4", "name": "Kavita Rana", "created_time": "2023-06-04T21:15:05Z"},
          {"id": "like_post_5_5", "name": "Pankaj Bhatt", "created_time": "2023-06-04T21:30:30Z"},
          {"id": "like_post_5_6", "name": "Rekha Gusain", "created_time": "2023-06-04T21:45:15Z"},
          {"id": "like_post_5_7", "name": "Vijay Negi", "created_time": "2023-06-04T22:00:40Z"},
          {"id": "like_post_5_8", "name": "Uma Bhatt", "created_time": "2023-06-04T22:15:55Z"},
          {"id": "like_post_5_9", "name": "Govind Rawat", "created_time": "2023-06-04T22:30:20Z"},
          {"id": "like_post_5_10", "name": "Deepa Joshi", "created_time": "2023-06-04T22:45:10Z"},
          {"id": "like_post_5_11", "name": "Arun Nautiyal", "created_time": "2023-06-04T23:00:30Z"},
          {"id": "like_post_5_12", "name": "Bhawna Rawat", "created_time": "2023-06-04T23:15:15Z"},
          {"id": "like_post_5_13", "name": "Chandan Bisht", "created_time": "2023-06-04T23:30:05Z"},
          {"id": "like_post_5_14", "name": "Ekta Negi", "created_time": "2023-06-04T23:45:40Z"},
          {"id": "like_post_5_15", "name": "Himani Joshi", "created_time": "2023-06-05T00:00:25Z"},
          {"id": "like_post_5_16", "name": "Ishaan Rawat", "created_time": "2023-06-05T00:15:10Z"},
          {"id": "like_post_5_17", "name": "Jyoti Negi", "created_time": "2023-06-05T00:30:50Z"},
          {"id": "like_post_5_18", "name": "Karan Bisht", "created_time": "2023-06-05T00:45:30Z"},
          {"id": "like_post_5_19", "name": "Manish Upreti", "created_time": "2023-06-05T01:00:15Z"},
          {"id": "like_post_5_20", "name": "Nandini Pant", "created_time": "2023-06-05T01:15:05Z"},
          {"id": "like_post_5_21", "name": "Yogesh Joshi", "created_time": "2023-06-05T01:30:45Z"},
          {"id": "like_post_5_22", "name": "Sanjay Dimri", "created_time": "2023-06-05T01:45:20Z"},
          {"id": "like_post_5_23", "name": "Anand Bisht", "created_time": "2023-06-05T02:00:35Z"},
          {"id": "like_post_5_24", "name": "Mohan Upreti", "created_time": "2023-06-05T02:15:50Z"}
        ]
      },
      "comments": {
        "data": [
          {"id": "comment_post_5_0", "from": {"name": "Himani Joshi", "id": "friend_19"}, "message": "The colors in this photo are absolutely stunning!", "created_time": "2023-06-04T22:30:00Z"},
          {"id": "comment_post_5_1", "from": {"name": "Jyoti Negi", "id": "friend_21"}, "message": "Mussoorie sunsets are the best. Great capture!", "created_time": "2023-06-05T11:15:30Z"}
        ]
      }
    },]
}
  }
export default function FacebookUserData() {
    const [currentUser , setCurrentUser ] = useState<any>(null);
    const [username, setUsername] = useState('');
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
    
        //   console.log(window.FB);
          
    }, [isClient]);








        const friends=userData.friends;

    const [globalSortOrder, setGlobalSortOrder] = useState('newest')

    const sortPosts = (posts:any, sortOrder:any) => {
      return [...posts].sort((a, b) => {
        if (sortOrder === 'newest' || sortOrder === 'oldest') {
          return sortOrder === 'newest'
            ? new Date(b.created_time).getTime() - new Date(a.created_time).getTime()
            : new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
        } else if (sortOrder === 'most_engagement' || sortOrder === 'least_engagement') {
          const engagementA = a.likes.data.length + a.comments.data.length
          const engagementB = b.likes.data.length + b.comments.data.length
          return sortOrder === 'most_engagement' ? engagementB - engagementA : engagementA - engagementB
        }
        return 0
      })
    }
  
    const sortedPosts = sortPosts(userData.posts.data, globalSortOrder)

    if(!isClient) return null
    return (
        <div className="min-h-screen bg-[#F0F2F5] text-[#1C1E21]">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-[#1877F2]">Facebook Analytics Dashboard</h1>
          <Card className="bg-white border-gray-200 mb-6">
            <CardHeader>
              <CardTitle className="text-[#1877F2]">User Profile</CardTitle>
              <CardDescription className="text-gray-600">Basic user information and friend count</CardDescription>
            </CardHeader>
            <CardContent className='flex  justify-between'>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={FbProfile.src}  alt={userData.name} />
                  <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                  <p className="text-gray-600">User ID: {userData.id}</p>
                  <p className="text-gray-600">Total Friends: {userData.friends.summary.total_count}</p>
                </div>
              </div>
              <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          Friends
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
        {friends.data.map((friend:any) => (
          <DropdownMenuItem key={friend.id}>
            <span className="font-medium">{friend.name}</span>
           
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#1877F2]">Facebook Posts</CardTitle>
              <CardDescription className="text-gray-600">View and analyze your Facebook posts</CardDescription>
              <div className="flex justify-end">
                <Select onValueChange={setGlobalSortOrder} defaultValue={globalSortOrder}>
                  <SelectTrigger className="w-[180px] bg-white border-gray-300 text-[#1C1E21]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300 text-[#1C1E21]">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="most_engagement">Most Engagement</SelectItem>
                    <SelectItem value="least_engagement">Least Engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedPosts.map((post,index) => (
                  <Card key={post.id} className="bg-white border-gray-200">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">{new Date(post.created_time).toLocaleString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <p className="text-sm mb-2">{post.message}</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="cursor-pointer flex items-center space-x-2 text-[#1877F2]">
                            <ThumbsUp className="h-5 w-5" />
                            <span>{post.likes.data.length}</span>
                            <MessageCircle className="h-5 w-5 ml-2" />
                            <span>{post.comments.data.length}</span>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 bg-white border-gray-200 text-[#1C1E21]">
                          <h3 className="font-semibold mb-2 text-[#1877F2]">Post Analytics</h3>
                          <ChartContainer
                            config={{
                              likes: {
                                label: "Likes",
                                color: "#1877F2",
                              },
                              comments: {
                                label: "Comments",
                                color: "#42B72A",
                              },
                            }}
                            className="h-[200px]"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={[
                                { day: 1, likes: post.likes.data.length * 0.5 +index, comments: post.comments.data.length * 0.5 },
                                { day: 2, likes: post.likes.data.length * 0.2 -index/2, comments: post.comments.data.length * 0.7 },
                                { day: 3, likes: post.likes.data.length * 0.9+index, comments: post.comments.data.length * 0.9 },
                                { day: 4, likes: post.likes.data.length-index, comments: post.comments.data.length },
                                { day: 5, likes: post.likes.data.length-1, comments: post.comments.data.length },
                              ]}>
                                <XAxis dataKey="day" stroke="#8899A6" />
                                <YAxis stroke="#8899A6" />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Line type="monotone" dataKey="likes" stroke="#1877F2" strokeWidth={2} />
                                <Line type="monotone" dataKey="comments" stroke="#42B72A" strokeWidth={2} />
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
    );
}