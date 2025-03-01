import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "../ui/button";
import { SlidingNumber } from "../ui/sliding-number";

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ClassName from "embla-carousel-class-names"
import { cn } from "../../lib/utils";

// import Autoplay from "embla-carousel-autoplay"

const CardSliderModal: React.FC = () => {
    const TWEEN_FACTOR_BASE = 0.84
    const [snapped, setSnapped] = useState(0)

    return <Dialog open>
        <DialogContent
            className="absolute z-[9999999] "
        >
            <DialogHeader>
                <div className="relative mx-auto w-24 h-24 mb-2  ">
                    <Image
                        src="/snake-1.png"
                        alt="snake Image"
                        className="object-contain"
                        fill
                    />
                </div>

                <DialogTitle
                    className="text-3xl text-center font-bold tracking-tight text-gray-900 "
                >
                    Login to continue
                </DialogTitle>
                <DialogDescription className="text-base text-center py-2  ">
                    <span className="font-medium text-zinc-900 ">
                        Your configuration was saved!
                    </span>{' '}
                </DialogDescription>
            </DialogHeader>

            <div className="  " >



                <Carousel className="w-1/2 mx-auto bg-red-400 select-none"
                    opts={{
                        loop: true,

                    }}

                    setIndex={setSnapped}
                >
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem
                                key={index} className={cn("basis-1/4 duration-1000 opacity-50 transition-opacity", snapped === index && " opacity-100")}
                                onChange={() => console.log('dara')}
                            >
                                <div className={cn("p-1 scale-90 transition-all duration-1000", snapped === index && "scale-100")}>
                                    <Card>
                                        <CardContent className="flex items-center justify-center p-6">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel >


            </div>

        </DialogContent>
    </Dialog>

}

export default CardSliderModal;