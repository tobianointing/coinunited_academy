import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { Article } from "./LatestArticles"
import { usePosts } from "../lib/hooks"


const Tags = ({name}:{name:string}) =>{
    return (
        <button className="flex space-x-2 rounded-md text-sm text-gray-600 bg-gray-200 p-1 px-2 justify-center items-center">
            <span>{name}</span>
            <PlusIcon className="h-4 w-4 text-gray-700 font-bold"/>
        </button>
    )
}


const Difficulty =( {difficulty, src}:{difficulty:string, src:string}) =>{
    return (
        <button className="border flex space-x-2 rounded-md text-sm text-gray-600 border-gray-300 p-1 px-2 justify-center items-center">
            <img src={src} alt="yellow dot" />
            <span>{difficulty}</span>
            <PlusIcon className="h-4 w-4 text-gray-700 font-bold"/>
        </button>
    )
}


const MoreArticles = () => {
    const posts = usePosts(state => state.posts)
    const rest_after_six = posts?.slice(6, posts.length)
  
    return (
    <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-6">
            <div>
                <p className="font-semibold">Popular tags</p>   
                <div className="my-4 grid grid-cols-4 gap-3">
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                    <Tags name="Bitcoin"/>    
                </div>
            </div>

            <div>
                <p className="font-semibold">Difficulty</p>

                <div className="my-4 mb-7 grid grid-cols-3 gap-3">
                    <Difficulty difficulty="Beginner" src="img/greendot.svg"/>
                    <Difficulty difficulty="Intermediate" src="img/yellowdot.svg"/>
                    <Difficulty difficulty="Advanced" src="img/reddot.svg"/>
                </div>

                <p className="font-semibold">Reading Time</p>

            </div>
        </div>


        <div className="grid grid-cols-1 my-6 md:grid-cols-3 space-y-6 md:space-y-0 md:gap-8">
            {rest_after_six?.length > 0 && rest_after_six.map((post, index) => 
                <Article 
                    key={index}
                    title={post.node.title}
                    uri={post.node.uri}
                    featuredImage={post.node.featuredImage}
                    categories={post.node.categories}
                />
                )
            }
        </div>

        <div className="flex justify-center mt-10">
            <button className="rounded-md flex items-center space-x-1 justify-center p-1 px-2 text-gray-400 bg-white shadow-md">
              <span>SEE ALL ARTICLES</span> 
              <span className="text-black font-bold flex items-center">
                <ChevronRightIcon className="h-4 w-4"/>
                <ChevronRightIcon className="h-4 w-4"/>
              </span>
            </button>
        </div>

    </div>
  )
}

export default MoreArticles
