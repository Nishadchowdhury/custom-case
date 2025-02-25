
interface pageProps {

}
const HandleComponent: React.FC<any> = ({ ...props }) => {


    return (
        <div
            {...props}
            className="w-5 h-5 rounded-full shadow border bg-white border-zinc-200 transition hover:bg-primary "
        />
    )

}

export default HandleComponent;