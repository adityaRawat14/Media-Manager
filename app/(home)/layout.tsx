import React from 'react'

import HomeBg from '@/public/home-bg.svg'

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='px-10 py-5 min-h-screen relative'>
    <div
      className='absolute inset-0'
      style={{
        backgroundImage: `url(${HomeBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.1, 
        zIndex: 0,
      }}
    />
    <div className='relative z-10'> 
      {children}
    </div>
  </div>
  )
}

export default layout