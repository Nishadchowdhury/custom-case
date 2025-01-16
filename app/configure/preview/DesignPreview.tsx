"use client"

import Phone from '@/components/custom/Phone';
import { Button } from '@/components/ui/button';
import { BASE_PRICE, PRODUCTS_PRICES } from '@/config/products';
import { cn, formatePrice } from '@/lib/utils';
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/option-validator';
import { Configuration } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { createCheckoutSession } from './actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface pageProps {
    configuration: Configuration
}
const DesignPreview: React.FC<pageProps> = ({ configuration }) => {
    const { toast } = useToast()
    const router = useRouter()
    const [showConfetti, setShowConfetti] = useState(false);
    useEffect(() => {
        setShowConfetti(true)
    }, []);


    const { color, model, finish, material } = configuration;
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw

    const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!
    const finishPrice = FINISHES.options.find(({ value }) => value === finish)?.price!
    const materialPrice = MATERIALS.options.find(({ value }) => value === material)?.price!
    const totalPrice = (BASE_PRICE + ((finishPrice || 0) + (materialPrice || 0)))

    const { mutate: createPaymentSession, isPending } = useMutation({
        mutationKey: ['get-checkout-session'],
        mutationFn: createCheckoutSession,
        onSuccess: ({ url }) => {
            if (url) router.push(url)
            else throw new Error("Unable to retrieve payment URL.")
        },
        onError: () => {
            toast({
                title: "something went wrong",
                description: "There was an error please try again.",
                variant: "destructive",
            })
        }
    })


    return <>
        <div
            aria-hidden
            className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center '
        >
            <Confetti
                active={showConfetti}
                config={{
                    elementCount: 200,
                    spread: 90,
                    dragFriction: 0.11,
                    duration: 4500,
                }}
            />
        </div>

        <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6  md:gap-x-8 lg:gap-x-12">
            <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2 ">
                <Phone
                    className={cn(`bg-${tw} scale-50 md:scale-100`)}
                    imgSrc={configuration.croppedImageUrl!}
                />
            </div>

            <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1 ">
                <h3 className='text-3xl font-bold tracking-tight text-gray-900'> Your {modelLabel} Case</h3>
                <div className="mt-3 flex items-center gap-1.5 text-base ">
                    <Check className="h-4 w-4 text-green-500 " />
                    In stock and ready for shipment
                </div>
            </div>

            <div className="sm:col-span-12 md:col-span-9 text-base ">
                <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
                    <div>
                        <p className='font-medium text-zinc-950' >Highlights</p>
                        <ol className='mt-3 text-zinc-700 list-disc list-inside '>
                            <li>Wireless charging compatible </li>
                            <li>TPU shock absorption </li>
                            <li>Packaging made from recycled materials </li>
                            <li>5 years print warranty</li>
                        </ol>
                    </div>
                    <div>
                        <p className='font-medium text-zinc-950 ' >Materials </p>
                        <ol className='mt-3 text-zinc-700 list-disc list-inside' >
                            <li>High-quality, durable material</li>
                            <li>Scratch and fingerprint resistant coating </li>
                        </ol>
                    </div>
                </div>
                <div className='mt-8' >
                    <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8 ' >
                        <div className='flow-root text-sm ' >
                            <div
                                className='flex items-center justify-between py-1 mt-2 '
                            >
                                <p className='text-gray-600 ' >Base price</p>
                                <p className='font-medium text-gray-900'>
                                    {formatePrice((BASE_PRICE / 100))}
                                </p>
                            </div>

                            {finish === 'textured' ? (
                                <div className='flex items-center justify-between py-1 mt-2 ' >
                                    <p className='text-gray-600  ' >Textured finish </p>
                                    <p className='font-medium text-gray-900 ' >
                                        {formatePrice(PRODUCTS_PRICES.finish.textured / 100)}
                                    </p>
                                </div>
                            ) : null}

                            {material === 'polycarbonate' ? (
                                <div className='flex items-center justify-between py-1 mt-2 ' >
                                    <p className='text-gray-600  ' >Soft polycarbonate material </p>
                                    <p className='font-medium text-gray-900 ' >
                                        {formatePrice(PRODUCTS_PRICES.finish.textured / 100)}
                                    </p>
                                </div>
                            ) : null}

                            <div className='my-2 h-px bg-gray-200' />

                            <div className="flex items-center justify-between py-2" >
                                <p>Order total</p>
                                <p className='font-semibold text-gray-900'>
                                    {formatePrice(totalPrice / 100)}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className='mt-8 flex justify-end pb-12' >
                        <Button
                            onClick={() => createPaymentSession({ configId: configuration.id })}
                            isLoading={isPending}
                            loadingText='loading'
                            disabled={isPending}
                            className='px-4 sm:px-6 lg:px-8'>
                            Check out <ArrowRight className='size-4 ml-1.5 inline' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

    </>

}

export default DesignPreview;