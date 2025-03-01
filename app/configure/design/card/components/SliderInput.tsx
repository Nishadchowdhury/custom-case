'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { SlidingNumber } from '../../../../../components/ui/sliding-number';
import { Slider } from "@/components/ui/slider"
import { Button, buttonVariants } from "@/components/ui/button";
import { RotateCcw } from 'lucide-react';

interface pageProps {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    defaultValue: number;
    max?: number;
    message?: string;
}

export function SliderInput({ value, setValue, defaultValue, max, message }: pageProps) {

    return (
        <div className='flex flex-col items-start gap-0'>
            <div className='flex items-center '>{message && message} <div className='flex items-center ml-2' > <SlidingNumber value={value} />%</div> </div>

            <div className='w-full grid grid-flow-row grid-cols-10  ' >

                <Slider
                    defaultValue={[defaultValue || value]}
                    value={[value]}
                    max={max || 100}
                    min={0}
                    step={1}
                    onValueChange={(e) => setValue(e[0])}
                    className='col-span-9  '
                />

                <div className={buttonVariants({
                    className: 'col-span-1 size-5',
                    size: 'icon'
                })} >

                </div>

                <Button
                    size={"icon"}
                    variant={"ghost"}
                    className='col-span-1 size-5'

                    onClick={() => setValue(defaultValue!)}
                    disabled={defaultValue === value}
                >
                    <RotateCcw className='size-4' />

                </Button>

            </div>



        </div>
    );
}
