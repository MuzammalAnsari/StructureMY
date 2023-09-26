import { message } from 'antd';
import React, { useState } from 'react';
import { BsEnvelopeOpen, BsWhatsapp } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';

export default function Form() {
    const [user, setUser] = useState({
        Name: '', email: '', subject: '', Message: ''
    })

    // let values, names
    // const data = (e) => {
    //     values = e.target.value
    //     names = e.target.value
    //     setUser({ ...user, [names]: values })
    // }

    const data = (e) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    }
    // console.log('user', user)

    const send = async (e) => {
        const { Name, email, subject, Message } = user
        e.preventDefault()
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name, email, subject, Message
            })
        }
        const send = await fetch(
            'https://bookshelftreasures-8dba6-default-rtdb.firebaseio.com/Message.json', option
        )
        if (send) {
            message.success("Message Sent")
        }
        else {
            message.error("Message Not Sent")
        }
    }

    return (
        <>
            <h1 className='text-xl mb-4 md:text-2xl'>Get in Touch</h1>
            <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-3/5 sm:w-full md:mr-2'>
                    <form method='POST'>
                        <textarea
                            placeholder='Enter Message' rows='6' cols='50' className='w-full border p-2 md:p-5' value={user.Message} name='Message' onChange={data}></textarea>

                        <div className='w-full sm:flex sm:flex-col md:flex-row md:space-x-2 mt-3'>
                            <div className='mb-2 md:mb-0 lg:w-2/4'>
                                <input type="text" placeholder='Name' className='border w-full p-3' value={user.Name} name='Name' onChange={data} />
                            </div>
                            <div className='lg:w-2/4'>
                                <input type="text" placeholder='Email' className='border w-full p-3' value={user.email} name='email' onChange={data} />
                            </div>
                        </div>

                        <input type="text" placeholder='Enter Subject' className='border w-full my-3 p-3 ' value={user.subject} name='subject' onChange={data} />
                        <button className='py-3 px-6 border border-red-500 hover:bg-red-500 hover:text-white transition duration-300' onClick={send}>Send</button>
                    </form>
                </div>

                <div className='w-full md:w-2/5 sm:w-full md:ml-2 mt-4 md:mt-0'>
                    <div className='details py-5 lg:ps-[50px]'>
                        <div className='mb-4 md:mb-0'>
                            <div className='text-center flex items-center p-3 p-md-4 text-2xl font-thin'>
                                <h3 className='text-primary mr-3'><BsEnvelopeOpen /></h3>
                                <a href='mailto:muzammalbash@gmail.com' className='hover:text-red-500'>muzammalbash@gmail.com</a>
                            </div>
                        </div>
                        <div className='mb-4 md:mb-0'>
                            <div className='text-center flex p-3 p-md-4 text-2xl font-thin'>
                                <h3 className='text-primary mt-1 mr-3'><BsWhatsapp /></h3>
                                <a
                                    href='https://wa.me/923137344892'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='hover:text-red-500'
                                >
                                    03 137344892
                                </a>
                            </div>
                        </div>
                        <div>
                            <div className='text-center flex  p-3 p-md-4 text-2xl font-thin'>
                                <h3 className='text-primary mt-1 mr-3'><FaHome /></h3>
                                <a
                                    href='https://goo.gl/maps/xhY7Di6W7Uq1adc7A'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='hover:text-red-500'
                                >
                                    Airport Faisalabad
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
