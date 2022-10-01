import { ChevronRightIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/solid"
import {  Post } from "../custom_interface"
import {useCategories} from "../lib/hooks"
import {titleCase} from "./TopMain"
import OptimizedImage from "./OptimizedImage"


const CatArticle = ({title, image }:{title:string, image:string}) => {

    return (
        <div className="flex items-stretch flex-col md:flex-row rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-gray-100">
            <div className="w-full md:w-2/5 h-full">
                <OptimizedImage src={image} className="w-full h-full" alt={title}  />
            </div>
            <div className="w-full md:w-3/5 p-3">
                <h1 className="font-bold">{title}</h1>

                <div className="flex text-xs items-center justify-between mt-8">
                    <span className="flex text-gray-700 bg-orange-200 rounded-md  p-1 px-3 items-center space-x-2">
                        <img src="img/yellowdot.svg" alt="yellow dot" />
                        <span>Intermediate</span>
                    </span>
                    <span className="flex items-center space-x-3 opacity-75 text-gray-600">
                        <span className="flex space-x-1 items-center" >
                            <CalendarDaysIcon className="h-3 w-3" />
                            <span>23 JUN 2023</span>
                        </span>
                        <span className="flex space-x-1 items-center">
                            <ClockIcon className="h-3 w-3" />
                            <span>5m</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}



const CategoryBlock = ({name, posts}:{name:string, posts?:Array<Post>}) => {
    
    return (
    <>
        <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl">{name}</h3>
            <button className="rounded-md flex items-center space-x-1 justify-center p-1 px-2 text-gray-400 bg-white shadow-md">
              <span>SEE ALL {name.toUpperCase()} ARTICLES</span> 
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
            category.posts.nodes.length > 0 &&
                <CategoryBlock key={index} name={titleCase(category.name)} posts={category?.posts?.nodes}/>
         ))
        }
    </div>
  )
}

export default CategoriesArticle
