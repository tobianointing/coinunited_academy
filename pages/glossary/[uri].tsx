import { ChevronRightIcon, ShareIcon, LinkIcon } from "@heroicons/react/24/solid"
import { GetStaticProps } from "next"
import Link from "next/link"
import Container, { Container_2 } from "../../components/Container"
import { Difficulty} from "../../components/LatestArticles"
import { IDifficulty } from "../../custom_interface"
import { client } from "../../lib/apollo"
import { GET_GLOSSARY, GET_SUGGESTIONS } from "../../lib/gql_query/glossary"
import { truncateWord } from "../[slug]"

type KeyAlpha =  {
    uri: string
}

type GlossaryArticle = {
    id: string,
    title: string,
    content: string,
    keyAlphabets: {
        nodes: Array<KeyAlpha>
      },
    difficulties: {
        nodes: Array<IDifficulty>
    }
}

type Suggestion = {
    title: string,
    uri: string,
    id: string,
    __typename: 'Glossary'
}

const Definition = ({article, suggestions}:{article:GlossaryArticle, suggestions:Array<Suggestion>}) => {
    return (
        <main>
        <Container_2>
            <div className="flex items-center space-x-1 text-md my-6 font-bold text-gray-500">
                    <Link href='/'><a className="hover:underline hover:text-amber-600">Home</a></Link>
                    <ChevronRightIcon className="h-3 w-3"/>
                    <Link href='/glossary'><a className="hover:underline hover:text-amber-600">Glossary</a></Link>
                    <ChevronRightIcon className="h-3 w-3"/>
                    <p className="flex-grow">{truncateWord(article?.title, 15)}</p>
            </div>

            <h1 className="text-5xl font-bold">{article?.title}</h1>
            
            <div className="flex items-center text-xs md:text-md justify-between my-6 text-gray-500">
                <div>
                    <Difficulty difficulty={article?.difficulties?.nodes[0]?.name} />
                </div>
                <div className="relative group">
                    <ShareIcon className="h-6 w-6 mx-2" />
                    <span className="grid-cols-4 hidden group-hover:grid cursor-pointer absolute gap-4 rounded-sm shadow-[-6px_8px_8px_-6px_rgba(0,0,0,0.4)] right-1 top-6 p-4 min-w-[12rem] bg-white z-10">
                        <img src='/img/fb.svg' alt="facebook" className="h-6 w-6" />
                        <img src='/img/medium.svg' alt="twitter" className="h-6 w-6" />
                        <img src='/img/twitter.svg' alt="twitter" className="h-6 w-6" />
                        <img src='/img/linkedin.svg' alt="linkedin" className="h-6 w-6" />
                        <img src='/img/tg.svg' alt="telegram" className="h-6 w-6" /> 
                        <LinkIcon className="h-4 w-4" />   
                    </span>
                </div>
        </div>

            <div className="article-container" dangerouslySetInnerHTML={{__html: article?.content as string}}>

            </div>
        </Container_2>

    <div className="bg-gray-100">
        <Container>
            <div className="my-4">
             {suggestions?.length > 0 && suggestions.map(suggestion => <div key={suggestion.id} className="grid grid-cols-1 md:grid-cols-3 gap-7">
                    <div className="p-4 bg-white shadow-lg rounded-xl">
                        <span className="p-1 px-2 text-xs text-white bg-black rounded-md">Glossary</span>
                        <br />
                        <br />
                        <span className="py-3 mb-3 text-2xl font-bold border-b-2 border-amber-600">{suggestion.title}</span>
                        <div className="my-10 mb-12 text-sm font-bold">
                            <p>No Picture Blockchain & Crypto News</p>
                            <p>No Picture Blockchain & Crypto News</p>
                            <p>No Picture Blockchain & Crypto News</p>
                        </div>
                            <Link href={suggestion.uri}><a className="p-1 px-2 bg-gray-200 rounded-md">Full Definition {'>>'}</a></Link>    
                        </div>
                    </div>
                )
                }
            
        </div>
        </Container>
    </div>  
        </main>
    )
}


export default Definition


export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}


export const getStaticProps:GetStaticProps = async ({params}) => {
    const uri = params?.uri as string
    const res = await client.query({
        query:  GET_GLOSSARY,
        variables: {
            id:uri
        }
    })
    
    const article:GlossaryArticle = res?.data?.glossary
    const key_alphabet_uri = article?.keyAlphabets?.nodes[0]?.uri
    
    const get_suggestions = await client.query({
        query: GET_SUGGESTIONS,
        variables: {
            id: key_alphabet_uri,
            notIn: [article?.id]
        }
    })

    const suggestions = get_suggestions?.data?.keyAlphabet?.glossaries.nodes
    return {
        props: {   
            article: article || {},
            suggestions: suggestions || []
        }
    }

}