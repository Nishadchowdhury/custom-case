'use client';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Check, Star, StarHalf } from "lucide-react";

interface pageProps {

}
const ReviewSliderModal: React.FC<pageProps> = () => {

    const [snapped, setSnapped] = useState(0)

    return (
        <Carousel className="w-full select-none"
            opts={{
                loop: true,
                align: "start",
            }}
            setIndex={setSnapped} // custom setter option that will pass the index of middle item.
        >


            <CarouselContent>

                <CarouselItem
                    className={cn("relative  pl-0 basis-1/2",)}

                >

                    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                        <div
                            className="flex gap-0.5 mb-2"
                        >
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                        </div>

                        <div className="text-lg leading-8" >
                            <p>
                                &quot;The case feels durable and I even got a compliment on the design. Had the case for two and a half months and
                                <span className="p-0.5 bg-slate-800 text-white">the image is super clear</span>, on the case I had before, the image started fading into yellow-ish color after a couple of weeks. Love it.&quot;
                            </p>
                        </div>


                        <div className="flex gap-4 mt-2 ">
                            <img
                                className="rounded-full size-12 object-cover  "
                                src="/users/user-1.png"
                                alt="user"
                            />

                            <div className="flex flex-col ">
                                <p className="font-semibold">Jonathan</p>

                                <div className="flex gap-1.5 items-center text-dynamic-zinc " >
                                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                                    <p className="text-sm">Verified Purchase</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </CarouselItem>


                <CarouselItem
                    className={cn("relative  pl-0 basis-1/2",)}

                >

                    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                        <div
                            className="flex gap-0.5 mb-2"
                        >
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <StarHalf className="size-5 text-green-600 fill-green-600" />
                        </div>

                        <div className="text-lg leading-8" >
                            <p>
                                &quot;I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratch marks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner,  <span className="p-0.5 bg-slate-800 text-white">Looks brand new after about half a year</span>. I dig it.&quot;
                            </p>
                        </div>


                        <div className="flex gap-4 mt-2 ">
                            <img
                                className="rounded-full size-12 object-cover  "
                                src="/users/user-4.jpg"
                                alt="user"
                            />

                            <div className="flex flex-col ">
                                <p className="font-semibold">Rayan Stroke</p>

                                <div className="flex gap-1.5 items-center text-dynamic-zinc" >
                                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                                    <p className="text-sm">Verified Purchase</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </CarouselItem>
                <CarouselItem
                    className={cn("relative  pl-0 basis-1/2",)}

                >

                    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
                        <div
                            className="flex gap-0.5 mb-2"
                        >
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                            <Star className="size-5 text-green-600 fill-green-600" />
                        </div>

                        <div className="text-lg leading-8" >
                            <p>
                                &quot;I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratch marks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner,  <span className="p-0.5 bg-slate-800 text-white">Looks brand new after about half a year</span>. I dig it.&quot;
                            </p>
                        </div>


                        <div className="flex gap-4 mt-2 ">
                            <img
                                className="rounded-full size-12 object-cover  "
                                src="/users/user-5.jpg"
                                alt="user"
                            />

                            <div className="flex flex-col ">
                                <p className="font-semibold">Adam</p>

                                <div className="flex gap-1.5 items-center text-dynamic-zinc" >
                                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                                    <p className="text-sm">Verified Purchase</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </CarouselItem>



            </CarouselContent>
            <CarouselPrevious className='dark:outline outline-primary outline-1 -outline-offset-1' />
            <CarouselNext className='dark:outline outline-primary outline-1 -outline-offset-1' />
        </Carousel >

    )

}

export default ReviewSliderModal;