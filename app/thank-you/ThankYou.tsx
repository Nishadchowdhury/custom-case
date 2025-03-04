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
import Card from "../../components/custom/Card";
import { COLORS, FINISHES, MATERIALS } from "../../validators/option-validator";
import { BASE_PRICE } from "../../config/products";

interface pageProps {

}
const ThankYou: React.FC<pageProps> = () => {


    const searchParams = useSearchParams()
    const { orderId, type } = { orderId: searchParams.get("orderId") || "", type: searchParams.get("type") || "" }



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
                    <p className="underline" >{error?.message && "You need to logged in to access the privileges of the page! "}</p>
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
    const colorObject = COLORS.find(color_ => color_.value === color)

    const finishPrice = FINISHES.options.find(({ value }) => value === configuration.finish)?.price!
    const materialPrice = MATERIALS.options.find(({ value }) => value === configuration.material)?.price!
    const totalPrice = (BASE_PRICE + ((finishPrice || 0) + (materialPrice || 0))) / 100

    return (
        <div className='bg-white dark:bg-inherit ' >
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="max-w-xl ">
                    <p className="text-base font-medium text-primary" >Thank you!</p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl" >Your {type} is on the way!</h1>
                    <p className="mt-2 text-base text-zinc-500" >{"We've"} received your order and are now</p>

                    <div className="mt-12 text-sm font-medium">
                        <p className="text-dynamic-white" >Order number:- </p>
                        <p className="mt-2 text-zinc-500" >{orderId}</p>
                    </div>

                </div>

                <div className="mt-10 border-t border-zinc-200 dark:border-opacity-50 ">
                    <div className="mt-10 flex flex-auto flex-col" >
                        <h4 className="font-semibold text-dynamic-white" >You made a grate choice!</h4>
                        <p className="mt-2 text-sm text-zinc-600" >
                            We at CaseCobra believe that <strong>{type === "case" ? "a phone case" : "an ATM card"}</strong> doesn't only need to look good, but also last you for the years to come. We offer a 5-year print guarantee: If your {type} isn't highest quality, <strong>we'll replace it for Free</strong>.
                        </p>
                    </div>
                </div>

                <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl " >
                    {type === "case"
                        ?
                        <PhonePreview
                            croppedImageUrl={configuration.croppedImageUrl!}
                            color={configuration.color!}
                        />
                        :
                        <Card
                            imgSrc={configuration.croppedImageUrl || ""}
                            className={`bg-${colorObject?.tw}`}
                        />
                    }
                </div>


                <div>
                    <div className="grid grid-cols-2 gap-x-6 py-10 text-sm" >
                        <div>
                            <p className="font-medium text-dynamic-white" >Shipping address</p>
                            <div className="mt-2 text-dynamic-zinc " >
                                <address className="not-italic" >
                                    <span className="block">{ShippingAddress?.name}</span>
                                    <span className="block">{ShippingAddress?.street}</span>
                                    <span className="block">{ShippingAddress?.postalCode} - {ShippingAddress?.city}</span>
                                </address>
                            </div>
                        </div>

                        <div>
                            <p className="font-medium text-dynamic-white " >Billing address</p>
                            <div className="mt-2 text-dynamic-zinc" >
                                <address className="not-italic" >
                                    <span className="block ">{BillingAddress?.name}</span>
                                    <span className="block ">{BillingAddress?.street}</span>
                                    <span className="block ">{BillingAddress?.postalCode} - {BillingAddress?.city}</span>
                                </address>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 dark:border-opacity-50 py-10 text-sm" >
                        <div className="">
                            <p className="font-medium text-dynamic-white ">Payment status</p>
                            <p className="mt-2 text-dynamic-zinc ">Paid</p>
                        </div>

                        <div className="">
                            <p className="font-medium text-dynamic-white ">Shipping Method</p>
                            <p className="mt-2 text-dynamic-zinc ">DHL, Takes up to 3 working days</p>
                        </div>
                    </div>

                </div>

                <div className="space-y-6 border-t border-zinc-200 dark:border-opacity-50 pt-10 text-sm text-dynamic-white  ">
                    <div className="flex justify-between " >
                        <p className="font-medium " >Subtotal</p>
                        <p className="  text-dynamic-zinc" > {formatePrice(totalPrice)} </p>
                    </div>
                    <div className="flex justify-between " >
                        <p className="font-medium " >Shipping</p>
                        <p className="  text-dynamic-zinc" > {formatePrice(0)} </p>
                    </div>
                    <div className="flex justify-between " >
                        <p className="font-medium " >Total</p>
                        <p className="  text-dynamic-zinc" > {formatePrice(totalPrice)} </p>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default ThankYou;