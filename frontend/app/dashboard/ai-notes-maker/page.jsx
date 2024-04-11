"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';
import { RingLoader } from 'react-spinners';


function page() {

    const [input, setInput] = useState('')
    const [result, setResult] = useState('')
    const [hasGivenLink, setHasGivenLink] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = async () => {

        setHasGivenLink(true)
        if (input.trim() === '') {
            return;
        }

        setLoading(true)

        try {
            const response = await fetch('http://127.0.0.1:5000/videourl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'message': input }),
            });

            const res = await response.json();
            setLoading(false)
            setResult(res['response'])



        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            {hasGivenLink ?
                loading ? <div className='h-screen flex flex-col gap-4 justify-center items-center'>
                    <RingLoader color='#9b51e0'/>
                    <p className="text-3xl">Fetching Content...</p>
                </div> :
                    <div className='container w-auto flex flex-col justify-center items-center space-y-2'>
                        <h2 className='pt-10 text-4xl font-semibold'>Generated Content:</h2>
                        <div className='flex flex-col gap-2 container pt-10 items-center justify-center prose text-white'>
                            <div className="">
                                <ReactMarkdown>{result}</ReactMarkdown>
                            </div>

                        </div>
                        <div className='mb-10'></div>
                    </div>
                :

                <div className='container flex flex-col gap-10 justify-center h-screen w-auto  items-center'>
                    <h2 className='text-3xl font-medium mt-[-30px]'>Video Lecture Analyzer - Get your notes generated within seconds!</h2>

                    {/* <img src="https://th.bing.com/th/id/OIP.qovmIY1jRM75WWIgtIInXQHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7" className='chat-user-icon' alt="" /> */}
                    <div className="flex gap-1">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Enter the url of the lecture' className='flex h-10 w-96 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2' />
                        <Button onClick={handleSubmit} >Submit</Button>
                    </div>

                    <h3>Here is a sample link: https://www.youtube.com/watch?v=wbQwD3QS19I&t=83s</h3>
                </div>
            }
        </div>
    )
}

export default page