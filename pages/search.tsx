import Container from "../components/Container"
import TopMainDesktop from "../components/TopMain"
import OptimizedImage from "../components/OptimizedImage"
import { Article, formatDate, formatReadingTime, Difficulty as InlineDifficulty } from "../components/LatestArticles"
import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { IDifficulty, IFilters, Post, Tag } from "../custom_interface"
import { useState } from "react"
import { GetServerSideProps } from "next"
import {GET_POSTS_BY_QUERY, GET_POSTS_BY_QUERY_2} from "../lib/queries"
import { client } from "../lib/apollo"
import { Filters } from "../components/Filters"
import Head from "next/head"
import Image from "next/image"



type Mode = "grid" | "list"


const range = (start=1, stop:number, step = 1) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)



const ListArticle = ({title, featuredImage, difficulties, date, readingTime, uri }:Post) => {
    return (
        <Link href={uri ? uri : '/' }>
        <a className="flex flex-col overflow-hidden bg-white border md:bg-transparent md:space-x-4 md:items-stretch md:flex-row rounded-xl">
            <div className="w-full h-64 md:w-1/5 md:h-full">
                <OptimizedImage src={featuredImage?.node?.sourceUrl} className="w-full h-full rounded-lg" alt={title}  />
            </div>
            
            <div className="relative flex-grow w-full p-3 md:w-4/5">
                <h1 className="font-bold mb-14">{title}</h1>

                <div className="absolute left-0 flex items-center w-full px-3 mt-8 space-x-3 bottom-2 ssm:flex-col ms:flex-row ssm:items-start ms:items-center ssm:space-y-3 ms:space-y-0">
                    
                    <InlineDifficulty difficulty={difficulties?.edges[0]?.node?.name} />

                    <span className="flex items-center space-x-3 text-gray-600 opacity-75">
                        <span className="flex items-center space-x-1" >
                            <CalendarDaysIcon className="w-3 h-3" />
                            <span>{formatDate(date)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Image src='/img/clock.svg' objectFit="cover" width={16} height={16} />   
                            <span>{formatReadingTime(readingTime)}</span>
                        </span>
                    </span>
                </div>
            </div>
        </a>
        </Link>
    )
}



const fetchPost_default = async (query:string, page:number, language:string) => {
    const {data} = await client.query({
        query: GET_POSTS_BY_QUERY_2,
        variables: {
            search: query,
            language: language,
            page: ((page-1)*3)
            }}
        )

    return data?.posts?.nodes
}



const Search= ({posts:serverArticles, resultTotal:total, query, difficulties, tags}:
    {posts:Post[], resultTotal:number, query:string, difficulties:IDifficulty[], tags:Tag[] }) => {
    const [mode, setMode] = useState<Mode>('grid')
    const [sort, setSort] = useState<boolean>(false)    
    const [articles, setArticles] = useState<Post[]>(serverArticles)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [resultTotal, setResultTotal] = useState<number>(total)
    const pagination = ():Array<number> => {
        try{
            return range(1, (Math.ceil(resultTotal/3))+1)
        }
        catch{
            return [1,2]
        }
    }

    const filterSetter = (filters:IFilters, data?:{posts:Post[], resultTotal:number}) => {
        if(data){
            setArticles(data.posts)
            setCurrentPage(1)
            setResultTotal(data.resultTotal)
        }
    }


    const fetchPaginatedDataDefault = (page:number) =>{
        fetchPost_default(query, page, 'EN').then((data)=>{
           if (data){
                setArticles(data)
                setCurrentPage(page)                
           }
        }).catch()
    } 



    return (
        <div>
            <Head>
                <title>Search</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <div className='bg-white'>
                <Container>
                    <TopMainDesktop />
                </Container>
            </div>
        
            <Container>
                <h1 className="text-4xl font-bold">Topic at Academy</h1>
                
                {
                  sort && <Filters tags={tags} difficulties={difficulties} query={query} dataSetter={filterSetter} />
                }
            </Container>
            <div className="bg-gray-200">
                <Container>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8 font-semibold">
                            <p>Layout</p>
                            <button onClick={() => setMode("grid") } className={(mode==="list") ? "opacity-20": ""}>
                                <OptimizedImage src="/img/grid.png" alt="grid" className="h-7 w-7" />
                            </button>
                            <button onClick={() => setMode("list") } className={(mode==="grid") ? "hidden md:block opacity-20": "hidden md:block"}>
                                <OptimizedImage src="/img/list.png" alt="list" className="w-7 h-7" />    
                            </button>
                            
                            <button 
                                className="p-1 px-2 transition ease-in delay-100 rounded-md duration-400 hover:bg-black hover:text-white"
                            >Apply filters</button>
                            <button
                                className="p-1 px-2 transition ease-in delay-100 border rounded-md duration-400 hover:bg-white hover:text-black hover:border-black"
                            >Clear filters</button>
                        </div>
                        <div>
                            <button onClick={()=> setSort(sort => !sort )} className="flex items-center justify-center p-1 px-3 space-x-2 font-semibold transition ease-in delay-100 rounded-md duration-400 hover:bg-gray-100">
                                <OptimizedImage src="/img/sort-down.png" className={sort ? "w-2 h-2 rotate-180": "w-2 h-2"} alt="sort down"/>
                                {sort? <span>Hide filters</span> : <span>Show filters</span> }
                            </button>                            
                        </div>
                    </div>
                </Container>                
            </div>
            <div className="bg-gray-100">
                <Container>
                    <h3 className="text-xl font-bold">Articles ({resultTotal})</h3>
                    <div>
                        {mode === "grid" ? 
                        <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-3">
                            {articles?.map(article => 
                                <Article 
                                    key={article.id}
                                    title={article.title}
                                    uri={article.uri}
                                    featuredImage={article.featuredImage}
                                    categories={article.categories}
                                    date={article.date}
                                    readingTime={article.readingTime} 
                                    difficulties={article.difficulties}
                                />
                            )
                            }
                         </div>
                        :
                        <div className="grid grid-cols-1 gap-6 my-7">
                            { articles?.map(article =>
                                <ListArticle
                                key={article.id}
                                title={article.title}
                                uri={article.uri}
                                featuredImage={article.featuredImage}
                                categories={article.categories}
                                date={article.date}
                                readingTime={article.readingTime}
                            />
                            )
                        }
                        </div>
                        }
                    </div>

                    <div className="flex items-center justify-center my-7">
                        <div className="flex items-center justify-between space-x-3 font-bold text-gray-400">
                            {currentPage > 1 && 
                                <button onClick={() => fetchPaginatedDataDefault(currentPage-1)} className="p-3 px-5 border-2 rounded-sm">{'<'}</button>}
                            {pagination().map(page =>
                              <button key={page} 
                                    onClick={() => fetchPaginatedDataDefault(page)}
                                    className={currentPage===page? "border-site-amber text-site-amber border-2 px-5 p-3 rounded-sm" :"border-2 px-5 p-3 rounded-sm"}>{page}</button>
                              )
                            }
                            { currentPage < pagination().length && <button 
                                onClick={() => fetchPaginatedDataDefault(currentPage+1)}
                                className="p-3 px-5 border-2 rounded-sm">{'>'}</button>
                            }
                        </div>
                    </div>
                </Container>

            </div>


        </div>
    )
}
export default Search

export const getServerSideProps:GetServerSideProps = async (context) => {
    const {query} = context.query
    const {data} = await client.query({
        query: GET_POSTS_BY_QUERY,
        variables: {
            search: query,
            language: 'EN',
            page:0
        }
    })
    
    const posts = data?.posts?.nodes
    const resultTotal = data?.posts?.pageInfo?.offsetPagination?.total
    const difficulties = data.difficulties.nodes; 
    const tags = data.tags.nodes;


    return{
        props: {
            posts: posts ? posts : [],
            resultTotal: resultTotal ? resultTotal : 0,
            query: query ? query : '',
            difficulties : difficulties ? difficulties : [],
            tags: tags ? tags : []
        }
    }
}



// const {data} = await client.query({
//     query: FILTER_POSTS_BY_SLUG_AND_DIFFICULTY,
//     variables: {
//         search: query,
//         tags: ['Crypto'],
//         difficulties: ['advanced'],
//         language: 'EN'
//     }
// })

