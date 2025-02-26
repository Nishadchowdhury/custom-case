import { Suspense } from "react";
import FallBackLoadingUi from "../../components/custom/FallBackLoadingUi";
import ThankYou from "./ThankYou";


const page: React.FC = () => {



    return (
        <Suspense
            fallback={<FallBackLoadingUi message={"Loading..."} />}
        >
            <ThankYou />
        </Suspense>
    )

}

export default page;