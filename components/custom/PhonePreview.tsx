"use client"

import { $Enums } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface pageProps {
    croppedImageUrl: string;
    color: $Enums.CaseColor
}
const PhonePreview: React.FC<pageProps> = ({ croppedImageUrl, color }) => {

    const ref = useRef<HTMLDivElement>(null);

    const [renderedDimensions, setRenderedDimensions] = useState<{ width: number; height: number; }>({
        width: 0,
        height: 0
    })

    const handleResize = () => {
        if (!ref.current) return
        const { width, height } = ref.current.getBoundingClientRect()
        setRenderedDimensions({ width, height })
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)

    }, [])



    let caseBackgroundColor = 'bg-zinc-950'
    if (color === 'blue') caseBackgroundColor = 'bg-blue-950'
    if (color === 'rose') caseBackgroundColor = 'bg-rose-950'

    console.log(renderedDimensions);
    return (
        <AspectRatio
            ref={ref}
            ratio={3000 / 2001} // this is the ration for the image that going to be used 
            className="relative"
        >
            <div
                className="absolute z-20 scale-[1.0352]  "
                // scale-[1.0352] = is experimental number by the developer

                style={{
                    left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
                    //(1216 / 12) generate the number = Measure the width of the phone and the background croppedImage and then do some experiment to get the actual size. (width of the phone and the offset of the image)
                    top: renderedDimensions.height / 6.22
                    //
                }}

            >
                <img
                    width={renderedDimensions.width / (3000 / 637)}
                    className={cn("phone-skew relative z-20 rounded-top-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]", caseBackgroundColor)}
                    src={croppedImageUrl}
                    alt="cropped image"
                />
            </div>
            <div className="relative h-full w-full z-40">
                <img
                    className="pointer-events-none size-full antialiased rounded-md"
                    src="/clearphone.png"
                    alt="phone" />
            </div>
        </AspectRatio>
    )

}

export default PhonePreview;