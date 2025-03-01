import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper'
import Steps from '@/components/custom/Steps'
import React, { ReactNode } from 'react'

export default async function layout({ children }: { children: ReactNode }) {

    return (
        <MaxWidthWrapper
            className='flex-1 flex flex-col '
        >
            <Steps />
            {children}
        </MaxWidthWrapper>)
}
