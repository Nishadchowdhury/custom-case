import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface pageProps extends HTMLAttributes<HTMLDivElement> /*This will suggest all HTML div attribute to the custom component when we import it to other component. */ {
    imgSrc: string;
    dark?: boolean;
}
const Phone: React.FC<pageProps> = ({ className, imgSrc, dark = false, ...props }) => {


    return (
        <div
            className={cn('relative pointer-events-none z-50 overflow-hidden', className)}
            {...props}
        >
            <img
                src={dark ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
                alt="phone image"
                className="pointer-events-none z-50 select-none"
            />

            <div
                className="absolute -z-10 inset-0"
            >

                <img
                    className="object-cover select-none"
                    src={imgSrc}
                    alt="overlay phone image"

                />
            </div>
        </div>
    )

}

export default Phone;