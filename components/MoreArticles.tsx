import { PlusIcon, ChevronRightIcon,CheckIcon } from "@heroicons/react/24/solid"
import { Article } from "./LatestArticles"
import { usePosts } from "../lib/hooks"
import  {ContainImage} from "./OptimizedImage"
import { titleCase } from "./TopMain"
import { useDifficuties, useTags } from "../lib/hooks"
import useTranslation from 'next-translate/useTranslation'
import { useState } from "react"


type Callback = (difficulty?:string)=>void


export const Tags = ({name,callback}:{name?:string, callback?:Callback}) =>{
    const [clicked,setClicked] = useState<boolean>(false)
    const handleClick = () =>{
        setClicked(!clicked);
        if(callback) callback(name)
    }

    return (
        <button onClick={handleClick} className="flex items-center justify-center p-1 px-2 space-x-2 text-sm text-gray-600 bg-gray-200 rounded-md">
            <span>{name}</span>
            {clicked ? <CheckIcon className="w-4 h-4 text-gray-700"/> : <PlusIcon className="w-4 h-4 font-bold text-gray-700"/>}
        </button>
    )
}

export const Difficulty =( {difficulty, callback}:{difficulty?:string, callback?:Callback}) =>{
    let src:string;
    const d = titleCase(difficulty? difficulty : "Beginner")
    const [clicked, setClicked] = useState<boolean>(false)

    const handleClick = ()=>{
        setClicked(!clicked);
        if(callback) callback(difficulty)
    }

    switch (d) {
        case 'Beginner':
            src = '/img/greendot.svg'
            break;
        case 'Intermediate':
            src = '/img/yellowdot.svg'
            break;
        case 'Advanced':
            src = '/img/reddot.svg'
            break;
        default:
            src = '/img/greendot.svg'        
        }
    return (
        <button onClick={() => handleClick()} 
            className="flex items-center justify-center p-1 px-2 space-x-3 text-sm text-gray-600 border border-gray-300 rounded-md">
            <ContainImage src={src} alt="difficulty dot" className="h-[0.35rem] w-[0.35rem]" />
            <span>{titleCase(difficulty? difficulty : "Beginner")}</span>
             {clicked ? <CheckIcon className="w-4 h-4 font-bold text-gray-700" /> : <PlusIcon className="w-4 h-4 font-bold text-gray-700"/>}
        </button>
    )
}


const MoreArticles = () => {
    const posts = usePosts(state => state.posts)
    const rest_after_six = posts?.slice(6, posts.length)
    const difficulties = useDifficuties(state => state.difficulties)
    const tags = useTags(state => state.tags)
    const { t } = useTranslation('common')


    return (
    <div className="my-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
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


        <div className="grid grid-cols-1 my-6 space-y-6 md:grid-cols-3 md:space-y-0 md:gap-8">
            {rest_after_six?.length > 0 && rest_after_six.map((post) => 
                <Article 
                    key={post?.id}
                    title={post?.title}
                    uri={post.translation?.uri}
                    featuredImage={post?.featuredImage}
                    categories={post?.categories}
                    date={post?.date}
                    readingTime = {post?.readingTime}
                    difficulties = {post?.difficulties}
                />
                )
            }
        </div>
        {rest_after_six?.length > 0 &&
            <div className="flex justify-center mt-10">
                <button className="flex items-center justify-center p-1 px-2 space-x-1 text-gray-400 bg-white rounded-md shadow-md">
                <span>{t("SEE ALL ARTICLES")}</span> 
                <span className="flex items-center font-bold text-black">
                    <ChevronRightIcon className="w-4 h-4"/>
                    <ChevronRightIcon className="w-4 h-4"/>
                </span>
                </button>
            </div>
        }
    </div>
  )
}

export default MoreArticles
