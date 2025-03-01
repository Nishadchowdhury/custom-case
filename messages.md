update message:-
🔧 We’re Upgrading Our Website! 🔧
un a quote italic css:- "Our website is currently undergoing an upgrade to bring you a better experience. Please check back later. Thank you for your patience!"



next to do
.











"use client"
import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '../../../components/ui/button'
import { Card, CardContent } from '../../../components/ui/card'

export default function EmblaCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })


    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (<>
        <div className="embla bg-red-500 h-80 w-1/2 mx-auto  select-none" ref={emblaRef}>
            <div className="embla__container h-full ">

                {Array.from({ length: 5 }).map((_, index) => (

                    <div key={index} className=" embla__slide p-1 aspect-square h-full">
                        <Card className='h-full ' >
                            <CardContent className="flex items-center justify-center p-6 h-full">
                                <span className="text-3xl font-semibold">{index + 1}</span>
                            </CardContent>
                        </Card>
                    </div>

                ))}

            </div>



        </div>
        <Button size={"icon"} variant={"outline"} className="embla__prev  " onClick={scrollPrev}>
            Prev
        </Button>
        <Button size={"icon"} variant={"outline"} className="embla__next  " onClick={scrollNext}>
            Next
        </Button>

    </>
    )
}
