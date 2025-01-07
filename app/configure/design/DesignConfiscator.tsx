'use client'
import HandleComponent from "@/components/custom/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatePrice } from "@/lib/utils";
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import { RadioGroup } from '@headlessui/react'
import { useRef, useState } from "react";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";

interface pageProps {
    configId: string;
    imageUrl: string;
    imageDimensions: {
        width: number;
        height: number;
    }

}

const DesignConfiscator: React.FC<pageProps> = ({ configId, imageUrl, imageDimensions }) => {
    const { startUpload, isUploading, } = useUploadThing("imageUploader");
    const { toast } = useToast()
    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number]
        model: (typeof MODELS.options)[number]
        material: (typeof MATERIALS.options)[number]
        finish: (typeof FINISHES.options)[number]
    }>(
        {
            color: COLORS[0],
            model: MODELS.options[0],
            material: MATERIALS.options[0],
            finish: FINISHES.options[0]
        }
    )

    const [renderedDimension, setRenderedDimension] = useState({
        width: imageDimensions.width / 4,// initial dimensions of the image 
        height: imageDimensions.height / 4
    }) // the size of the image.

    const [renderedPosition, setRenderedPosition] = useState({
        x: 150,// initial positions of the image
        y: 205
    })


    const phoneCaseRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    async function saveConfiguration() {
        // if (!phoneCaseRef.current) return // to get rid from the error of TS cz we destructured "phoneCaseRef.current?.getBoundingClientRect()" but if the ref.current is undefined then the user won't know what happened here and that's why we need to use other way.

        try {
            // const { } = phoneCaseRef.current?.getBoundingClientRect() // it gives the exact coordinates 
            const {// taking the position of case
                left: caseLeft, // distance from the window to the element.
                top: caseTop, // we need to work with another width property in this func that's why renaming the mandatory.
                width, // rendered caseWidth
                height // rendered caseHeight 
                // this height and width we can use to create the canvas 
            } = phoneCaseRef.current!.getBoundingClientRect() // we're telling TS that we're sure about that we will get the data from it by replacing "?" with "!" here.

            const { // taking the position of outer container
                left: containerLeft,
                top: containerTop,
            } = containerRef.current!.getBoundingClientRect(); //returns the size of an element and its position relative to the viewport.


            // calculating the offset -distance between case and its container-
            const leftOffset = caseLeft - containerLeft // (distance of case from window - distance of the container from window) = distance of the case from the starting of the container 
            const topOffset = caseTop - containerTop

            // there will be a canvas same size as the case.
            // The position of the image on in the canvas is actualX and actualY // eg: rendered position is x150, y150. so 150-(100 distance of case from container) = 50. That means the image position in the canvas will be x=50px. 
            const actualX = renderedPosition.x/*position between the image and container X*/ - leftOffset
            const actualY = renderedPosition.y - topOffset /*distance between container and case eg: x100*/
            // actualX and actualY relative to the case not the container. 

            const canvas = document.createElement('canvas') // create a canvas to print things.
            canvas.width = width
            canvas.height = height

            const ctx = canvas.getContext('2d') // context allows to modify the canvas and draw things.

            const userImage = new Image(); // to get the image that we want to draw into the canvas.
            userImage.crossOrigin = 'anonymous'; // it will prevent occurring any CORS errors during drawing the image into the canvas.
            userImage.src = imageUrl;
            await new Promise((resolve, reject) => (userImage.onload = resolve)) // waiting to load the image from the url into the userImage var.
            // now the image is fully loaded and ready to be drawn into the canvas.

            ctx?.drawImage(
                userImage,
                actualX, // calculated position from the visual elements
                actualY,
                renderedDimension.width, // final sizes of the image (dimensions)
                renderedDimension.height,
            )

            const base64 = canvas.toDataURL() // this is the best way to convert a canvas to a base64 =it returns> a really long string contains the image data in base64 formate.
            const base64data = base64.split(',')[1] // [info of base64, theBase64String]
            const blob = base64ToBlob(base64data, "image/png") // turning into a blob object
            const file = new File([blob], String('CROP_' + Date.now() + "_file.png"), { type: "image/png" });
            // 6.00.00
            return
            await startUpload([file], {
                configId
            })

        } catch (err) {
            // and if any error happens then we will trigger a toast to the user so that they can see what really happened.
            toast({
                title: "Something went wrong!!!",
                description: "There was a problem saving your config, please try again.",
                variant: "destructive",
            })

        }
    }

    function base64ToBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64);
        const byteArrayLength = byteCharacters.length;
        const byteNumbers = new Array(byteArrayLength);
        for (let i = 0; i < byteArrayLength; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers)
        return new Blob([byteArray], { type: mimeType })

    }

    return (
        <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20 ' >
            <div
                ref={containerRef}
                className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831] _3:58:00_  ">
                    <AspectRatio
                        ref={phoneCaseRef}
                        ratio={896 / 1831} //the ratio of the phone png we're gonna use
                        className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
                    >
                        <NextImage
                            alt="phone Image"
                            src={'/phone-template.png'}
                            className="pointer-events-none z-50 select-none"
                            fill
                        />
                    </AspectRatio>
                    <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] 
                    shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
                    <div
                        className={cn('absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
                            `bg-${options.color.tw}`)}
                    />

                </div>


                <Rnd // 4:09:00
                    default={{
                        x: 150,
                        y: 205,
                        height: imageDimensions.height / 4,
                        width: imageDimensions.width / 4
                    }}
                    lockAspectRatio
                    onResizeStop={(_, __, ref, ___, { x, y }) => { // _ means we won't use this var. 
                        setRenderedDimension({
                            height: parseInt(ref.style.height.slice(0, -2)  /*50px*/),
                            width: parseInt(ref.style.width.slice(0, -2))  /*50px*/
                        })
                        setRenderedPosition({ x, y })
                    }} // this event will trigger when the resize event is triggered.

                    onDragStop={(_, data) => {
                        const { x, y } = data;
                        setRenderedPosition({ x, y });
                    }}

                    resizeHandleComponent={{
                        bottomRight: <HandleComponent />,
                        bottomLeft: <HandleComponent />,
                        topRight: <HandleComponent />,
                        topLeft: <HandleComponent />
                    }}

                    className="absolute z-20 hover: border-[3px] border-primary"

                >
                    <div className="relative w-full h-full ">
                        <NextImage
                            src={imageUrl}
                            fill
                            alt="your Image"
                            className="pointer-events-none"

                        />
                    </div>
                </Rnd>


            </div>

            <div className="h-[37.5rem] w-full col-span-full lg:col-span-1 flex flex-col bg-white ">
                <ScrollArea
                    className="relative flex-1 overflow-auto "
                >
                    <div
                        className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none "
                        aria-hidden
                    />

                    <div
                        className="px-8 pb-12 pt-8"
                    >
                        <h2>Customize your case</h2>

                        <div
                            className="w-full h-px bg-zinc-200 my-6 "
                        />

                        <div
                            className="relative mt-4 h-full flex flex-col justify-between "
                        >
                            <div className="flex flex-col gap-6 " >

                                <RadioGroup
                                    value={options.color}
                                    onChange={(value) => {
                                        setOptions((prev) => {
                                            return {
                                                ...prev,
                                                color: value
                                            }
                                        })
                                    }}
                                >
                                    <Label >
                                        Color: {options.color.label}
                                    </Label>

                                    <div
                                        className="mt-3 flex items-center space-x-3"
                                    >
                                        {
                                            COLORS.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.label}
                                                    value={color}
                                                    className={({ active, checked }) => cn('relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent ',
                                                        {
                                                            [`border-${color.tw}`]: active || checked // cn function doesn't support template string directly in conditions so [``] needed here.
                                                        }
                                                    )
                                                    }
                                                >
                                                    <span
                                                        className={cn(`bg-${color.tw}`, "h-8 w-8 rounded-full border-black border-opacity-10  ")}
                                                    />
                                                </RadioGroup.Option>
                                            ))
                                        }
                                    </div>
                                </RadioGroup>
                                <div className="relative flex flex-col gap-3 w-full ">
                                    <Label>Model</Label>
                                    <DropdownMenu >
                                        <DropdownMenuTrigger asChild /*the child will be printed here*/ >
                                            <Button
                                                variant={'outline'}
                                                role="combobox"
                                                className="w-full justify-between"
                                            >
                                                {options.model.label}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent >
                                            {MODELS.options.map((model) => (
                                                <DropdownMenuItem
                                                    key={model.label}
                                                    className={cn('flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100', {
                                                        "bg-zinc-100": model.label === options.model.label
                                                    })}
                                                    onClick={() => {
                                                        setOptions((prev) => ({ ...prev, model }))
                                                    }}
                                                >
                                                    <Check className={cn('mr-2 h-4 w-4 ',
                                                        model.label === options.model.label ? "opacity-100" : "opacity-0"
                                                    )} />
                                                    {model.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>

                                    </DropdownMenu>

                                    {
                                        [MATERIALS, FINISHES].map(({ name, options: selectableOptions }) => (
                                            <RadioGroup
                                                key={name}
                                                value={options[name]}
                                                onChange={(value) => {
                                                    setOptions((prev) => ({
                                                        ...prev,
                                                        [name]: value
                                                    }));
                                                }}
                                            >
                                                <Label>
                                                    {name.slice(0, 1).toUpperCase() + name.slice(1)} {/* making first latter capital by js */}
                                                </Label>
                                                <div className="mt-3 space-y-4" >
                                                    {
                                                        selectableOptions.map((option) => (
                                                            <RadioGroup.Option

                                                                key={option.value}
                                                                value={option}
                                                                className={({ active, checked }) => cn(
                                                                    "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                                                                    {
                                                                        'border-primary': active || checked
                                                                    }
                                                                )}
                                                            >
                                                                <span className="flex items-center" >
                                                                    <span className="flex flex-col text-sm  ">
                                                                        <RadioGroup.Label
                                                                            as="span"
                                                                            className='font-medium text-gray-900  '
                                                                        >
                                                                            {option.label}
                                                                        </RadioGroup.Label>

                                                                        {
                                                                            option.description ? (
                                                                                <RadioGroup.Description as='span'
                                                                                    className={'text-gray-500'}
                                                                                >
                                                                                    <span className="block sm:inline" >
                                                                                        {option.description}
                                                                                    </span>
                                                                                </RadioGroup.Description>
                                                                            )
                                                                                : null
                                                                        }
                                                                    </span>
                                                                </span>

                                                                <RadioGroup.Description as="span"
                                                                    className={'mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right '}
                                                                >
                                                                    <span
                                                                        className="font-medium text-gray-900 "
                                                                    >
                                                                        {formatePrice(option.price / 100)}
                                                                    </span>
                                                                </RadioGroup.Description>

                                                            </RadioGroup.Option>
                                                        ))
                                                    }
                                                </div>
                                            </RadioGroup>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                </ScrollArea>

                <div className="w-full px-8 h-1/6 bg-white">
                    <div className="h-px w-full bg-zinc-200  " />
                    <div className="w-full h-full flex justify-end items-center">
                        <div className="w-full flex gap-6 items-center ">
                            <p className="font-medium whitespace-nowrap">
                                {formatePrice((BASE_PRICE + options.finish.price + options.material.price) / 100)}
                            </p>
                            <Button
                                size={"sm"}
                                className="w-full"
                                onClick={() => saveConfiguration()}
                            >
                                Continue
                                <ArrowRight className="size-4 ml-1.5 inline" />
                            </Button>
                        </div>
                    </div>
                </div>

            </div >

        </div >
    )

}

{/* <h1 className="bg-zinc-900 border-zinc-900 bg-blue-950 border-blue-950 bg-rose-950 border-rose-950 hidden" /> */ }

export default DesignConfiscator;