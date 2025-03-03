import NextImage from 'next/image';
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "../../lib/utils";
import { RATIOS } from "../../validators/option-validator";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from '../ui/button';
import { PlayCircleIcon } from 'lucide-react';

// import Autoplay from "embla-carousel-autoplay"

const aspects = {
    w: RATIOS.card.w,
    h: RATIOS.card.h
}



const cards = ["/cards/1.png", "/cards/2.png", "/cards/3.jpg", "/cards/4.jpg", "/cards/5.png", "/cards/6.jpg", "/cards/7.jpg", "/cards/8.png", "/cards/9.png"]


const CardSliderModal: React.FC = () => {

    const [snapped, setSnapped] = useState(0)


    return <Dialog defaultOpen >
        <DialogContent
            className="absolute z-[9999999] w-11/12 rounded-md border-none pointer-events-none"
        >
            <DialogHeader>

                <DialogTitle
                    className="text-md md:text-3xl text-center font-bold tracking-tight text-gray-900 "
                >
                    Here are some cards that out customers created before
                </DialogTitle>

                <DialogDescription className="text-sm md:text-base md:flex items-center justify-center text-center py-2">
                    <span className="font-medium text-zinc-900 ">
                        Here are some <strong>DUMMY</strong> cards and are not useable
                    </span>

                </DialogDescription>
            </DialogHeader>

            <div className="relative" >

                <div className='absolute z-50 h-full w-14 pointer-events-none inset-y-0 -left-1 bg-gradient-to-r from-zinc-200 ' />

                <div className='absolute z-50 h-full w-14 pointer-events-none inset-y-0 -right-1 bg-gradient-to-l from-zinc-200 ' />

                <Carousel className="md:w-full w-10/12 z-40 mx-auto  select-none "
                    opts={{
                        loop: true,

                    }}
                    setIndex={setSnapped} // custom setter option that will pass the index of middle item.
                >


                    <CarouselContent className='relative' >



                        {cards.map((url, index) => {
                            const isSnapped = snapped === index;

                            return (

                                <CarouselItem
                                    key={index} className={cn("relative basis-full w-full max-w-52 sm:w-auto sm:max-w-72 pl-0",
                                        `aspect-[${aspects.w}/${aspects.h}]`)}
                                    onChange={() => console.log('dara')}
                                >
                                    <AspectRatio
                                        ratio={aspects.w / aspects.h}
                                        className={cn(' flex scale-75 transition-all duration-700 blur-sm opacity-75 rounded-2xl overflow-hidden',
                                            `aspect-[${aspects.w}/${aspects.h}]`,
                                            isSnapped && "scale-100 opacity-100 blur-none")}
                                    >

                                        <NextImage
                                            alt="Card Image"
                                            src={url}
                                            className="pointer-events-none z-40 select-none "
                                            fill
                                        />



                                    </AspectRatio>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel >


            </div>

        </DialogContent>
    </Dialog>

}

export default CardSliderModal;