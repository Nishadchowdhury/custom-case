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
] //phone's photo list

function splitArray<T>(array: Array<T>, numParts: number) {
    const result: Array<Array<T>> = [];

    const length = array.length;
    for (let i = 0; i < length; i++) {
        const index = i % numParts;
        if (!result[index]) { //if the index it empty 
            result[index] = []; // then initialize it with an empty array.
        }
        result[index].push(array[i]) // taking root  array's element and putting in divided array
    }
    return result
}




interface ReviewGridProps {

}
const ReviewGrid: React.FC<ReviewGridProps> = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, { amount: 0.2, once: false })

    // first we need to split the array into 3 arrays
    const columns = splitArray(PHONES, 3) // array want to split, and ,how  many columns we want to split into.
    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2], 2) // turning last array into two more arrays to mix with the other arrays/column.


    return (
        <div
            ref={containerRef}
            className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3 "
        >
            {isInView
                ?
                <>
                    <ReviewColumn />
                </>
                :
                null
            }


        </div >
    )

}

interface ReviewColumnProps {
    reviews: [string],
    className: string,
    reviewClassName?: (reviewIndex: number) => string,
    mxPerPixels?: number,
}

function ReviewColumn({ reviews, /*phone's array*/ className, reviewClassName, mxPerPixels /*how fast this column should move.*/ }: ReviewColumnProps) {
    const columnRef = useRef<HTMLDivElement | null>(null)
    const [columnHeight, setColumnHeight] = useState(0)
    const duration = `${columnHeight * mxPerPixels}ms`

    return (
        <div ref={columnRef} className={cn('animate-marquee space-y-8 py-4', className)}
            style={{ '--marquee-duration': duration } as React.CSSProperties}
        >

        </div>
    )

}

const Reviews2: React.FC = () => {


    return (
        <MaxWidthWrapper className="relative max-w-5xl">
            <img
                className="absolute select-none hidden xl:block -left-32 top-1/3"
                src="/what-people-are-buying.png"
                alt=""
                aria-hidden
            />

            <ReviewGrid />

        </MaxWidthWrapper>
    )

}

export default Reviews2;
