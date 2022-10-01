import { CalendarDaysIcon, ClockIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { Allposts, Post } from "../custom_interface"
import { usePosts} from "../lib/hooks"
import OptimizedImage from "./OptimizedImage"

export const Article = ({title, uri, featuredImage, categories}:Post) => <div className="rounded-2xl bg-white shadow-lg hover:shadow-2xl overflow-hidden">
<div className="relative">
  <OptimizedImage src={featuredImage?.node?.sourceUrl} alt="featured image" className="h-40 w-full"/>
  <span className="px-2 p-1 bg-black rounded-md absolute right-2 text-white text-sm top-3">
    {categories?.nodes[0]?.name}
  </span>
</div>

<div className="p-4">
    <p className="text-lg font-bold">{title}</p>
    <div className="flex items-center justify-between mt-8">
        <span className="flex text-gray-700 bg-orange-200 rounded-md  p-1 px-3 items-center space-x-2 text-sm">
            <img src="img/yellowdot.svg" alt="yellow dot" />
            <span>Intermediate</span>
        </span>
        <span className="flex text-sm items-center space-x-3 opacity-75 text-gray-600">
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



const LatestArticles = () => {
  const posts:Allposts[] = usePosts(state => state.posts)
  const first_six_posts = posts?.slice(0, 6)
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
        {first_six_posts?.length > 0 && first_six_posts.map((post, index) => 
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
    </div>
  )
}



export default LatestArticles
