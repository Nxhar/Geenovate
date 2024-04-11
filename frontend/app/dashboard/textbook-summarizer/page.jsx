"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RingLoader, SyncLoader } from 'react-spinners';
import { SendHorizontal } from 'lucide-react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { LampContainer } from '@/components/ui/lamp';
function Page() {
    const [uploaded, setUploaded] = useState(false);
    const [sendToBackend, setSendToBackend] = useState(false);
    const [file, setFile] = useState(null)
    const [loader, setLoader] = useState(false)

    const [MSGLoader, setMSGLoader] = useState(false)

    const [inputMessage, setInputMessage] = useState('');

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([
        {
            'type': 'aiMessage',
            'content': "Hi! Your PDF has been uploaded! You may ask me any question regarding it."
        },
    ])

    const handleSendMessage = async () => {
        console.log('called handleMessageSent')
        if (inputMessage.trim() === '') {

            return;
        }


        // Update state using the callback form
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                'type': 'userMessage',
                'content': inputMessage,
            },
        ]);

        setMSGLoader(true);

        setInputMessage('');

        try {
            const response = await fetch('http://127.0.0.1:5000/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'message': inputMessage }),
            });

            const result = await response.json();

            setMSGLoader(false)
            // Update state using the callback form
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    'type': 'aiMessage',
                    'content': result['response'],
                },
            ]);

            console.log(messages);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFileChange = (e) => {
        const currentFile = e.target.files[0]
        setFile(currentFile)
    }

    const handleSubmit = async () => {
        setSendToBackend(true)
        const formData = new FormData();
        formData.append('file', file);


        setLoader(true);


        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const newRes = await response.json()

            if (response.ok) {
                setUploaded(true);
                console.log(newRes['message'])
            } else {
                // Handle error
                console.error('File upload failed');
            }

            setLoader(false)
        } catch (error) {
            // Handle network error
            console.error('Network error during file upload', error);
        }
    }

    return (
        !sendToBackend ?
            <div className='flex flex-col justify-center items-center h-screen w-auto'>
                <LampContainer >
                <h1 className='text-4xl mt-[-10px]'>Upload a Textbook PDF File</h1>
                
                <div className='container flex justify-center items-center gap-4 pt-10'>
                    <Input id='doc' className='w-96 bg-[#9b51e0] rounded' onChange={handleFileChange} type='file' />
                    <Button variant='destructive' className='px-4 rounded bg-[#9b51e0] text-white' onClick={handleSubmit} >Submit</Button>
                </div>
                </LampContainer>
            </div>
            :
            <div>
                {loader ? (
                    <div className='container flex flex-col gap-4 h-screen w-auto justify-center items-center'>
                        <RingLoader color='#9b51e0'/>
                        <h2>Fetching the Document... Readying the QnA Chatbot...</h2>
                    </div>
                ) : (
                    <div className="flex flex-col container min-h-screen border-2 rounded-md mx-4 w-[90%] ">
                        <h1 className='text-center bg-[#9b51e0] text-3xl py-2 w-full'>Chat With Your PDFs!</h1>
                        <div className=" mt-auto mb-4 container w-full">
                            <div className="mt-auto flex flex-col w-full">
                                {messages.map((message, index) => (
                                    <div key={index} className={`${message.type} Message `}>
                                        <img
                                            src={message.type === 'aiMessage' ? 'data:image/jpeg;base64,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' : 'https://th.bing.com/th/id/OIP.qovmIY1jRM75WWIgtIInXQHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7'}
                                            alt="UI"
                                            className="chat-user-icon"
                                        />
                                        <div className="messageText">{message.content}</div>
                                    </div>
                                ))}

                                {MSGLoader &&
                                    <div>
                                        <div className={`aiMessage Message`}>
                                            <img
                                                src={'data:image/jpeg;base64,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'}
                                                alt="UI"
                                                className="chat-user-icon"
                                            />
                                            <div className="messageText"><SyncLoader size={8} color='#fff'/></div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="flex gap-1 items-center justify-center align-bottom pt-1">
                                <img
                                    className="chat-user-icon rounded-xl"
                                    src="https://th.bing.com/th/id/OIP.qovmIY1jRM75WWIgtIInXQHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7"
                                    alt=""
                                />
                                <input
                                    className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                                    type="text"
                                    placeholder="Enter your message"
                                    value={inputMessage}
                                    onChange={handleInputChange}
                                />
                                <button onClick={handleSendMessage}><SendHorizontal /></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );
}

export default Page;
