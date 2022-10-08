import Container from "../components/Container"
import TopMainDesktop from "../components/TopMain"
import OptimizedImage from "../components/OptimizedImage"
import { Article, formatDate, formatReadingTime, Difficulty as InlineDifficulty } from "../components/LatestArticles"
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { IDifficulty, Post, Tag } from "../custom_interface"
import { useState } from "react"
import { Tags } from "../components/MoreArticles"
import useTranslation from "next-translate/useTranslation"
import {Difficulty} from "../components/MoreArticles"


type Mode = "grid" | "list"


const Filters = ({tags, difficulties}:{tags:Tag[], difficulties:IDifficulty[]})=>{
    const { t } = useTranslation('common')
    return <div className="grid grid-cols-1 gap-6 my-7 md:grid-cols-2 md:gap-16">
    <div>
        <p className="font-semibold">{t("Popular tags")}</p>   
        <div className="grid grid-cols-4 gap-3 my-4">
            { tags.length > 0 && tags.map((tag) => <Tags key={tag.id} name={tag.name} />)}
        </div>
    </div>

    <div>
        <p className="font-semibold">{t("Difficulty")}</p>

        <div className="grid grid-cols-3 gap-3 my-4 mb-7">
            {difficulties.length > 0 && difficulties.map((difficulty) => (
                    <Difficulty key={difficulty.id} difficulty={difficulty.name}/>
                ))
            }
        </div>

        <p className="font-semibold">Reading Time</p>

    </div>
</div>
}



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
                            <ClockIcon className="w-3 h-3" />
                            <span>{formatReadingTime(readingTime)}</span>
                        </span>
                    </span>
                </div>
            </div>
        </a>
        </Link>
    )
}





const Search= () => {

    const tags = [
        {id:'1', name:"Javascript"},
        {id:'2', name:"React"},
        {id:'3', name:"Nextjs"},
        {id:'4', name:"Typescript"}
    ]    

    const difficulties = [
        {id:'1', name:"Beginner"},
        {id:'2', name:"Intermediate"},
        {id:'3', name:"Advanced"}
    ]

    const [mode, setMode] = useState<Mode>('grid')
    const [sort, setSort] = useState<boolean>(false)    
    
    const articles= 
        {
            title: "This is a title",
            uri: "/uri",
            featuredImage: {
                node: {
                    altText: "altText",
                    sourceUrl: "/img/featured.jpg"
                }
            },
            categories: {
                nodes: [
                    {
                        name: "name"
                        
                    }]
            },
            date: "2021-01-01",
            readingTime: "1",
            
        }
    
    return (
        <div>
            <div className='bg-white'>
                <Container>
                    <TopMainDesktop />
                </Container>
            </div>
        
            <Container>
                <h1 className="text-4xl font-bold">Topic at Academy</h1>
                
                {
                  sort && <Filters tags={tags} difficulties={difficulties} />
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
                    <h3 className="text-xl font-bold">Article(23)</h3>
                    <div>
                        {mode === "grid" ? 
                        <div className="grid grid-cols-1 gap-4 my-6 md:grid-cols-3">
                            <Article 
                                title={articles.title}
                                uri={articles.uri}
                                featuredImage={articles.featuredImage}
                                categories={articles.categories}
                                date={articles.date}
                                readingTime={articles.readingTime} 
                            />
                         </div>
                        :
                        <div className="grid grid-cols-1 gap-6 my-7">
                            <ListArticle
                                title={articles.title}
                                uri={articles.uri}
                                featuredImage={articles.featuredImage}
                                categories={articles.categories}
                                date={articles.date}
                                readingTime={articles.readingTime}
                            />
                        </div>
                        }
                    </div>
                </Container>

            </div>


        </div>
    )
}


export default Search