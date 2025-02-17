'use client'
import HandleComponent from "@/components/custom/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatePrice, getCardType } from "@/lib/utils";
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import { RadioGroup } from '@headlessui/react'
import { useEffect, useRef, useState } from "react";
import { COLORS, FINISHES, MATERIALS, MODELS, RATIOS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { saveConfig as _saveConfig, SaveConfigArgs } from "./action";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface pageProps {
    configId: string;
    imageUrl: string;
    imageDimensions: {
        width: number;
        height: number;
    },
    type: string | string[] | undefined;

}

const DesignConfiscator: React.FC<pageProps> = ({ configId, imageUrl, imageDimensions, type = "case" }) => {
    const { startUpload, isUploading } = useUploadThing("imageUploader");
    const { toast } = useToast();
    const router = useRouter();

    const phoneCaseRef = useRef<HTMLDivElement>(null) // im keeping the same as it was, this will help me later to understand the doc later.
    const containerRef = useRef<HTMLDivElement>(null)

    const [caseDimensions, setCaseDimensions] = useState({
        width: 0,
        height: 0
    });

    const [cardData, setCardData] = useState<{
        cardNumber: string;
        expireDate: string;
        cvv: string;
        cardHolderName: string;
    }>({
        cardNumber: "",
        expireDate: "",
        cvv: "",
        cardHolderName: "",
    })



    const cardType = getCardType(cardData.cardNumber);
    console.log(cardData.cardNumber.length === 6, cardType.cardName);
    function cardDataSetter(value: string, type: "cardNumber" | "expireDate" | "cvv" | "cardHolderName") {

        const isNumber = Number(value)
        const isEmptyValue = value.trim() === "" //this will be the case when user try to clear the last number or string from the inputs

        switch (type) {

            case "cardNumber":
                if (isEmptyValue) {
                    setCardData(prevState => ({ ...prevState, cardNumber: "" }));
                    break;
                }

                if (!isNumber) {
                    return toast({
                        title: "Only numbers are allowed",
                        variant: "destructive",
                        duration: 2000,
                    })
                }

                if (cardData.cardNumber.length === 6 && cardType.cardName === null) {
                    toast({
                        title: "Please provide a valid card number",
                        variant: "destructive",
                        duration: 2000,
                    })
                    setCardData(prevState => ({ ...prevState, cardNumber: "" }));

                    break;
                } else {
                    setCardData(prevState => ({ ...prevState, cardNumber: value }));
                }
                break;


            case "expireDate":

                const day = value.slice(0, 2);
                const year = value.slice(2, 4);
                const thisYear = (new Date()).getFullYear().toString().slice(2, 4);

                if (isEmptyValue) {
                    setCardData(prevState => ({ ...prevState, expireDate: "" }));
                    break;
                }
                if (!isNumber && !(day === "0")) {
                    toast({
                        title: "Only numbers are allowed",
                        description: "Type which month is the expire date of the card!",
                        variant: "destructive",
                        duration: 2000,
                    });
                    break;
                }

                if (Number(day) > 12) {
                    toast({
                        title: "Please provide a valid month!",
                        variant: "destructive",
                        duration: 2000,
                    })
                    break;
                } else if ((year.length === 2) && (Number(year) < Number(thisYear))) {
                    toast({
                        title: "Please provide an unexpired date!",
                        variant: "destructive",
                        duration: 2000,
                    })
                    break;
                } else {
                    setCardData(prevState => ({ ...prevState, expireDate: value }))
                }
                break;


            case "cvv":
                setCardData(prevState => ({ ...prevState, cvv: value }));
                break;
            case "cardHolderName":
                setCardData(prevState => ({ ...prevState, cardHolderName: value }));
                break;
        }

    }



    useEffect(() => {
        if (phoneCaseRef?.current) {
            const { width, height } = phoneCaseRef.current.getBoundingClientRect()
            setCaseDimensions({ width, height })
        }

    }, [phoneCaseRef])

    const envCheck = process.env.NODE_ENV === "production";
    const isCase = type === "case"

    const { mutate: saveConfig, isPending } = useMutation({
        mutationKey: ['save-config'],
        mutationFn: async (args: SaveConfigArgs) => {
            // we'll do the operations simultaneously. It means multiple promise calls at the same time
            await Promise.all([saveConfiguration(), _saveConfig(args)])
        },
        onError: () => {
            toast({
                title: "Something went wrong!!!",
                description: "There was a problem saving your config, please try again.",
                variant: "destructive",
            })
        },
        onSuccess: () => {
            router.push(`/configure/preview?id=${configId}`)
        }
    });

    const [options, setOptions] = useState<{
        color: (typeof COLORS)[number]
        model: (typeof MODELS.options)[number]
        material: (typeof MATERIALS.options)[number]
        finish: (typeof FINISHES.options)[number]
    }>(
        {
            color: COLORS[0],
            model: MODELS.options[0],
            material: MATERIALS.options[isCase ? 0 : 2],
            finish: FINISHES.options[isCase ? 0 : 2]
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



    async function saveConfiguration() {
        // if (!phoneCaseRef.current) return // to get rid from the error of TS cz we destructured "phoneCaseRef.current?.getBoundingClientRect()" but if the ref.current is undefined then the user won't know what happened here and that's why we need to use other way.

        try {

            /*this is the portion of calculating the sizes and dimensions of the structures of card and case. */
            // const { } = phoneCaseRef.current?.getBoundingClientRect() // it gives the exact coordinates 
            const {// taking the position of case
                left: caseLeft, // distance from the window to the element.
                top: caseTop, // we need to work with another width property in this func that's why renaming the mandatory.
                width, // rendered caseWidth
                height // rendered caseHeight 
                // this height and width we can use to create the canvas 
            } = phoneCaseRef.current!.getBoundingClientRect() // we're telling TS that we're sure about that we will get the data from it by replacing "?" with "!" here.
            console.log({ width, height });
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

            /*this is the end of portion of calculating the sizes and dimensions of the structures of card and case. */



            const canvas = document.createElement('canvas') // create a canvas to print things.
            canvas.width = width // proving the dimensions of the canvas as the structure ot the item
            canvas.height = height // proving the dimensions of the canvas as the structure ot the item

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

            const base64 = canvas.toDataURL() // this is the best way to convert a canvas to a base64 =it returns> a really long string contains the image data in base64 formate. //Base64 is a way of encoding binary data (like images, audio files, or other binary formats) into a string  
            // presentation of base64 = iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12

            const base64data = base64.split(',')[1] // [info of base64, theBase64String] A Base64-encoded string that represents binary image data.
            const blob = base64ToBlob(base64data, "image/png") // turning into a blob object
            const file = new File([blob], String('CROP_' + Date.now() + "_file.png"), { type: "image/png" });

            return console.log(base64);

            // 6.00.00
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

    function base64ToBlob(base64: string, mimeType: string) { //mimeType stands for Multipurpose Internet Mail Extensions Type. It specifies the type of file/data you are working with, such as: "image/png": For PNG image files. "image/jpeg": For JPEG image files. "text/plain": For plain text.
        const byteCharacters = atob(base64); /* The atob function decodes a Base64 string back into its original binary data, represented as a string of characters.
        Why It’s Needed: Base64 encoding converts binary data (like an image) into a text-based format, which is easier to transfer over text-based protocols (e.g., HTTP, JSON). To recreate the binary file, we need to decode it. */

        const byteArrayLength = byteCharacters.length;
        const byteNumbers = new Array(byteArrayLength); //  Preparing an Array to Store Binary Data
        /* What It Does:
        byteArrayLength: Determines the total number of bytes in the decoded data.
        byteNumbers: Initializes an array to store the numerical representation (0-255) of each byte.
        Why It’s Needed: The binary data decoded by atob is in the form of a string, but we need it as an array of numbers to create a Uint8Array later. */

        for (let i = 0; i < byteArrayLength; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i); //pushing each char into that array.
        } // [65, 66, 67,...]

        /* What It Does:
        Iterates through each character in the byteCharacters string.
        charCodeAt(i) returns the Unicode code point of the character at index i. For Base64-decoded data, this corresponds directly to the byte value (0–255).
        Why It’s Needed: This step converts the string representation of the binary data into an array of raw bytes. */

        const byteArray = new Uint8Array(byteNumbers)
        /* What It Does: Converts the array of numbers (byteNumbers) into a Uint8Array.
        A Uint8Array is a typed array specifically designed to store 8-bit unsigned integers (0–255).
        Why It’s Needed: The Blob constructor requires binary data to be passed as a TypedArray or an ArrayBuffer. A Uint8Array is one such format.
        */

        return new Blob([byteArray], { type: mimeType }) //A Blob (short for Binary Large Object) is a file-like object that represents raw binary data in JavaScript.
        /* What It Does: Creates a Blob object from the byteArray.
        The first argument ([byteArray]) specifies the binary data to include in the Blob.
        The second argument ({ type: mimeType }) sets the MIME type of the Blob (e.g., "image/png").
        Why It’s Needed: A Blob is a file-like object representing raw binary data. It can be directly used in APIs for file uploads or as a file input. */


        /* 
        Step-by-Step Workflow:
        Decode the Base64 String: Convert the Base64 string back into binary data (a string where each character represents a byte).
        Prepare a Byte Array: Create an array to store the byte values.
        Fill the Byte Array: Iterate through the decoded string, converting each character into its corresponding byte value.
        Create a Typed Array: Convert the array of byte values into a Uint8Array, which is optimized for handling binary data.
        Create a Blob: Use the Uint8Array and the MIME type to create a Blob object.
        */

        /* 
        Why Use Base64 Instead of Directly a Blob Initially?
        Base64 is text-based, so it’s easy to embed in JSON or transport via HTTP.
        However, Base64 is inefficient for storage or large-scale transfers due to its size overhead (about 33% larger than the raw binary).
        This function effectively "reverts" the inefficient Base64 format back into an efficient binary format (Blob).
        */



    }

    const aspects = {
        w: type === "case" ? RATIOS.case.w : RATIOS.card.w,
        h: type === "case" ? RATIOS.case.h : RATIOS.card.h
    }


    return (
        <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20 '>
            <div
                ref={containerRef}
                className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
                <div className={cn("relative bg-opacity-50 pointer-events-none  _3:58:00_ ",
                    `aspect-[${aspects.w}/${aspects.h}]`,
                    type === 'case' ? 'w-60' : "w-96"
                )}>
                    <AspectRatio
                        ref={phoneCaseRef}
                        ratio={aspects.w / aspects.h} //the ratio of the phone png we're gonna use
                        className={cn("pointer-events-none relative z-40 w-full font-sans text-white",
                            `aspect-[${aspects.w}/${aspects.h}]`
                        )}
                    >
                        <NextImage
                            alt="phone Image"
                            src={type === 'case' ? RATIOS.case.src : RATIOS.card.src}
                            className="pointer-events-none z-40 select-none"
                            fill
                        />

                        {/* CVV card security number */}
                        <input
                            type="text"
                            name="cvv"
                            id=""
                            className="z-50 bg-transparent h-8 pointer-events-auto focus:outline-none focus:border-none absolute "
                            style={{
                                right: 8,
                                top: caseDimensions.height / 3.7 + 'px',
                                width: caseDimensions.width / 7 + 'px',
                                height: caseDimensions.height / 8 + 'px'
                            }}
                            placeholder="XXXX"
                            autoComplete="off"


                            onChange={e => cardDataSetter(e.target.value, "cvv")}
                            value={cardData.cvv}
                            maxLength={4}
                        />

                        {/* card number */}
                        <input
                            type="text"
                            id=""
                            name="cardNumber"
                            className="z-50 bg-transparent h-8 pointer-events-auto focus:outline-none focus:border-none absolute "
                            style={{
                                left: 48 + 'px',
                                top: caseDimensions.height / 2.4 + 'px',
                                width: caseDimensions.width / 2 + 'px',
                                height: caseDimensions.height / 8 + 'px'
                            }}
                            placeholder="XXXX XXXX XXXX XXXX"
                            autoComplete="off"

                            onChange={e => cardDataSetter((e.target.value).replace(/\s+/g, ''), "cardNumber")} // this regex removes spaces
                            value={cardData.cardNumber.replace(/\d{4}(?=.)/g, '$& ')} // this regex adds spaces after every 4 numbers
                            maxLength={(Number(cardType.numberLength) + 3)}
                        />



                        {/* card expire date */}
                        <div
                            style={{
                                left: 48 + 'px',
                                top: caseDimensions.height / 1.7 + 'px',
                                width: caseDimensions.width / 2 + 'px',
                            }}
                            className=" absolute"
                        >
                            <span
                                style={{
                                    fontSize: '12px',
                                    textAlign: 'start',
                                    display: "block",
                                }}
                            >
                                Valid Thru
                            </span>
                            <input
                                type="text"
                                name="date"
                                id=""
                                className="z-50 w-full bg-transparent pointer-events-auto focus:outline-none focus:border-none text-white"
                                placeholder="MM/YY"
                                autoComplete="off"
                                maxLength={5}

                                onChange={e => cardDataSetter((e.target.value).replace(/\//g, ''), "expireDate")}
                                value={cardData.expireDate.length <= 2 ? cardData.expireDate : [cardData.expireDate.slice(0, 2), cardData.expireDate.slice(2, 4)].join('/')}
                            />

                            <input
                                type="text"
                                name="name"
                                id=""
                                className="z-50 mt-2 w-full bg-transparent pointer-events-auto focus:outline-none focus:border-none text-white"

                                placeholder="Your Name"
                                autoComplete="off"

                                onChange={e => cardDataSetter(e.target.value, "cardHolderName")}
                                value={cardData.cardHolderName}
                            />

                        </div>


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

                    className="absolute z-20 hover: border-[3px] border-primary !hidden"

                >
                    <div className="relative w-full h-full ">
                        {
                            envCheck ? <NextImage
                                src={imageUrl}
                                fill
                                alt="your Image"
                                className="pointer-events-none"

                            />
                                :
                                <img
                                    src={imageUrl}
                                    alt="your Image"
                                    className="pointer-events-none"
                                />
                        }
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
                        <h2>Customize your {type}</h2>

                        <div
                            className="w-full h-px bg-zinc-200 my-6 "
                        />

                        <div
                            className="relative mt-4 h-full flex flex-col justify-between "
                        >
                            <div className="flex flex-col gap-6 " >

                                {/* colors options */}
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


                                {/* Model options only for phones */}
                                <div className="relative flex flex-col gap-3 w-full ">
                                    {isCase && (
                                        <>
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
                                        </>)
                                    }

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
                                                        selectableOptions.slice(isCase ? 0 : 2, isCase ? 2 : 4).map((option) => (
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
                                                                                    <span className="block sm:inline whitespace-nowrap" >
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
                                isLoading={isPending}
                                loadingText='Saving'
                                disabled={isPending}

                                size={"sm"}
                                className="w-full"
                                onClick={() => saveConfig({
                                    configId,
                                    color: options.color.value,
                                    finish: options.finish.value,
                                    material: options.material.value,
                                    model: options.model.value
                                })}
                            >
                                Continue
                                <ArrowRight className="size-4 ml-1.5 inline " />
                            </Button>
                        </div>
                    </div>
                </div>

            </div >

        </div >
    )

}

{/*

these are the predicted dynamic classes of tailwind css.

<h1 className=
"
bg-zinc-900 
bg-blue-950 
bg-rose-950 
bg-sky-600
bg-green-700
bg-orange-800
border-zinc-900 
border-blue-950 
border-rose-950   
border-sky-600   
border-green-700   
border-orange-800   


hidden" 

/>

*/ }

// export default dynamic(() => Promise.resolve(DesignConfiscator), { ssr: false });
export default DesignConfiscator;

/* 

http://localhost:3000/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F93eec234-3f3d-4142-8ca4-dcfce6b59148-y7xt7f.png&w=1920&q=75
http://localhost:3000/_next/image?url=https%3A%2F%2F8yhbykdou7.ufs.sh%2Ff%2Ff4a96b2a-8b7d-42d0-b823-9dbf4a39d35a-y7xt7e.png&w=1920&q=75

*/