"use client"

import { cn } from "@/lib/utils";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname, useSearchParams } from "next/navigation";


const Steps: React.FC = () => {

    const pathname = usePathname();

    const type = pathname.split('/').pop(); //after splitting the text getting the last item


    const STEPS = [
        {
            name: "Step 1: Add image",
            description: `Choose an image for your ${type}`,
            url: `/upload/${type}`
        },
        {
            name: "Step 2: Customize design",
            description: `Make the ${type} yours`,
            url: `/design/${type}`
        },
        {
            name: "Step 3: Summery",
            description: "Review your final design",
            url: `/preview/${type}`
        },
    ]



    return <ol className="rounded-md bg-white dark:bg-secondary bg-opacity-75 dark:bg-opacity-100 lg:flex lg:rounded-none lg:border-1 lg:border-x dark:border-0 lg:border-gray-200 text-dynamic-white ">
        {

            STEPS.map((step, i) => {
                const isCurrent = pathname.endsWith(step.url)
                const isCompleted = STEPS.slice(i + 1).some((step) => pathname.endsWith(step.url))
                const imgPath = `/snake-${i + 1}.png`

                return <li
                    key={i}
                    className="relative overflow-hidden lg:flex-1 "
                >
                    <div>
                        <span className={cn('absolute left-0  h-full w-1 bg-zinc-400 dark:bg-zinc-300 lg:bottom-0 lg:h-1 lg:w-full ', {
                            'bg-zinc-700 dark:bg-zinc-400': isCurrent,
                            'bg-primary': isCompleted,
                            "lg:rounded-bl-sm": (i === 0),
                            "lg:rounded-br-sm": (i === 2),
                        })}
                            aria-hidden
                        />

                        <span
                            className={cn(i !== 0 ? 'lg:pl-9 ' : "", "flex items-center px-6 py-4 text-sm font-medium ")}
                        >
                            <span className="flex-shrink-0" >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imgPath}
                                    alt="img"
                                    className={cn('flex h-20 w-20 object-contain select-none',
                                        {
                                            'border-none': isCompleted,
                                            'border-zinc-700': isCurrent
                                        }
                                    )}
                                />
                            </span>

                            <span
                                className="ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center"
                            >
                                <span className={cn('text-sm font-semibold text-dynamic-white opacity-70', {
                                    'text-primary': isCompleted,
                                    'opacity-100 ': isCurrent
                                })}>
                                    {step.name}
                                </span>
                                <span
                                    className="text-sm text-dynamic-zinc "
                                >
                                    {step.description}
                                </span>
                            </span>
                        </span>

                        {/* separator */}
                        {i !== 0
                            ?
                            <div
                                className='absolute inset-0 hidden w-3 lg:block '
                            >
                                <svg
                                    className='h-full w-full text-gray-300 dark:text-zinc-600 '
                                    viewBox='0 0 12 82'
                                    fill='none'
                                    preserveAspectRatio='none'>
                                    <path
                                        d='M0.5 0V31L10.5 41L0.5 51V82'
                                        stroke='currentcolor'
                                        vectorEffect='non-scaling-stroke'
                                    />
                                </svg>
                            </div>
                            :
                            null
                        }

                    </div>
                </li>
            })
        }
    </ol>

}

export default Steps;

