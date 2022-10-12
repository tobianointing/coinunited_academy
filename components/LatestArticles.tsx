import { CalendarDaysIcon, ClockIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { Post } from "../custom_interface"
import { usePosts} from "../lib/hooks"
import OptimizedImage from "./OptimizedImage"
import { titleCase } from "./TopMain"
import Link from "next/link";
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation'


export const Difficulty =( {difficulty}:{difficulty?:string}) =>{
  let src:string, bg:string;
  const d = titleCase(difficulty? difficulty : "Beginner")
  
  switch (d) {
    case 'Beginner' :
        src = '/img/greendot.svg'
        bg = 'bg-green-200'
        break;
    case 'Intermediate':
        src = '/img/yellowdot.svg'
        bg = 'bg-orange-200'
        break;
    case 'Advanced':
        src = '/img/reddot.svg'
        bg = 'bg-red-200'
        break;
    default:
        src = '/img/greendot.svg'
        bg = 'bg-green-200'  
  }

  const className:string = `flex text-gray-700 ${bg} rounded-md  space-x-3 p-1 px-3 items-center text-sm`
  
  

  return (
    <span className={className}>
      <OptimizedImage src={src} alt="difficulty dot" className="w-[0.35rem] h-[0.35rem]" />
      <span>{titleCase(difficulty ? difficulty : 'Beginner' )}</span>
    </span>
  )
}



export const formatDate = (date?: string) => {
  if (!date) return ''
  const options:Intl.DateTimeFormatOptions = {day: 'numeric', month: 'short',  year: 'numeric' };
  const d = new Date(date);
  return d.toLocaleDateString('en-US', options);

}

export const formatReadingTime = (minutes?: string) => {
    if (!minutes) return '1min'  
    
    // remove all non-digits
    const num = parseInt(minutes.replace(/\D/g, ''));
    if (num < 1) return '1m';
    return `${num.toString()}m`;
}


export const Article = ({title, uri, featuredImage, categories, date, readingTime, difficulties}:Post) =>{ 

  return <Link href={uri? uri : '/'}><a  className="relative flex flex-col overflow-hidden bg-white shadow-lg rounded-2xl hover:shadow-2xl">
    <div className="relative">
      <OptimizedImage src={featuredImage?.node?.sourceUrl} alt="featured image" className="w-full h-56"/>
      <span className="absolute p-1 px-2 text-sm text-white bg-black rounded-md right-2 top-3">
        {categories?.nodes[0]?.name}
      </span>
    </div>

    <div className="flex-grow p-4">
        <p className="text-lg font-bold mb-7 ssm:mb-14 ms:mb-8">{title}</p>
        <div className="absolute left-0 w-full px-4 bottom-3">
          <div className="flex items-center justify-between mt-8 text-xs ssm:flex-col ms:flex-row ssm:items-start ms:items-center ssm:space-y-3 ms:space-y-0">
              <Difficulty difficulty={difficulties?.edges[0]?.node?.name} />
              <span className="flex items-center space-x-3 text-sm text-gray-600 opacity-75">
                  <span className="flex items-center space-x-1" >
                      <CalendarDaysIcon className="w-3 h-3" />
                      <span>{formatDate(date).toLocaleUpperCase()}</span>
                  </span>

                  <span className="flex items-center space-x-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{formatReadingTime(readingTime)}</span>
                  </span>
              </span>
          </div>
        </div>
    </div>
</a></Link> 
}


const LatestArticles = ({props_post}:{props_post?:Post[]}) => {
  let first_six_posts;
  const posts:Post[] = usePosts(state => state.posts)
  const router = useRouter();
  props_post? first_six_posts = props_post : first_six_posts = posts?.slice(0, 6);
  const { t } = useTranslation('common')

  return (
    <div className="mt-5">
        <div className="flex items-center justify-between">
            <p className="text-xl font-bold opacity-90">{t("Latest Articles")}</p>
            <button className="flex items-center justify-center p-1 px-2 space-x-1 text-gray-400 bg-white rounded-md shadow-md">
              <span>{t("SEE ALL ARTICLES")}</span> 
              <span className="flex items-center font-bold text-black">
                <ChevronRightIcon className="w-4 h-4"/>
                <ChevronRightIcon className="w-4 h-4"/>
              </span>
            </button>
        </div>

        <div className="grid grid-cols-1 my-6 space-y-6 md:grid-cols-3 md:space-y-0 md:gap-8 ">
        {first_six_posts?.length > 0 && first_six_posts.map((post) => 
            <Article 
                key={post.id}
                title={post.title}
                uri={post.translation?.uri}
                featuredImage={post.featuredImage}
                categories={post.categories}
                date={post.date}
                readingTime = {post.readingTime}
                difficulties = {post.difficulties}
             />
            )
          }
        </div>
    </div>
  )
}



export default LatestArticles