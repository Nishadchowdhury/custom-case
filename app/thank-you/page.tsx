import { Suspense } from "react";
import ThankYou from "./ThankYou";

interface pageProps {

}
const page: React.FC<pageProps> = () => {


    return (
        <Suspense
        >
            <ThankYou />
        </Suspense>
    )

}

export default page;