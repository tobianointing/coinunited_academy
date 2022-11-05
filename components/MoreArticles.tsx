import { Article } from "./LatestArticles"
import { usePosts } from "../lib/hooks"
import  {ContainImage} from "./OptimizedImage"
import { titleCase } from "./TopMain"
import { useDifficuties, useTags } from "../lib/hooks"
import useTranslation from 'next-translate/useTranslation'
import { useState } from "react"
import {CheckIcon, PlusIcon} from "./utils/Icons"

type Callback = (difficulty?:string)=>void





export const Tags = ({name,callback}:{name?:string, callback?:Callback}) =>{
    const [clicked,setClicked] = useState<boolean>(false)
    const handleClick = () =>{
        setClicked(!clicked);
        if(callback) callback(name)
    }

    return (
        <button onClick={handleClick} className="flex m-2 items-center justify-center p-1 px-3 space-x-2 text-[0.75rem] text-gray-600 bg-[#62636B0D] rounded-md">
            <span className={clicked ? "text-black": ""}>{name}</span>
            {clicked ? <CheckIcon /> : <PlusIcon />}
        </button>
    )
}

export const Difficulty =( {difficulty, callback}:{difficulty?:string, callback?:Callback}) =>{
    let src:string;
    let border:string;
    let bg:string;
    const d = titleCase(difficulty? difficulty : "Beginner")
    const [clicked, setClicked] = useState<boolean>(false)

    const handleClick = ()=>{
        setClicked(!clicked);
        if(callback) callback(difficulty)
    }

    switch (d) {
        case 'Beginner':
            src = '/img/greendot.svg'
            border = 'border-[#02C07633]'
            bg = 'bg-[#02C07633]'
            break;
        case 'Intermediate':
            src = '/img/yellowdot.svg'
            border = 'border-[#F0B90B33]'
            bg = 'bg-[#F0B90B33]'
            break;
        case 'Advanced':
            src = '/img/reddot.svg'
            border = 'border-[#FF4D4D33]'
            bg = 'bg-[#FF4D4D33]'
            break;
        default:
            border = 'border-[#02C07633]'
            bg = 'bg-[#02C07633]'
            src = '/img/greendot.svg'        
        }

        const className = `flex items-center justify-center p-1 px-3 space-x-2 text-[0.75rem] text-gray-600 ${clicked ? '' : 'border'} rounded-md ${clicked ? bg : border}`

    return (
        <button onClick={() => handleClick()} 
            className={className}>
            <ContainImage src={src} alt="difficulty dot" className="h-[0.35rem] w-[0.35rem]" />
            <span>{titleCase(difficulty? difficulty : "Beginner")}</span>
             {clicked ? <CheckIcon /> : <PlusIcon />}
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
                <div className="flex items-center flex-wrap content-start my-4">
                    { tags.length > 0 && tags.map((tag) => <Tags key={tag.id} name={tag.name} />)}
                </div>
            </div>

            <div>
                <p className="font-semibold">{t("Difficulty")}</p>

                <div className="flex items-center gap-4 flex-wrap content-start my-4 mb-7">
                    {difficulties.length > 0 && difficulties.map((difficulty) => (
                            <Difficulty key={difficulty.id} difficulty={difficulty.name}/>
                        ))
                    }
                </div>

            </div>
        </div>


        <div className="grid grid-cols-1 my-6 space-y-6 md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:gap-8">
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
               <button className="p-2 px-3 space-x-2 text-[0.75rem] text-gray-400 hover:bg-[#F2F2F2] bg-white rounded-md">
                    <span>{t("SEE ALL ARTICLES")}</span> 
                    <span className="font-semibold">
                        {'>'}{'>'}
                    </span>
                </button>
            </div>
        }
    </div>
  )
}

export default MoreArticles
