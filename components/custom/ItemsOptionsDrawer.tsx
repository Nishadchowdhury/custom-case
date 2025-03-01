"use client"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowRight, Cross } from "lucide-react";
import { cn } from "../../lib/utils";
import Link from "next/link";
import dynamic from "next/dynamic";



interface pageProps extends Pick<ButtonProps, "size"> {
    isOpen?: boolean;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
    IsFromServerComp: boolean;
    triggerText: string;
    className?: string;
}


const ItemsOptions: React.FC<pageProps> = ({ isOpen, setIsOpen, IsFromServerComp, triggerText, className, size = "sm" }) => {


    const [isOpenState, setIsOpenState] = useState(false)


    function handleClose() {

        if (IsFromServerComp) {
            setIsOpenState(!isOpenState)
        }
        // else {
        //     setIsOpen && setIsOpen(!isOpen)
        // }

    }



    return <Drawer
        open={isOpen || isOpenState}
        onClose={handleClose}

    >
        <DrawerTrigger>
            <Button
                className={buttonVariants({
                    size: size,
                    className: cn(" sm:flex items-center gap-1", className)
                })}
                onClick={handleClose}
            >
                <span className={(size === "sm" ? "sm:block hidden" : "")} >{triggerText}</span>

                <ArrowRight className={cn("ml-1.5 size-5", (size === "sm" ? "hidden sm:block" : ""))} />

                <Cross className={cn("block sm:hidden size-5", (size === "sm" ? "" : "hidden"))} />

            </Button>
        </DrawerTrigger>

        <DrawerContent className="" >
            <DrawerHeader className="flex items-center flex-col" >
                <DrawerTitle>Choose what you want to create</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>

            <div className="mx-auto my-5 flex gap-4  " >
                <div
                    onClick={handleClose}
                >
                    <Link href={"/configure/upload?type=card"}
                        className={buttonVariants({
                            variant: "ghost",
                            className: "md:!size-48 !size-32 hover:bg-primary/10 border border-primary/40 flex flex-col"
                        })}
                        onClick={handleClose}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="200" width="200"
                            xmlns="http://www.w3.org/2000/svg"

                            className="text-primary"
                        >
                            <rect
                                width="416"
                                height="320"
                                x="48"
                                y="96"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="26"
                                rx="56"
                                ry="56"

                            />
                            <path
                                fill="none"
                                strokeLinejoin="round"
                                strokeWidth="30"
                                d="M48 192h416M128 300h48v20h-48z"
                            />
                        </svg>
                        <span className="text-primary" >
                            Create a card
                        </span>

                    </Link>
                </div>

                <div
                    onClick={handleClose}
                >
                    <Link href={"/configure/upload?type=case"}
                        className={buttonVariants({
                            variant: "ghost",
                            className: "md:!size-48 !size-32 hover:bg-primary/10 border border-primary/40 flex flex-col"
                        })}

                    >

                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200" width="200" xmlns="http://www.w3.org/2000/svg"
                            className="text-primary"
                        > <path d="M16.73 2.065H7.27a2.386 2.386 0 0 0-2.24 2.5v14.87a2.386 2.386 0 0 0 2.24 2.5h9.46a2.386 2.386 0 0 0 2.24-2.5V4.565a2.386 2.386 0 0 0-2.24-2.5Zm1.24 17.37a1.39 1.39 0 0 1-1.24 1.5H7.27a1.39 1.39 0 0 1-1.24-1.5V4.565a1.39 1.39 0 0 1 1.24-1.5H8.8v.51a1 1 0 0 0 1 1h4.4a1 1 0 0 0 1-1v-.51h1.53a1.39 1.39 0 0 1 1.24 1.5Z" stroke="none" />
                            <path d="M10 18.934h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1Z" stroke="none" />
                        </svg>


                        <span className="text-primary" >
                            Create a case
                        </span>

                    </Link>
                </div>
            </div>
            <DrawerFooter>

            </DrawerFooter>

        </DrawerContent>

    </Drawer>


}

export default dynamic(() => Promise.resolve(ItemsOptions), { ssr: false });