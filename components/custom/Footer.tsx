import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer
            className='bg-white/75 dark:bg-slate-900 h-20 relative w-full border-t border-gray-200 dark:border-slate-500 text-dynamic-zinc'
        >
            <MaxWidthWrapper>
                <div className=' ' />

                <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
                    <div className="text-center md:text-left pb-2 md:pb-0">
                        <p className='text-sm text-muted-foreground' >
                            &copy; {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex space-x-8 ">
                            <Link href={'/'} className={"text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300"} >Terms</Link>
                            <Link href={'/'} className={"text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300"} >Privacy Policy</Link>
                            <Link href={'/'} className={"text-sm text-muted-foreground hover:text-gray-600 dark:hover:text-gray-300"} >Cookie policy</Link>
                        </div>
                    </div>

                </div>
            </MaxWidthWrapper>
        </footer>
    )
}
