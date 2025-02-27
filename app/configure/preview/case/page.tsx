import { db } from "@/app/db";
import { notFound } from "next/navigation";
import DesignPreview from "./DesignPreview";
import { Suspense } from "react";
import FallBackLoadingUi from "../../../../components/custom/FallBackLoadingUi";

interface pageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
const Page: React.FC<pageProps> = async ({ searchParams }) => {

    const { id } = searchParams;
    if (!id || typeof id !== 'string') {
        return notFound()
    }

    const configuration = await db.configuration.findUnique({
        where: { id }
    })

    if (!configuration) {
        return notFound()
    }



    return <DesignPreview configuration={configuration} />

}

export default Page;