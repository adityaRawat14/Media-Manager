'use client'

import { useState, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const instructions = [
  {
    title: 'Welcome to Our App',
    content: 'This guide will help you get started with our application. Follow along to learn the basics!'
  },
  {
    title: 'Dashboard Overview',
    content: 'Your dashboard shows an overview of your activity. You can see your recent projects and tasks here.'
  },
  {
    title: 'Creating a New Project',
    content: 'To create a new project, click the "+" button in the top right corner of the dashboard.'
  },
  {
    title: 'Collaborating with Team',
    content: 'Invite team members to your projects by clicking on the "Invite" button within a project.'
  },
  {
    title: 'Need Help?',
    content: 'If you ever need assistance, click on the "?" icon in the bottom right corner to access our help center.'
  }
]

export default function FirstTimeUserPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Check if it's the user's first time (you might want to use a more persistent storage in a real app)
    const isFirstTime = !localStorage.getItem('hasSeenIntro')
    if (isFirstTime) {
      setIsOpen(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < instructions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    setIsOpen(false)
    localStorage.setItem('hasSeenIntro', 'true')
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="hidden">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>{instructions[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{instructions[currentStep].content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleSkip}>
              Skip
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={currentStep === instructions.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}