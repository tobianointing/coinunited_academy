import { TextInput } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { GlossaryItem } from "../custom_interface";
import Link from "next/link";
import {useGlossary} from "../lib/hooks";


const GlossarySection = () => {
    const glossaries = useGlossary(state => state.glossaries);

    return (
        <div className="my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="p-6">
                <h3 className="text-6xl font-bold text-amber-600">350</h3>
                <p className="my-5 text-sm font-bold md:mb-10">That's how many terms we have in our glossary. Can you name them all?</p>
                <div className="flex justify-center md:justify-start text-sm md:w-3/4">
                    <form method="GET" action="/glossary" >
                        <TextInput type="search" name="query"  placeholder="search terms here.."  icon={MagnifyingGlassIcon}/>                    
                    </form>
                </div>
            </div>

            {
                glossaries?.map( (post, index) => <div key={index} className="p-4 bg-white shadow-lg rounded-xl">
                <span className="p-1 px-2 text-xs text-white bg-black rounded-md">Glossary</span>
                <br />
                <br />
                <span className="py-3 mb-3 text-2xl font-bold border-b-2 border-amber-600">{post?.title}</span>
                <div className="my-10 mb-12 text-sm md:text-[16px] font-bold">
                    <p>No Picture Blockchain & Crypto News</p>
                    <p>No Picture Blockchain & Crypto News</p>
                    <p>No Picture Blockchain & Crypto News</p>
                </div>
                <Link href={post?.uri}><a className="p-1 px-2 bg-gray-200 rounded-md">Full Definition {'>>'}</a></Link>    
                </div>)

            }
           
        </div>
        </div>
  )
}

export default GlossarySection;
