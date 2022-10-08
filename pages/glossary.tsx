import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { TextInput } from "flowbite-react"
import Container from "../components/Container"
import {ContainImage} from "../components/OptimizedImage"
import TopMainDesktop from "../components/TopMain"

interface Glossary {
    (props: {
        title: string,
        description: string,
    }): JSX.Element
} 

const GlossaryItem:Glossary = ({title, description}) => {
    return (
        <div className="flex flex-col p-5 space-y-3 rounded-lg cursor-pointer hover:bg-gray-100">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-gray-800">{description}</p>
        </div>
    )
}

const GlossaryContainer = ()=>{
    return (
        <Container>
            <div className="grid grid-cols-5 border-b-2 py-7">
                <div className="col-span-1">
                    <h2 className="text-6xl font-bold text-gray-400">#</h2>
                </div>
                <div className="flex flex-col col-span-4 space-y-3">
                    <GlossaryItem title="51% Attack" description="An alphabetical list of difficult, technical, or foreign words in a text along with explanations of their meanings. An alphabetical list of difficult, technical, or foreign words in a text along with explanations of their meanings."/>
                </div>
            </div>
            
        
        </Container>
    )
}








const Glossary = () => {
  return (
    <div>
        <div className='bg-white'>
            <Container>
                <TopMainDesktop />
            </Container>
        </div>
        <div className="bg-glossary">
            <Container>
                <div className="grid grid-cols-1 my-10 md:grid-cols-2">
                    <div className="py-3">
                        <h1 className="my-8 text-6xl font-bold">CoinUnited <br /> Glossary</h1>
                        <p className="font-semibold">An alphabetical list of difficult, technical, or foreign words. in a text along with explanations of their meanings.</p>
                    </div>
            
                    <div className="h-full">
                        <ContainImage src="/img/glossarybook.png" alt="glossary book" className="w-full h-full"/>
                    </div>
                </div>
            </Container>
        </div>

        <div className="bg-white">
            <Container>
                <div className="flex items-center w-full space-x-5">
                    <div>
                    <form method="GET" action="/search" >
                        <TextInput 
                            type="search" 
                            placeholder="search" 
                            name="query"
                            icon={MagnifyingGlassIcon}
                        />
                    </form>
                    </div>

                    <div className="flex items-center flex-grow space-x-2 text-gray-400 justify-evenly">
                            <span>#</span>
                            <span>A</span>
                            <span>B</span>
                            <span>C</span>
                            <span>D</span>
                            <span>E</span>
                            <span>F</span>
                            <span>G</span>
                            <span>H</span>
                            <span>I</span>
                            <span>J</span>
                            <span>K</span>
                            <span>L</span>
                            <span>M</span>
                            <span>N</span>
                            <span>O</span>
                            <span>P</span>
                            <span>Q</span>
                            <span>R</span>
                            <span>S</span>
                            <span>T</span>
                            <span>U</span>
                            <span>V</span>
                            <span>W</span>
                            <span>X</span>
                            <span>Y</span>
                            <span>Z</span>
                    </div>
                </div>
            </Container>
        </div>

        <div className="bg-white">
            <GlossaryContainer />
        </div>

    </div>
  )
}

export default Glossary
