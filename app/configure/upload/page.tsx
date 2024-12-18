"use client"

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Image, Loader2, MousePointer, MousePointerSquareDashed } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import Dropzone, { FileRejection } from 'react-dropzone'



export default function Page() {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const onDropRejected = () => {
        console.log("onDropRejected");
    }
    const onDropAccepted = () => {
        console.log("onDropAccepted");
    }

    const isUploading = false;
    const [isPending, startTransitionF] = useTransition();

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
                                className='h-full w-full flex-1 flex flex-col items-center justify-center select-none'
                                {...getRootProps()} // it will take whatever the function returns as property and pass it into this div. so we shouldn't be worry about any of the properties that this div needs to take in order to be dropzone functionality to work handle by the library.

                            >
                                <input className='' {...getInputProps()} />
                                {isDragOver ? (
                                    <MousePointerSquareDashed className='size-6 text-zinc-500 mb-2 ' />
                                ) : (isUploading || isPending) ? (
                                    <Loader2 className='animate-spin size-6 text-zinc-500 mb-2 ' />
                                ) : (
                                    <Image className='size-6 text-zinc-500 mb-2 ' />
                                )}
                                <div className='flex flex-col justify-center mb-2 text-sm text-zinc-700 ' >
                                    {isUploading
                                        ? <div className='flex flex-col items-center '>
                                            <p>Uploading<span className='animate-pulse'>...</span> </p>
                                            <Progress
                                                className='mt-2 w-40 h-2 bg-gray-300   '
                                                value={uploadProgress}
                                            />

                                        </div>
                                        : isPending
                                            ? <div className='flex flex-col items-center ' >
                                                <p>Redirecting, Please wait... </p>
                                            </div>
                                            : isDragOver
                                                ? <p>
                                                    <span className='font-semibold ' >Drop file</span> to upload
                                                </p>
                                                : <p>
                                                    <span className='font-semibold ' >Click to upload</span> or drag and drop
                                                </p>
                                    }
                                </div>

                                {isPending? null : <p className='text-xs text-zinc-500'>
                                    PNG, JPG, JPEG </p>}
                            </div>
                        )
                    }
                </Dropzone>
            </div>

        </div>
    )
}
