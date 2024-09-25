import React from 'react'

const navLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div>
            {children}
        </div>
    )
}


export default navLayout
