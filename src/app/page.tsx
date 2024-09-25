import Image from 'next/image'
import logo from '../app/assets/logo.png'
import LoginForm from '@/components/LoginForm'
import login from '../app/assets/login-image.jpg'
 
export default function Background() {
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
      <LoginForm/>
    </div></div>
      
    <div className='w-1/2 h-screen'>
    <Image className='h-full'
      alt="login"
      src={login}
      />
    </div>
    </main>
    
  )
}