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
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import Link from "next/link";



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
                    className: cn("hidden sm:flex items-center gap-1", className)
                })}
                onClick={handleClose}
            >
                {triggerText}
                <ArrowRight className="ml-1.5 size-5" />
            </Button>
        </DrawerTrigger>

        <DrawerContent className="" >
            <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>

            <div className="mx-auto flex gap-4" >
                <Link href="/"
                    className={buttonVariants({
                        variant: "ghost",
                        className: "!size-48  border-primary/40"
                    })}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        className="text-primary"
                    >
                        <path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96v32h576V96c0-35.3-28.7-64-64-64zm512 192H0v192c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16s7.2-16 16-16m112 16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16" />
                    </svg>


                </Link>

                <Link href="/"
                    className={buttonVariants({
                        variant: "ghost",
                        className: "!size-48  border-primary/40"
                    })}
                >

                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="200" width="200" xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                    > <path d="M16.73 2.065H7.27a2.386 2.386 0 0 0-2.24 2.5v14.87a2.386 2.386 0 0 0 2.24 2.5h9.46a2.386 2.386 0 0 0 2.24-2.5V4.565a2.386 2.386 0 0 0-2.24-2.5Zm1.24 17.37a1.39 1.39 0 0 1-1.24 1.5H7.27a1.39 1.39 0 0 1-1.24-1.5V4.565a1.39 1.39 0 0 1 1.24-1.5H8.8v.51a1 1 0 0 0 1 1h4.4a1 1 0 0 0 1-1v-.51h1.53a1.39 1.39 0 0 1 1.24 1.5Z" stroke="none" />
                        <path d="M10 18.934h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0 0 1Z" stroke="none" />
                    </svg>


                </Link>
            </div>

            <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>


}

export default ItemsOptions;