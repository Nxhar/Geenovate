"use client"

import React, { useState } from 'react'
import { RingLoader } from 'react-spinners'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import DynamicMarkdownRenderer from '@/components/DynamicMarkdownRenderer'
import { LampContainer } from '@/components/ui/lamp'

function page() {

  const [image, setImage] = useState(null)
  const [hasClicked, setHasClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [retrievedMsg, setRetrievedMsg] = useState('')

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    setHasClicked(true)
    setLoading(true)
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await fetch('http://127.0.0.1:5000/qna', {
        method: 'POST',
        body: formData,
      });

      const res = await response.json()
      setLoading(false)
      setRetrievedMsg(res.message)
      console.log(retrievedMsg)

    } catch (err) {
      console.log(err)
    }
  }


  return (

    <div className=''>
      {
        !hasClicked ?
        <div className="">
        <LampContainer className='pt-80'>
          <div className="flex container flex-col gap-4 justify-center items-center h-screen">
            <h1 className='text-4xl font-medium mb-4'>Analyze your Question Papers!</h1>
            <div className="flex gap-4">
              <Input type="file" onChange={handleFileChange} className='flex h-10 w-full rounded-md border border-input bg-[#9b51e0] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2' />
              <Button variant='destructive' onClick={handleSubmit} className=' px-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>Submit</Button>
            </div>
          </div>
          </LampContainer>
          </div> :
          <div className="">
            {loading ?
              <div className=" flex h-screen justify-center items-center flex-col">
                <RingLoader />
                <div className="text-3xl">Analyzing your paper...</div>
              </div>
              :
              <div className='flex flex-col gap-2 container pt-10 items-center justify-center prose'>
                <div className="">
                <ReactMarkdown>{retrievedMsg}</ReactMarkdown>
                </div>

              </div>

            }

          </div>
      }

    </div>
  )
}

export default page