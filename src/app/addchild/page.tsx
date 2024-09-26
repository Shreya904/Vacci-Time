import ChildForm from '@/components/ChildForm'
import React from 'react'

const AddChild = () => {
    return (
        <div className='flex flex-col'>
            <h1 className="text-center w-full text-xl my-7 font-semibold">Enter your child details</h1>
            <div className='mb-11'>
                <ChildForm />
            </div>
        </div>
    )
}

export default AddChild
