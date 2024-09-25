import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const NavbarComp = () => {
    return (
        <div className='flex items-center justify-center py-4 bg-[#09111f]'>
            <Link href='/dashboard' >
                <Button variant="link" className="text-neutral-400  w-2/3 mt-2">Dashboard</Button>
            </Link>
            <Link href='/vaccine' >
                <Button variant="link" className="text-neutral-400  w-2/3 mt-2">Know More</Button>
            </Link>
            <Button className=" bg-green-700" >Logot</Button>
        </div>
    )
}

export default NavbarComp
