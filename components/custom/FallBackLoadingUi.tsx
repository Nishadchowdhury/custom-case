import { Loader } from "lucide-react";

interface pageProps {
    message?: string;
}
const FallBackLoadingUi: React.FC<pageProps> = ({ message }) => {


    return (
        <div
            className="h-screen w-full bg-gray-200 flex items-center justify-center"
        >
            <h1
                className="text-4xl text-primary "
            >
                {message ? message : "Loading..."}
            </h1>
            <Loader className="animate-spin" />
        </div>
    )

}

export default FallBackLoadingUi;