import { db } from "@/app/db";
import { notFound } from "next/navigation";
import DesignConfiscator from "./DesignConfiscator";

interface pageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}
const page: React.FC<pageProps> = async ({ searchParams }) => {
    //make db call from the server through the server component.
    const { id } = searchParams;

    if (!id || typeof id !== 'string') {
        return notFound();
    }

    const configuration = await db.configuration.findUnique({
        where: {
            id,
        },
    })

    if (!configuration) {
        return notFound();
    }

    const { imageUrl, width, height } = configuration;

    return <DesignConfiscator configId={configuration.id} imageDimensions={{ width, height }} imageUrl={imageUrl} />

}

export default page;
