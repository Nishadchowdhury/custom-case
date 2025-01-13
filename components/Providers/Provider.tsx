'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface pageProps {
    children: ReactNode
}

const client = new QueryClient()
const Provider: React.FC<pageProps> = ({ children }) => {


    return <QueryClientProvider client={client} >{children}</QueryClientProvider>

}

export default Provider;