import Link from "next/link";
const Error404 = () => {
    return (
        <div className="h-[20rem] flex items-center flex-col space-y-6 justify-center">
            <h1 className="text-5xl text-center text-bold">Ooops!  Seems you are lost</h1>
            <Link href="/"><a className="underline text-site-amber">Take me Home</a></Link> 
        </div>
    );
}

export default Error404