"use client"

import { useState, useEffect } from "react";
import { auth, provider } from "@/_firebaseConfig/firebaseConfig";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs } from "@/components/ui/tabs";
import Image from "next/image";
import DB from '@/assets/dashboard.png'
import AN from '@/assets/autonotes.png'
import QP2 from '@/assets/qp2.png'
import QQ from '@/assets/quizq.png'
import AIF from '@/assets/forumap.png'
import PDF from '@/assets/pdfView.png'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import RURAL from '@/assets/rural.jpg'
import SMGL from '@/assets/smartgl.jpg'

export default function Home() {
  const [user, setUser] = useState(null)
  const [userPresent, setUserPresent] = useState(false);

  const tabs = [
    {
      title: "TextBook Summarizer",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Chat With your Textbooks!</p>
          <div className="mt-10 rounded-xl">
            <Image src={PDF} />
          </div>
        </div>
      ),
    },
    {
      title: "AutoNotes",
      value: "autonotes",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p> Generate AI Notes from Video Lectures!</p>
          <div className="mt-10 rounded-xl">
            <Image src={AN} />
          </div>
        </div>
      ),
    },
    {
      title: "AI Forum",
      value: "forum",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>An Example Integration of AI into Forums!</p>
          <div className="mt-10 rounded-xl">
            <Image src={AIF} />
          </div>
        </div>
      ),
    },
    {
      title: "QuizAI",
      value: "quizai",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p> Generate a Quiz With Explanations on a topic!</p>
          <div className="mt-10 rounded-xl">
            <Image src={QQ} />
          </div>
        </div>
      ),
    },
    {
      title: "QnP Analyzer",
      value: "qnp",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Analyze Question Papers and Prepare for Exams!</p>
          <div className="mt-10 rounded-xl">
            <Image src={QP2} />
          </div>
        </div>
      ),
    },
    {
      title: 'Dashboard Analytics',
      value: 'analytics',
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black">
          <p>Interactive Queryable Student Performance Dashboard!</p>
          <div className="mt-10 rounded-xl">
            <Image src={DB} />
          </div>
        </div>
      ),
    }
  ]

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setUserPresent(true);
      }
      else {
        setUser(null)
        setUserPresent(false)
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const cards = [
    {
      title: 'Local Server Rural Computer Center',
      desc1: 'We can utilize a Local Large Language Model (in our case, Mistral 7b) to power up an entire computer center via a local server.',
      desc2: 'With Govt. of Telangana announcing new facilities for Computer Centers in Rural Telangana, with this setup, students and educators in rural areas can access educational resources, conduct research, and collaborate on projects without relying on constant internet connectivity.',
      imgurl: RURAL
    },
    {
      title: 'Smart Glasses Object Detection System',
      desc1: 'Our system integrates object detection and explanation into smart glasses, enabling real-time learning experiences for students.',
      desc2: 'Powered by YOLOv8 and Gemini Pro LLM, this system identifies and explains objects in the surrounding environment, providing valuable educational insights to users. This software could be utilized by the blind as well, helping them understand their surroundings better.',
      imgurl: SMGL
    }
  ]





  return (
    !userPresent ? (
      <div className="h-screen w-screen flex justify-center items-center ">
        <Button onClick={handleGoogleAuth}>Sign In With Google</Button>
      </div>
    ) : (
      <main className="flex flex-col min-h-screen">
        {/* <div className="h-screen w-screen flex justify-center items-center ">
        <Button ><Link href='/dashboard' >Visit Dashboard</Link></Button>
      </div> */}
        <Navbar user={user} />
        <div className="">
          <div className="mt-40 font-semi bold xl:w-[80%] container mx-auto lg:text-7xl md:text-6xl text-3xl sm:text-4xl text-center">
            The <span className="gradient-text animate-gradient">Complete AI Build Toolkit</span><br /> for Students and Educators Alike.
          </div>
        </div>

        <h1 className="text-center mt-28 text-4xl font-semibold">Features</h1>
        <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full   items-start justify-start mb-24 mt-10">
          <Tabs tabs={tabs} />
        </div>

        <h1 className="text-center mt-28 text-4xl font-semibold">But that's not all.</h1>

        {/* <StickyScroll content={content} />*/}
        {/* <section className="mt-10 container">

          <div className="grid grid-cols-1 gap-8">
            
            <div className="bg-gray-900 rounded-xl p-8">
              <h2 className="text-white text-2xl font-semibold mb-4">Local Server Rural Computer Center</h2>
              <p className="text-gray-300 mb-4">
                We can utilize a Local Large Language Model (in our case, Mistral 7b) to power up an entire computer center via a local server.
              </p>
              <p className="text-gray-300">
                With Govt. of Telangana announcing new facilities for Computer Centers in Rural Telangana,
                with this setup, students and educators in rural areas can access educational resources,
                conduct research, and collaborate on projects without relying on constant internet connectivity.

              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-8">
              <h2 className="text-white text-2xl font-semibold mb-4">Smart Glasses Object Detection System</h2>
              <p className="text-gray-300 mb-4">
                Our system integrates object detection and explanation into smart glasses,
                enabling real-time learning experiences for students.
              </p>
              <p className="text-gray-300">
                Powered by YOLOv8 and Gemini Pro LLM, this system identifies and explains objects
                in the surrounding environment, providing valuable educational insights to users.
                This software could be utilized by the blind as well, helping them understand their surroundings better.
              </p>
            </div>
          </div>
        </section> */}

        <h1 className="text-center text-4xl mt-4 font-semibold mb-8 gradient-text animate-gradient">Features Empowering Socially Ethical Education</h1>


        <div className="container flex items-center justify-center gap-10">
          {cards.map((card) => (
            <CardContainer className="inter-var h-[600px] w-[120%]">
              <CardBody className="bg-[#292929] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[30] sm:w-[30rem] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="30"
                  className="text-xl font-bold gradient-text text-white dark:text-black"
                >
                  {card.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="40"
                  className=" text-sm max-w-sm mt-2 mb-4 text-white dark:text-black"
                >
                  {card.desc1}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="30"
                  className=" text-sm max-w-sm mt-2 text-gray-300 dark:text-black"
                >
                  {card.desc2}
                </CardItem>

                <CardItem translateZ="50" className='w-full flex justify-center items-center mt-8'>
                  <Image
                    src={card.imgurl}
                    height="900"
                    width="900"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>


              </CardBody>
            </CardContainer>
          ))}
        </div>


        <h2 className=" text-gray-600 text-center text-[300px] font-black">WIZZ.AI</h2>

        <section className="footer">

          <Separator />
          <div className="container flex flex-col items-center justify-center mt-8">
            <p className="text-gray-500 text-center">© 2024 WizzAI. All rights reserved.</p>
            <div className="flex mt-4 mb-10">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-700 mr-4">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-700">Terms of Service</Link>
            </div>
          </div>
        </section>

      </main>
    )
  );
}



function Navbar({ user }) {
  return (
    <div className='flex flex-col w-screen fixed z-50 '>
      <div className='px-10 py-3 flex justify-between mx-auto items-center w-screen bg-black'>
        <Link href='/' className='text-xl flex justify-center items-center h-[3rem] '>WizzAI.</Link>

        <div className="flex h-[3rem] gap-10 scale-0 md:scale-100 items-center">
          <Link href='/docs'>Docs</Link>
          <Link href='/'>About</Link>
          <Link href='/dashboard'>Dashboard</Link>
          <img src={user ? user.photoURL : ''} className="chat-user-icon" />
        </div>

      </div>
      <Separator className='mb-4' />
    </div>
  )
}


