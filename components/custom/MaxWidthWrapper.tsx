import { cn } from "@/lib/utils";

interface pageProps {
    className?: string;
    children: React.ReactNode;
}
const MaxWidthWrapper: React.FC<pageProps> = ({ className, children }) => {


    return (
        <div className={cn("h-full mx-auto w-full overflow-hidden sm:overflow-visible sm:max-w-screen-xl px-2.5 md:px-20 ", className)} >
            {children}
        </div>
    )

}

export default MaxWidthWrapper;