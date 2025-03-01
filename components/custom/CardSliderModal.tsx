import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "../ui/button";
import { SlidingNumber } from "../ui/sliding-number";

// import Autoplay from "embla-carousel-autoplay"

const CardSliderModal: React.FC = () => {
    const TWEEN_FACTOR_BASE = 0.84
    const [n, setN] = useState(0)

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

                <SlidingNumber value={n} />

                <input type="number" onChange={e => setN(Number(e.target.value))} ></input>
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


            </div>

        </DialogContent>
    </Dialog>

}

export default CardSliderModal;