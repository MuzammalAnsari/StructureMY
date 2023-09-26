import React from 'react'
import hero from "Assets/Pics/h2_hero2.jpg"
import Map from './Map'
import Form from './Form'
import Information from '../Home/Information'

export default function Hero() {
    return (
        <main>
            <div className=' w-auto mb-6'>
                <div className='mx-[70px]'>
                    <div className='text-center '>
                        <img src={hero} alt="hero" className='w-[100%] ' />
                    </div>

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
                        <h1 className='text-5xl'>About</h1>
                    </div>

                    <div className='my-8'>
                        <Map />
                    </div>

                    <div className='mt-5'>
                        <Form />
                    </div>
                </div>
            </div>
            <Information />
        </main>
    )
}
