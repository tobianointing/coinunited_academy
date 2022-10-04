import { PlusIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { Article } from "./LatestArticles"
import { usePosts } from "../lib/hooks"
import  {ContainImage} from "./OptimizedImage"
import { titleCase } from "./TopMain"
import { useDifficuties, useTags } from "../lib/hooks"


const Tags = ({name}:{name:string}) =>{
    return (
        <button className="flex space-x-2 rounded-md text-sm text-gray-600 bg-gray-200 p-1 px-2 justify-center items-center">
            <span>{name}</span>
            <PlusIcon className="h-4 w-4 text-gray-700 font-bold"/>
        </button>
    )
}


const Difficulty =( {difficulty}:{difficulty:string}) =>{
    let src:string;
    switch (difficulty) {
        case 'beginner':
            src = '/img/greendot.svg'
            break;
        case 'intermediate':
            src = '/img/yellowdot.svg'
            break;
        case 'advanced':
            src = '/img/reddot.svg'
            break;
        default:
            src = '/img/greendot.svg'        
        }
    return (
        <button className="border flex space-x-3 rounded-md text-sm text-gray-600 border-gray-300 p-1 px-2 justify-center items-center">
            <ContainImage src={src} alt="difficulty dot" className="h-[0.35rem] w-[0.35rem]" />
            <span>{titleCase(difficulty)}</span>
            <PlusIcon className="h-4 w-4 text-gray-700 font-bold"/>
        </button>
    )
}


const MoreArticles = () => {
    const posts = usePosts(state => state.posts)
    const rest_after_six = posts?.slice(6, posts.length)
    const difficulties = useDifficuties(state => state.difficulties)
    const tags = useTags(state => state.tags)

    return (
    <div className="my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-6">
            <div>
                <p className="font-semibold">Popular tags</p>   
                <div className="my-4 grid grid-cols-4 gap-3">
                    { tags.length > 0 && tags.map((tag) => <Tags key={tag.id} name={tag.name} />)}
                </div>
            </div>

            <div>
                <p className="font-semibold">Difficulty</p>

                <div className="my-4 mb-7 grid grid-cols-3 gap-3">
                    {difficulties.length > 0 && difficulties.map((difficulty) => (
                            <Difficulty key={difficulty.id} difficulty={difficulty.name}/>
                        ))
                    }
                </div>

                <p className="font-semibold">Reading Time</p>

            </div>
        </div>


        <div className="grid grid-cols-1 my-6 md:grid-cols-3 space-y-6 md:space-y-0 md:gap-8">
            {rest_after_six?.length > 0 && rest_after_six.map((post) => 
                <Article 
                    key={post?.node?.id}
                    title={post?.node?.title}
                    uri={post?.node?.uri}
                    featuredImage={post?.node?.featuredImage}
                    categories={post?.node?.categories}
                    date={post?.node?.date}
                    readingTime = {post?.node?.readingTime}
                    difficulties = {post?.node?.difficulties}
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
