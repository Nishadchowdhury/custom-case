/* eslint-disable @next/next/no-img-element */
"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "./Phone";

const PHONES = [
    "/testimonials/1.jpg",
    "/testimonials/2.jpg",
    "/testimonials/3.jpg",
    "/testimonials/4.jpg",
    "/testimonials/5.jpg",
    "/testimonials/6.jpg",
]

function splitArray<T>(array: Array<T>, numParts: number) {
    const result: Array<Array<T>> = [];

    const length = array.length;

    for (let i = 0; i < length; i++) {
        const index = i % numParts;

        if (!result[index]) {
            result[index] = []
        }
        result[index].push(array[i])
    }

    return result;
}


/////////////////////////////////////////////////////////////////// eslint-disable-next-line @next/next/no-img-element
const Reviews: React.FC = () => {
    return (
        <MaxWidthWrapper className="relative">
            <img
                className="absolute select-none hidden xl:block -left-32 top-1/3"
                src="/what-people-are-buying.png"
                alt=""
                aria-hidden
            />
            {/* side image */}


            <ReviewGrid />

        </MaxWidthWrapper>
    )

}

export default Reviews;


/////////////////////////////////////////////////////////////////
function ReviewGrid() {
    const containerRef = useRef<HTMLDivElement | null>(null)

    const inView = useInView(containerRef, { // this hook checks is the ref in the viewport or not.
        once: false,
        amount: 0.2,
    })

    const columns = splitArray(PHONES, 3)
    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2], 2)



    return <div
        ref={containerRef}
        className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 "
    >
        {inView ?
            <>
                <ReviewColumn
                    reviews={[...column1, ...column3.flat(), ...column2]}
                    reviewClassName={(reviewIndex) => cn({ 'md:hidden': reviewIndex >= column1.length + column3[0].length, 'lg:hidden': reviewIndex >= column1.length })}

                    mxPerPixels={10}
                />

                <ReviewColumn
                    reviews={[...column2, ...column3[1]]}
                    className="hidden md:block"
                    reviewClassName={(reviewIndex) => reviewIndex >= column2.length
                        ? 'lg:hidden' : ""}

                    mxPerPixels={15}
                />

                <ReviewColumn

                    className="hidden md:block"
                    reviews={[...column3.flat()]}
                    // reviewClassName={(reviewIndex) => cn({
                    //     'md:hidden': reviewIndex >= column1.length + column3[0].length,
                    //     'lg:hidden': reviewIndex >= column1.length
                    // })}

                    mxPerPixels={8}
                />

            </>
            :
            <>

            </>

        }
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100 " />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100 " />
    </div>
}




///////////////////////////////////////////////////////////////// 
function ReviewColumn({ reviews, className, reviewClassName, mxPerPixels }: { reviews: string[], className?: string, reviewClassName?: (reviewIndex: number) => string, mxPerPixels: number, }) {

    const columnRef = useRef<HTMLDivElement | null>(null)
    const [columnHeight, setColumnHeight] = useState(0)
    const duration = `${columnHeight * mxPerPixels}ms`

    useEffect(() => {
        if (!columnRef.current) return


        const resizeObserver = new window.ResizeObserver(() => {
            setColumnHeight(columnRef.current?.offsetHeight ?? 0)
        })

        resizeObserver.observe(columnRef.current)

        return () => {
            resizeObserver.disconnect()
        }

    }, [])

    return (
        <div ref={columnRef}
            className={cn('animate-marquee space-y-8 py-4', className)}
            style={{ '--marquee-duration': duration } as React.CSSProperties}
        >
            {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
                <Review
                    key={reviewIndex}
                    className={reviewClassName?.(reviewIndex % reviews.length)}
                    imgSrc={imgSrc}

                />
            ))}

        </div>
    )
}

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
}
function Review({ imgSrc, className, ...props }: ReviewProps) {

    const POSSIBLE_ANIMATION_DELAY = ["0s", "0.1s", "0.2s", "0.3", "0.4s", "0.5s",]

    const animationDelay = POSSIBLE_ANIMATION_DELAY[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAY.length)]

    return (
        <div
            className={cn("animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5 ", className)}
            style={{ animationDelay }}  // random animation delay
            {...props}>
            <Phone
                imgSrc={imgSrc}

            />

        </div>
    )
}


