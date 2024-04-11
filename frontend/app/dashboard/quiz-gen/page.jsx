"use client"

import React, { useState } from 'react';
import { RingLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';

function Page() {
  const [input, setInput] = useState('');
  const [quizQ, setQuizQ] = useState({
    question: '',
    options: [], // Initialize as an empty array
    correct: '',
    explanation: '',
  });

  const [flag, setFlag] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendReq = async (e) => {
    setIsAnswered(false)
    e.preventDefault();
    if (input.trim() === '') {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/quizgen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      setInput('');

      const result = await response.json();

      console.log(result);
      setQuizQ(result);

      setLoading(false);

      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionSelect = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleAnswerSubmit = () => {
    
    setIsAnswered(true);
  };

  return (
    <div className='flex container items-center flex-col pt-8'>
      <h1 className='text-3xl font-medium mb-4 text-center'>
        Prompt a topic, Generate a Quiz Question!
      </h1>
      <div className='flex gap-4'>
        <input
          className='flex h-10 w-[768px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter a topic to generate a quiz question on'
        />
        <button
          onClick={handleSendReq}
          className='bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-4 py-2'
        >
          Generate Question
        </button>
      </div>
      {loading ? (
        <div className='h-auto mt-20 w-auto flex justify-center items-center flex-col'>
          <RingLoader color='white'/>
          <p>Fetching a Question...</p>
        </div>
      ) : (
        flag && (
          <div>
            {quizQ.question && (
              <div className='prose mt-10 mb-5'>
                <ReactMarkdown>{quizQ.question}</ReactMarkdown>
              </div>
            )}
            {quizQ.options && quizQ.options.length > 0 && (
              <form className='mb-5'>
                {quizQ.options.map((option, index) => (
                  <div className='flex gap-2' key={index}>
                    <input
                      type='radio'
                      id={`option${index}`}
                      name='options'
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionSelect(option)}
                      disabled={isAnswered}
                    />
                    <label htmlFor={`option${index}`}>{option}</label>
                  </div>
                ))}
                <button className='bg-primary my-6 text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 px-4 py-2'
                type='button' onClick={handleAnswerSubmit} disabled={isAnswered}>
                  Submit Answer
                </button>
              </form>
            )}
            {isAnswered && quizQ.explanation && (
              <div className='prose mt-5 mb-10'>
                <ReactMarkdown>{quizQ.explanation}</ReactMarkdown>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Page;
