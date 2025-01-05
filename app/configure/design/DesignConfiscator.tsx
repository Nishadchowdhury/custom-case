'use client'
import HandleComponent from "@/components/custom/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatePrice } from "@/lib/utils";
import NextImage from 'next/image'
import { Rnd } from 'react-rnd'
import { RadioGroup } from '@headlessui/react'
import { useState } from "react";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

interface pageProps {
    configId: string;
    imageUrl: string;
    imageDimensions: {
        width: number;
        height: number;
    }

}

const DesignConfiscator: React.FC<pageProps> = ({ configId, imageUrl, imageDimensions }) => {


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

    return (
        <div className='relative mt-20 grid grid-cols-3 mb-20 pb-20 ' >
            <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831] _3:58:00_  ">
                    <AspectRatio
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

            <div className="h-[37.5rem] flex flex-col bg-white ">
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
                    
                </div>

            </div >

        </div >
    )

}

{/* <h1 className="bg-zinc-900 border-zinc-900 bg-blue-950 border-blue-950 bg-rose-950 border-rose-950 hidden" /> */ }

export default DesignConfiscator;