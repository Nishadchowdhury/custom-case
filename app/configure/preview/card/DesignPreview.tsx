"use client"

import Card from '@/components/custom/Card';
import LoginModal from '@/components/custom/LoginModal';
import { Button } from '@/components/ui/button';
import { BASE_PRICE, PRODUCTS_PRICES } from '@/config/products';
import { useToast } from '@/hooks/use-toast';
import { cn, formatePrice } from '@/lib/utils';
import { COLORS, FINISHES, MATERIALS, MODELS } from '@/validators/option-validator';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Configuration } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import { createCheckoutSessionCard } from '../actions';



interface pageProps {
    configuration: Configuration
};

const DesignPreview: React.FC<pageProps> = ({ configuration }) => {
    const { toast } = useToast()
    const router = useRouter()
    const { id } = configuration;
    const { user } = useKindeBrowserClient();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

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
        mutationFn: createCheckoutSessionCard,
        onSuccess: ({ url }) => {

            navigator.clipboard.writeText("378282246310005");

            toast({
                title: "A DEMO card number copied successfully!",
                duration: 2000,
                variant: "success"
            })

            if (url) setTimeout(() => router.push(url), 2000)
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

    const handleCheckAuth = () => {
        if (user) {
            // create the payment session
            createPaymentSession({ configId: id })
        } else {
            // need to logIn
            localStorage.setItem('configurationId', id);
            setIsLoginModalOpen(true);
        }
    }

    return <>
        <div
            aria-hidden
            className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center text-dynamic-white '
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

        <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

        <div className="mt-20  flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6  md:gap-x-8 lg:gap-x-12">
            <div className="md:col-span-4 lg:col-span-3  md:row-span-2 md:row-end-2">
                <Card
                    className={cn(`bg-${tw}`, "max-w-64 md:max-w-full rounded-2xl")}
                    imgSrc={configuration.croppedImageUrl!}
                />
            </div>

            <div className="mt-6 sm:col-span-9 md:row-end-1 ">
                <h3 className='text-3xl font-bold tracking-tight '> Your custom card</h3>
                <div className="mt-3 flex items-center gap-1.5 text-base ">
                    <Check className="h-4 w-4 text-green-500 " />
                    In stock and ready for shipment
                </div>
            </div>

            <div className="sm:col-span-12 md:col-span-9 text-base ">
                <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 dark:border-opacity-50 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
                    <div>
                        <p className='font-medium ' >Highlights</p>
                        <ol className='mt-3 text-dynamic-zinc opacity-70 list-disc list-inside'>
                            <li>Lite weight and stronger then topical </li>
                            <li>Anti scratching coating </li>
                            <li>Packaging made from recycled materials </li>
                            <li>5 years print warranty</li>
                        </ol>
                    </div>

                    <div>
                        <p className='font-medium ' >Materials </p>
                        <ol className='mt-3 text-dynamic-zinc opacity-70 list-disc list-inside' >
                            <li>High-quality, durable material</li>
                            <li>Easy to replace the chip </li>
                        </ol>
                    </div>
                </div>

                <div className='mt-8 ' >
                    <div className='bg-gray-50 dark:bg-gray-300  p-6 sm:rounded-lg sm:p-8 ' >
                        <div className='flow-root text-sm ' >
                            <div
                                className='flex items-center justify-between py-1 mt-2 '
                            >
                                <p className=' text-gray-900' >Base price</p>
                                <p className='font-medium text-gray-900'>
                                    {formatePrice((BASE_PRICE / 100))}
                                </p>
                            </div>

                            {finish === 'antique' ? (
                                <div className='flex items-center justify-between py-1 mt-2 ' >
                                    <p className='text-gray-600  ' >RAW antique finish </p>
                                    <p className='font-medium text-gray-900 ' >
                                        {formatePrice(PRODUCTS_PRICES.finish.antique / 100)}
                                    </p>
                                </div>
                            ) : null}

                            {material === 'stainlesssteel' ? (
                                <div className='flex items-center justify-between py-1 mt-2 ' >
                                    <p className='text-gray-600  ' >Stainless still material </p>
                                    <p className='font-medium text-gray-900 ' >
                                        {formatePrice(PRODUCTS_PRICES.material.stainlesssteel / 100)}
                                    </p>
                                </div>
                            ) : null}

                            <div className='my-2 h-px bg-gray-200' />

                            <div className="flex items-center justify-between py-2 text-gray-900" >
                                <p>Order total</p>
                                <p className='font-semibold text-gray-900'>
                                    {formatePrice(totalPrice / 100)}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className='mt-8 flex justify-end pb-12' >
                        <Button
                            onClick={handleCheckAuth}
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