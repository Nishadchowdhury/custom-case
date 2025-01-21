'use client';

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./action";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import LoginModal from "@/components/custom/LoginModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhonePreview from "@/components/custom/PhonePreview";
import { formatePrice } from "@/lib/utils";

interface pageProps {

}
const ThankYou: React.FC<pageProps> = () => {


    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId") || ''
    const [open, setOpen] = useState(true)
    const { data, isError, error } = useQuery({
        queryKey: ['get-payment-status'],
        queryFn: async () => await getPaymentStatus({ orderId }),
        retry: 2,
        retryDelay: 2000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,

    })


    if (isError) {
        return (
            <div className="w-full mt-24 flex justify-center" >
                <div className="font-semibold text-2xl text-destructive">
                    <p className="underline" >{error.message && "You need to logged in to access the privileges of the page! "}</p>
                    <div className="flex justify-center">
                        <LoginModal
                            isOpen={open}
                            setIsOpen={setOpen}
                            message="Please login to continue."
                            RedirectURL={document.location.href}
                        />
                        <Button
                            className="mx-auto mt-12 inline-block"
                            variant={'default'}
                            onClick={() => setOpen(true)}
                        >
                            Go Login
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    if (data === undefined) { // it means the query is loading. There is other ways also.
        return (
            <div className="w-full mt-24 flex justify-center" >
                <div className="flex flex-col items-center gap-2 ">
                    <Loader2 className="size-8 animate-spin text-zinc-500" />
                    <h3 className="font-semibold text-xl " >Loading your order...</h3>
                    <p>This {"won't"} take long.</p>
                </div>
            </div>
        )
    }

    if (data === false) { // got the data but not confirmed that paid.
        return (
            <div className="w-full mt-24 flex justify-center" >
                <div className="flex flex-col items-center gap-2 ">
                    <Loader2 className="size-8 animate-spin text-zinc-500" />
                    <h3 className="font-semibold text-xl " >Verifying your payment...</h3>
                    <p>This might take a moment.</p>
                </div>
            </div>
        )
    }

    const { configuration, BillingAddress, ShippingAddress, amount } = data;
    const { color } = configuration;



    return (
        <div className='bg-white ' >
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="max-w-xl ">
                    <p className="text-base font-medium text-primary" >Thank you!</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl" >Your case is on the way!</h1>
                    <p className="mt-2 text-base text-zinc-500" >{"We've"} received your order and are now</p>

                    <div className="mt-12 text-sm font-medium">
                        <p className="text-zinc-900" >Order number:- </p>
                        <p className="mt-2 text-zinc-500" >{orderId}</p>
                    </div>

                </div>

                <div className="mt-10 border-t border-zinc-200 ">
                    <div className="mt-10 flex flex-auto flex-col" >
                        <h4 className="font-semibold text-zinc-900" >You made a grate choice!</h4>
                        <p className="mt-2 text-sm text-zinc-600" >
                            We at CaseCobra believe that a phone case doesn't  only need to look good, but also last you for the years to come. We offer a 5-year print guarantee: If your case isn't highest quality, we'll replace it for Free.
                        </p>
                    </div>
                </div>

                <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl " >
                    <PhonePreview
                        croppedImageUrl={configuration.croppedImageUrl!}
                        color={configuration.color!}
                    />
                </div>


                <div>
                    <div className="grid grid-cols-2 gap-x-6 py-10 text-sm" >
                        <div>
                            <p className="font-medium text-gray-900 " >Shipping address</p>
                            <div className="mt-2 text-zinc-700 " >
                                <address className="not-italic" >
                                    <span className="block">{ShippingAddress?.name}</span>
                                    <span className="block">{ShippingAddress?.street}</span>
                                    <span className="block">{ShippingAddress?.postalCode} - {ShippingAddress?.city}</span>
                                </address>
                            </div>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900 " >Billing address</p>
                            <div className="mt-2 text-zinc-700 " >
                                <address className="not-italic" >
                                    <span className="block">{BillingAddress?.name}</span>
                                    <span className="block">{BillingAddress?.street}</span>
                                    <span className="block">{BillingAddress?.postalCode} - {BillingAddress?.city}</span>
                                </address>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm" >
                        <div className="">
                            <p className="font-medium text-zinc-900 ">Payment status</p>
                            <p className="mt-2 text-zinc-700 ">Paid</p>
                        </div>

                        <div className="">
                            <p className="font-medium text-zinc-900 ">Shipping Method</p>
                            <p className="mt-2 text-zinc-700 ">DHL, Takes up to 3 working days</p>
                        </div>
                    </div>

                </div>

                <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm  ">
                    <div className="flex justify-between " >
                        <p className="font-medium text-zinc-900" >Subtotal</p>
                        <p className=" text-zinc-700" > {formatePrice(amount)} </p>
                    </div>
                    <div className="flex justify-between " >
                        <p className="font-medium text-zinc-900" >Shipping</p>
                        <p className=" text-zinc-700" > {formatePrice(0)} </p>
                    </div>
                    <div className="flex justify-between " >
                        <p className="font-medium text-zinc-900" >Total</p>
                        <p className=" text-zinc-700" > {formatePrice(amount + 0)} </p>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default ThankYou;