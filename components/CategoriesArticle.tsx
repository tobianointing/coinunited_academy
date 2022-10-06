import { ChevronRightIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/solid"
import {  Post } from "../custom_interface"
import {useCategories} from "../lib/hooks"
import {titleCase} from "./TopMain"
import OptimizedImage from "./OptimizedImage"
import {formatDate, formatReadingTime, Difficulty} from "./LatestArticles"
import Link from "next/link";

interface CatPost extends Post {
    image: string
}


const CatArticle = ({title, image, difficulties, date, readingTime, uri }:CatPost) => {

    return (
        <Link href={uri ? uri : '/' }>
        <a className="flex md:items-stretch flex-col  md:flex-row rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100">
            <div className="w-full md:w-2/5 h-64 md:h-full">
                <OptimizedImage src={image} className="w-full h-full" alt={title}  />
            </div>
            
            <div className="w-full md:w-3/5 relative flex-grow p-3">
                <h1 className="font-bold mb-8">{title}</h1>

                <div className="flex absolute bottom-2 left-0 w-full px-3 text-xs ssm:flex-col ms:flex-row items-center ssm:items-start ms:items-center justify-between ssm:space-y-3 ms:space-y-0 mt-8">
                    
                    <Difficulty difficulty={difficulties?.edges[0]?.node?.name} />

                    <span className="flex items-center space-x-3 opacity-75 text-gray-600">
                        <span className="flex space-x-1 items-center" >
                            <CalendarDaysIcon className="h-3 w-3" />
                            <span>{formatDate(date)}</span>
                        </span>
                        <span className="flex space-x-1 items-center">
                            <ClockIcon className="h-3 w-3" />
                            <span>{formatReadingTime(readingTime)}</span>
                        </span>
                    </span>
                </div>
            </div>
        </a>
        </Link>
    )
}



const CategoryBlock = ({name, posts}:{name:string, posts?:Array<Post>}) => {
    
    return (
    <>
        <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl">{name}</h3>
            <button className="rounded-md flex items-center space-x-1 justify-center p-1 px-2 text-gray-400 bg-white shadow-md">
              <span className="text-sm ms:text-md">SEE ALL {name.toUpperCase()} ARTICLES</span> 
              <span className="text-black font-bold flex items-center">
                <ChevronRightIcon className="h-4 w-4"/>
                <ChevronRightIcon className="h-4 w-4"/>
              </span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 my-7 gap-6">
            {
                posts?.map((post, index) => 
                <CatArticle  
                    key={index}
                    title={post.title} 
                    image = {post.featuredImage?.node?.sourceUrl}
                    uri={post.translation?.uri}
                    date = {post.date}
                    readingTime = {post.readingTime}
                    difficulties = {post.difficulties}
                /> )
                
            }
        </div>
        </>
    )

}



const CategoriesArticle = () => {
    const categories = useCategories(state => state.categories)
    return (
    <div  className="my-5">
        
        {categories?.map((category, index) => (
            category.posts.nodes.length > 0 && category.name.toLowerCase() !== "uncategorized" &&
                <CategoryBlock key={index} name={titleCase(category.name)} posts={category?.posts?.nodes}/>
         ))
        }
    </div>
  )
}

export default CategoriesArticle
