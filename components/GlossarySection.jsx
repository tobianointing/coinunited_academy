import { TextInput } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


const GlossarySection = () => {
    
  return (
    <div className="my-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="p-6">
                <h3 className="text-amber-600 font-bold text-6xl">350</h3>
                <p className="text-sm font-bold my-5 md:mb-10">That's how many terms we have in our glossary. Can you name them all?</p>
                <div className="md:w-3/4 flex justify-center text-sm">
                    <TextInput type="search"  placeholder="search terms here.."  icon={MagnifyingGlassIcon}/>                    
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-lg p-4">
                <span className="text-xs p-1 px-2 bg-black text-white rounded-md">Glossary</span>
                <br />
                <br />
                <span className="text-2xl mb-3 py-3 font-bold border-b-2 border-amber-600">Meme Coins</span>
                <div className="my-10 mb-12 font-bold text-sm">
                    <p>No Picture Blockchain & Crypto News</p>
                    <p>No Picture Blockchain & Crypto News</p>
                    <p>No Picture Blockchain & Crypto News</p>
                </div>
                <button className="bg-gray-200 px-2 p-1 rounded-md">Full Definition {'>>'}</button>    
            </div>

            <div className="bg-white rounded-xl shadow-lg p-4">
                <span className="text-xs p-1 px-2 bg-black text-white rounded-md">Glossary</span>
                <br />
                <br />
                <span className="text-2xl mb-3 py-3 font-bold border-b-2 border-amber-600">Meme Coins</span>
                <div className="my-10 mb-12 font-bold text-sm">
                    <p>No Picture Blockchain & Crypto News</p>
                    <p>No Picture Blockchain & Crypto News</p>
                    <p>No Picture Blockchain & Crypto News</p>
                </div>
                <button className="bg-gray-200 px-2 p-1 rounded-md">Full Definition {'>>'}</button>    
            </div>

        </div>
    </div>
  )
}

export default GlossarySection;
