import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ItemsOptions from "./ItemsOptionsDrawer";
import { ThemeSwitch } from "./ThemeSwitch";
// import { useState } from "react";

interface pageProps {

}
const Navbar: React.FC<pageProps> = async () => {


    const { getUser } = getKindeServerSession() // getting the user
    // const [isOptionDrawerOpen, setIsOptionDrawerOpen] = useState<boolean>(false);

    const user = await getUser();
    const isAdmin = user?.email === process.env.ADMIN_EMAIL;

    return (
        <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 dark:border-slate-500 bg-white/75 dark:bg-slate-900  backdrop-blur-lg transition-all' >


            <MaxWidthWrapper >
                <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-slate-500 ">
                    <Link
                        href="/"
                        className="flex z-40 font-semibold"
                    >
                        case <span className="text-green-600 ">cobra</span>
                    </Link>


                    <div className="h-full flex items-center space-x-4" >



                        {user
                            ?
                            <>
                                <Link href={"/api/auth/logout"}
                                    prefetch={false}
                                    className={buttonVariants({ // this function gives all the structure of a shadeCn ui's button
                                        size: "sm",
                                        variant: "ghost",
                                    })}
                                >
                                    Sign out
                                </Link>

                                {isAdmin ?
                                    <Link href={"/dashboard"}
                                        prefetch={false}
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })} >
                                        Dashboard ✨
                                    </Link> : null
                                }
                                <div className="h-8 w-px bg-zinc-200 hidden sm:block " />

                                <ItemsOptions
                                    IsFromServerComp={true}
                                    triggerText="Create Case"
                                />

                            </>
                            :
                            <>
                                <Link href={"/api/auth/register"}
                                    prefetch={false}
                                    className={buttonVariants({ // this function gives all the structure of a shadeCn ui's button
                                        size: "sm",
                                        variant: "ghost",
                                        className: "hidden sm:flex"
                                    })} >
                                    Sign up
                                </Link>

                                <Link href={"/api/auth/login"}
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost"
                                    })} >
                                    Log in
                                </Link>

                                <div className="h-8 w-px bg-zinc-200 hidden sm:block " />

                                <ItemsOptions
                                    IsFromServerComp={true}
                                    triggerText="Create Case"
                                />
                            </>
                        }

                        <ThemeSwitch />
                    </div>

                </div>
            </MaxWidthWrapper>
        </nav>
    )

}

export default Navbar;