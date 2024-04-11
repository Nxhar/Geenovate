"use client"

import Link from "next/link"
import {  LayoutDashboard, ScrollText, MessageCircle, StickyNote, NotebookPen, AreaChart } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"


function Sidebar() {

    const pathname = usePathname();

  return (
    <>
    <div className='flex  h-screen fixed py-3 w-64 '>
        <div className="flex flex-col px-5">
        <Link href='/' className='text-xl flex items-center ml-5 h-12'>WizzAI.</Link>

        {/*  Links  */}
        <div className='flex flex-col gap-2 mt-10 '>
            <Link href='/dashboard' className={`sidebar-link hover:dark:bg-slate-800 hover:bg-[#9b51e0] hover:text-white transition-all duration-150 ${pathname==='/dashboard'? 'dark:bg-slate-600 bg-[#9b51e0] text-white transition-all' : ''}`}><LayoutDashboard size={18}/>Dashboard</Link>
            <Link href='/dashboard/textbook-summarizer' className={`sidebar-link hover:dark:bg-slate-800 hover:bg-[#9b51e0] hover:text-white transition-all duration-150 ${pathname==='/dashboard/textbook-summarizer'? 'dark:bg-slate-600 bg-[#9b51e0] text-white transition-all' : ''}`}> <NotebookPen size={18  }/>Textbook Summarizer</Link>
            <Link href='/dashboard/ai-notes-maker' className={`sidebar-link hover:dark:bg-slate-800 hover:bg-[#9b51e0] hover:text-white transition-all duration-150 ${pathname==='/dashboard/ai-notes-maker'? 'dark:bg-slate-600 bg-[#9b51e0] text-white transition-all' : ''}`}> <MessageCircle size={18}/>AutoNotes</Link>
            
            <Link href='/dashboard/qp-analysis' className={`sidebar-link hover:dark:bg-slate-800 hover:bg-[#9b51e0] hover:text-white transition-all duration-150 ${pathname==='/dashboard/qp-analysis'? 'dark:bg-slate-600 bg-[#9b51e0] text-white transition-all' : ''}`}><ScrollText size={18}/>Question Paper Analyzer</Link>     
            <Link href='/dashboard/forum' className={`sidebar-link hover:dark:bg-slate-800 hover:bg-[#9b51e0] hover:text-white transition-all duration-150 ${pathname==='/dashboard/forum'? 'dark:bg-slate-600 bg-[#9b51e0] text-white transition-all' : ''}`}> <StickyNote size={18}/>AI Forum</Link>
            <Link href='/dashboard/quiz-gen' className={`sidebar-link hover:dark:bg-slate-800 hover:bg-[#9b51e0] hover:text-white transition-all duration-150 ${pathname==='/dashboard/quiz-gen'? 'dark:bg-slate-600 bg-[#9b51e0] text-white transition-all' : ''}`}> <NotebookPen size={18}/>Quiz Generator</Link>
            <Link href='/dashboard/analytics' className={`sidebar-link hover:dark:bg-slate-800 hover:bg-[#9b51e0] hover:text-white transition-all duration-150 ${pathname==='/dashboard/analytics'? 'dark:bg-slate-600 bg-[#9b51e0] text-white transition-all' : ''}`}> <AreaChart size={18}/>Student Analytics</Link>

            

        </div>
        
        </div>
        <Separator orientation={'vertical'}/>
    </div>
    
    </>
  )
}

export default Sidebar