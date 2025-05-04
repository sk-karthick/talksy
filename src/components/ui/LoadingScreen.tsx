import Image from 'next/image'
import React from 'react'

const LoadingScreen = () => {
    return (
        <Image
            src="/images/logo-bg.png"
            alt="Loading"
            layout='fill'
            objectFit='contain'
            className='fixed inset-0 w-full z-10 h-full bg-black'
        />
    )
}

export default LoadingScreen