import NavbarComp from '@/components/NavbarComp';
import React from 'react'

const NavLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            <NavbarComp />
            {children}
        </div>
    )
}


export default NavLayout
