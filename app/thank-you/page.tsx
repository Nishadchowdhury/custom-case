import { Suspense } from "react";
import ThankYou from "./ThankYou";
import { Loader } from "lucide-react";

interface pageProps {

}
const page: React.FC<pageProps> = () => {


    return (
        <Suspense
            fallback={<div className="h-screen w-full bg-gray-200 flex items-center justify-center" >
                <h1 className="text-4xl text-primary " >Loading...</h1> <Loader className="animate-spin" /> </div>}
        >
            <ThankYou />
        </Suspense>
    )

}

export default page;