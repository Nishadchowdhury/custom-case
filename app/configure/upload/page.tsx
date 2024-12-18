"use client"

import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'



export default function Page() {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)

    const onDropRejected = () => {
        console.log("onDropRejected");
    }
    const onDropAccepted = () => {
        console.log("onDropAccepted");
    }

    return (
        <div className={cn('relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center', {
            "ring-blue-900/25 bg-blue-900/10": isDragOver
        })} >

            <div className='relative flex flex-1 flex-col items-center justify-center w-full '>
                <Dropzone
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        "image/png": [".png"],
                        "image/jpg": [".jpg"],
                        "image/jpeg": [".jpeg"]
                    }}

                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}

                >
                    {
                        ({ getRootProps, getInputProps }) => (
                            <div
                                className='h-full w-full flex-1 flex flex-col items-center justify-center '
                                {...getRootProps()} // it will take whatever the function returns as property and pass it into this div. so we shouldn't be worry about any of the properties that this div needs to take in order to be dropzone functionality to work handle by the library.

                            >
                                <input className='' {...getInputProps()} />
                            </div>
                        )
                    }
                </Dropzone>
            </div>

        </div>
    )
}
