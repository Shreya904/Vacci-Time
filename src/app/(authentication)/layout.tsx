import Image from 'next/image';
import React from 'react'
import logo from '../app/assets/logo.png'
import login from '../app/assets/login-image.jpg'

const LoginLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
            <main className='flex'>
      <div className='w-1/2'>
        <div className='pt-5 pl-5 flex '>
      <Image
      alt="logo"
      src={logo}
      className='w-10 h-10'
    />
    <span className='pt-1 font-medium flex text-2xl'>
      VacciTime 
    </span>
    </div>
    <div>
    <div>
      <span className='font-medium  text-5xl'> Hi there,...  </span>
    </div>
    <div>
    {children}
    </div>
    </div>
    
    </div>
      
    <div className='w-1/2 h-screen'>
    <Image className='h-full'
      alt="login"
      src={login}
      />
    </div>
    
    </main>
    
            
    )
}


export default LoginLayout
