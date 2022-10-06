import { CalendarDaysIcon, ClockIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid"
import { Post } from "../custom_interface"
import { usePosts} from "../lib/hooks"
import OptimizedImage from "./OptimizedImage"
import { titleCase } from "./TopMain"
import Link from "next/link";
import { useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';

export const Difficulty =( {difficulty}:{difficulty?:string}) =>{
  let src:string, bg:string;
  
  switch (difficulty) {
    case 'beginner':
        src = '/img/greendot.svg'
        bg = 'bg-green-200'
        break;
    case 'intermediate':
        src = '/img/yellowdot.svg'
        bg = 'bg-orange-200'
        break;
    case 'advanced':
        src = '/img/reddot.svg'
        bg = 'bg-red-200'
        break;
    default:
        src = '/img/greendot.svg'
        bg = 'bg-green-200'  
  }

  const className:string = `flex text-gray-700 ${bg} rounded-md  p-1 px-3 items-center space-x-2 text-sm`
  
  

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

  return <Link href={uri? uri : '/'}><a  className="rounded-2xl relative  bg-white flex flex-col shadow-lg hover:shadow-2xl overflow-hidden">
    <div className="relative">
      <OptimizedImage src={featuredImage?.node?.sourceUrl} alt="featured image" className="h-56 w-full"/>
      <span className="px-2 p-1 bg-black rounded-md absolute right-2 text-white text-sm top-3">
        {categories?.nodes[0]?.name}
      </span>
    </div>

    <div className="p-4 flex-grow">
        <p className="text-lg font-bold mb-7 ssm:mb-14 ms:mb-8">{title}</p>
        <div className="bottom-3 w-full left-0 px-4 absolute">
          <div className="flex text-xs ssm:flex-col ms:flex-row items-center ssm:items-start ms:items-center justify-between ssm:space-y-3 ms:space-y-0 mt-8">
              <Difficulty difficulty={difficulties?.edges[0]?.node?.name} />
              <span className="flex text-sm items-center space-x-3 opacity-75 text-gray-600">
                  <span className="flex space-x-1 items-center" >
                      <CalendarDaysIcon className="h-3 w-3" />
                      <span>{formatDate(date).toLocaleUpperCase()}</span>
                  </span>

                  <span className="flex space-x-1 items-center">
                      <ClockIcon className="h-3 w-3" />
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
  const router:NextRouter = useRouter();
  props_post? first_six_posts = props_post : first_six_posts = posts?.slice(0, 6);
  

  // useEffect(() => {
  //   router.events.on('routeChangeComplete', () => {
  //     router.reload()
  //   });

  //   return () => {
  //     router.events.off('routeChangeComplete', () => {
  //       router.reload()
  //     });
  //   }
  // }, [])

  return (
    <div className="mt-5">
        <div className="flex justify-between items-center">
            <p className="font-bold text-xl opacity-90">Latest Articles</p>
            <button className="rounded-md flex items-center space-x-1 justify-center p-1 px-2 text-gray-400 bg-white shadow-md">
              <span>SEE ALL ARTICLES</span> 
              <span className="text-black font-bold flex items-center">
                <ChevronRightIcon className="h-4 w-4"/>
                <ChevronRightIcon className="h-4 w-4"/>
              </span>
            </button>
        </div>

        <div className="grid grid-cols-1 my-6 md:grid-cols-3 space-y-6 md:space-y-0 md:gap-8 ">
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
