import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "../ui/button";

interface pageProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    message?: string;
    RedirectURL?: string;
}
const LoginModal: React.FC<pageProps> = ({ isOpen, setIsOpen, message, RedirectURL }) => {


    return <Dialog onOpenChange={setIsOpen} open={isOpen}>
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


                <DialogTitle
                    className="text-3xl text-center font-bold tracking-tight text-gray-900 "
                >
                    Login to continue
                </DialogTitle>
                <DialogDescription className="text-base text-center py-2  ">
                    <span className="font-medium text-zinc-900 ">
                        Your configuration was saved!
                    </span>{' '}
                    {message ? message : "Please login or create an account to complete your purchase."}

                </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6  " >

                <LoginLink
                    className={buttonVariants({ variant: "outline" })}
                    postLoginRedirectURL={RedirectURL || process.env.KINDE_POST_LOGIN_REDIRECT_URL}
                >
                    Log In
                </LoginLink>

                <RegisterLink
                    className={buttonVariants({ variant: "default" })}
                    postLoginRedirectURL={RedirectURL || process.env.KINDE_POST_LOGIN_REDIRECT_URL}
                >
                    Sign Up
                </RegisterLink>

            </div>

        </DialogContent>
    </Dialog>

}

export default LoginModal;