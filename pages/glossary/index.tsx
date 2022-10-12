import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { TextInput } from "flowbite-react"
import { GetStaticProps } from "next"
import Container from "../../components/Container"
import {ContainImage} from "../../components/OptimizedImage"
import TopMainDesktop from "../../components/TopMain"
import { client } from "../../lib/apollo"
import { GET_GLOSSARIES } from "../../lib/gql_query/glossary"
import { Glossary,GlossaryKey, GlossaryItem} from "../../custom_interface"
import { useGlossaryKey } from "../../lib/hooks"
import shallow from "zustand/shallow"
import { useEffect } from "react"
import {Link as Scroll , Element as Target} from 'react-scroll'
import Link from "next/link"


const GlossaryItem:Glossary = ({title, description, uri}) => {
    return (
        <Link href={uri}>
        <a className="flex flex-col p-5 space-y-3 rounded-lg cursor-pointer hover:bg-gray-100">
            <h3 className="text-2xl font-semibold">{title}</h3>
            {description && <div className="text-gray-800" dangerouslySetInnerHTML={{__html: description}}></div>}
        </a>
        </Link>
    )
}

const GlossaryContainer = ({gKey, posts}:{gKey:string, posts?:Array<GlossaryItem>})=>{
    return (
        <Target name={gKey}>
        <Container>
            <div className="grid grid-cols-5 border-b-2 py-7 snap-always snap-center">
                <div className="col-span-1">
                    <h2 className="text-6xl font-bold text-gray-400">{gKey}</h2>
                </div>
                <div className="flex flex-col col-span-4 space-y-3">
                    {posts?.map(post => <GlossaryItem
                                            key={post.id} 
                                            title={post.title} 
                                            description={post?.content}
                                            uri={post.uri}
                                            />
                          )
                    }
                </div>
            </div>
        </Container>
        </Target>
    )
}

type GProps =  {
    glossaries_key:Array<GlossaryKey>
} 

const Glossary = (props:GProps) => {
    const g_key = props?.glossaries_key

    const [glossaryKey, setGlossaryKey] = useGlossaryKey( state => [state.glossaryKey, state.setGlossaryKey], shallow)
    useEffect(() => {
        setGlossaryKey(g_key)
    }, [g_key])


    return (
    <div className="min-h-screen">
        <div className='bg-white'>
            <Container>
                <TopMainDesktop />
            </Container>
        </div>
        <div className="bg-glossary">
            <Container>
                <div className="grid grid-cols-1 my-10 md:grid-cols-2">
                    <div className="py-3">
                        <h1 className="my-8 text-3xl smm:text-6xl  font-bold">CoinUnited <br /> Glossary</h1>
                        <p className="font-semibold">An alphabetical list of difficult, technical, or foreign words. in a text along with explanations of their meanings.</p>
                    </div>
            
                    <div className="h-full">
                        <ContainImage src="/img/glossarybook.png" alt="glossary book" className="w-full h-full"/>
                    </div>
                </div>
            </Container>
        </div>

        <div className="bg-white sticky top-0">
            <Container>
                <div className="flex flex-col space-y-5 items-start md:flex-row  md:items-center w-full md:space-y-0   md:space-x-5">
                    <div className="w-full md:w-auto">
                    <form method="GET" action="/search" >
                        <TextInput 
                            type="search" 
                            placeholder="search" 
                            name="query"
                            icon={MagnifyingGlassIcon}
                        />
                    </form>
                    </div>

                    <div className="flex items-center flex-wrap flex-grow space-x-2 text-gray-400 justify-evenly w-full">
                            {glossaryKey &&  glossaryKey?.map( gk =>
                                <Scroll activeClass="text-black font-bold" to={gk.node.name} spy={true} smooth={true} offset={0} duration={500} className="hover:text-black cursor-pointer active:text-black hover:font-bold transition-all duration-200 ease-in" key={gk.cursor}>{gk.node.name}</Scroll>
                            )
                        }
                          
                    </div>
                </div>
            </Container>
        </div>

        <div className="bg-white snap-y snap-mandatory">
            {
                glossaryKey.map(gk => 
                    // gk.node.glossaries.nodes.length > 0 && 
                    <GlossaryContainer 
                    key={gk.cursor}
                    gKey={gk.node.name}
                    posts={gk.node.glossaries.nodes}                      
                />)
            }
        </div>

    </div>
  )
}

export default Glossary



export const getStaticProps: GetStaticProps = async () => {
    
    try{
    const {data} = await client.query({
        query: GET_GLOSSARIES
    });


    const glossaries_key = data?.keyAlphabets?.edges

    return {
        props:{
            glossaries_key
        },
        revalidate: 300 
    }
    }catch{
        return {
            notFound: true
        }
    }
}
