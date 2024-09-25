import Image from 'next/image';
import React from 'react'
import logo from '../assets/logo.png'
import login from '../assets/background.jpg'

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex'>
      <div className='md:w-1/2 w-full flex flex-col justify-between'>
        <div className='flex items-center justify-center w-fit mt-4 ml-4'>
          <Image
            alt="logo"
            src={logo}
            width={500}
            height={500}
            className='w-[32px] '
          />
          <span className=' font-bold text-md '>
            VacciTime
          </span>
        </div>

        <div className='h-fit w-[80%] mx-auto '>
          <h1 className='text-3xl font-semibold mb-2'>Welcome</h1>
          <span className='text-md  w-full text-neutral-400'>Never miss another vaccine for your child.</span>
          <div className='mt-8'>
            {children}
          </div>
        </div>

        <div className='text-sm  w-full text-neutral-500 ml-7 my-4'>
          © Immunoman 2024
        </div>
      </div>

      <div className='md:w-1/2 w-0 h-screen'>
        <Image className='h-full'
          alt="login"
          src={login}
        />
      </div>

    </main>


  )
}


export default LoginLayout
