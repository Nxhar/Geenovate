import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import Image from "next/image";
import YT from '@/assets/yt_transcript.jpg'
import QP from '@/assets/qnp.jpeg'
import PDF from '@/assets/pdf.jpeg'
import AN from '@/assets/analyze.jpg'
import FO from '@/assets/forum.jpg'
import QZ from '@/assets/quiz.jpg'


function Page() {
    const cards = [
        {
            id: 1,
            link: '/dashboard/textbook-summarizer',
            imgurl: PDF,
            heading: 'Chat with your Textbooks',
            desc: 'Upload your textbook, wait for a minute, and boom! Personalize your level of learning across 5 levels!',
        },
        {
            id: 2,
            link: '/dashboard/ai-notes-maker',
            imgurl: YT,
            heading: 'AutoNotes AI',
            desc: 'Generate Notes from Video lectures! Upload a youtube link, and you\'ll receive your notes in a neat markdown.'
        },
        {
            id: 3,
            link: '/dashboard/forum',
            imgurl: FO,
            heading: 'Community Forum',
            desc: 'An AI powered Community Forum to cater to your doubts, and get additional insights!'
        },
        {
            id: 4,
            link: '/dashboard/quiz-gen',
            imgurl: QZ,
            heading: 'Quiz Generator',
            desc: 'Generate a Quiz in seconds, with detailed Answer Explanations!'
        },
        {
            id: 5,
            link: '/dashboard/qp-analysis',
            imgurl: QP,
            heading: 'Question Paper Analyzer',
            desc: 'Get an insight into the Questions from a given Paper, understand the Concepts and Patterns!'
        },
        {
            id: 6,
            link: '/dashboard/analytics',
            imgurl: AN,
            heading: 'Dashboard Analytics',
            desc: 'An Interactive Student Performance Dashboard with Personal Statistics that can be queried!'
        }
    ];

    return (
        <>
            <h1 className='text-center pt-10 text-5xl mb-10 font-medium '>Boost Your Productivity <span className='gradient-text'> Tenfold.</span></h1>

            <div className="flex flex-wrap gap-10 justify-center items-center">
                {cards.map((card) => (
                    <Link key={card.id} href={card.link}>
                        <CardContainer className="inter-var">
                            <CardBody className="bg-[#292929] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[30] sm:w-[30rem] h-auto rounded-xl p-6 border">
                                <CardItem
                                    translateZ="30"
                                    className="text-xl font-bold gradient-text text-white dark:text-black"
                                >
                                    {card.heading}
                                </CardItem>
                                <CardItem
                                    as="p"
                                    translateZ="40"
                                    className=" text-sm max-w-sm mt-2 text-white dark:text-black"
                                >
                                    {card.desc}
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

                                <div className="flex justify-between items-center mt-8">
                                    <CardItem
                                        translateZ="20"
                                        as="button"
                                        className="px-4 py-2 rounded-xl text-xs font-normal text-white dark:text-white"
                                    >
                                        Try now →
                                    </CardItem>
                                    <CardItem
                                        translateZ="20"
                                        as="button"
                                        className="px-4 py-2 rounded-xl bg-[#545454] dark:bg-[#9b51e0] dark:text-black text-[#eee] text-xs font-bold"
                                    >
                                        Learn More
                                    </CardItem>
                                </div>
                            </CardBody>
                        </CardContainer>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Page;
