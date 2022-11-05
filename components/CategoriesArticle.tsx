import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import { Post } from "../custom_interface"
import { useCategories } from "../lib/hooks"
import { titleCase } from "./TopMain"
import OptimizedImage from "./OptimizedImage"
import { formatDate, formatReadingTime, Difficulty } from "./LatestArticles"
import Link from "next/link"
import Image from "next/image"

interface CatPost extends Post {
  image: string
}

const CatArticle = ({ title, image, difficulties, date, readingTime, uri }: CatPost) => {
  return (
    <Link href={uri ? uri : "/"}>
      <a className="flex md:items-stretch flex-col  lg:flex-row rounded-xl overflow-hidden shadow-lg hover:shadow-xl lg:h-[8.3125rem]">
        <div className="w-full lg:w-2/5 h-56 lg:h-full">
          <OptimizedImage src={image} className="w-full h-full" alt={title} />
        </div>

        <div className="w-full lg:w-3/5 relative flex-grow p-3">
          <h1 className="font-bold mb-8">{title}</h1>

          <div className="flex absolute bottom-2 left-0 w-full px-3 text-base ms:flex-row items-center ms:items-center justify-between ms:space-y-0 mt-8">
            <Difficulty difficulty={difficulties?.edges[0]?.node?.name} />

            <span className="flex items-center space-x-3 opacity-75 text-gray-600">
              <span className="flex space-x-1 items-center">
                <CalendarDaysIcon className="h-3 w-3" />
                <span>{formatDate(date)}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <Image src="/img/clock.svg" objectFit="cover" width={12} height={12} />
                <span>{formatReadingTime(readingTime)}</span>
              </span>
            </span>
          </div>
        </div>
      </a>
    </Link>
  )
}

const CategoryBlock = ({ name, posts }: { name: string; posts?: Array<Post> }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-xl">{name}</h3>

        <button className="hidden md:block p-2 px-3 space-x-2 text-[0.75rem] text-gray-400 hover:bg-[#F2F2F2] bg-white rounded-md">
          <span>SEE ALL ARTICLES</span>
          <span className="font-semibold">
            {">"}
            {">"}
          </span>
        </button>
     
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-7 gap-6">
        {posts?.map((post, index) => (
          <CatArticle
            key={index}
            title={post.title}
            image={post.featuredImage?.node?.sourceUrl}
            uri={post.translation?.uri}
            date={post.date}
            readingTime={post.readingTime}
            difficulties={post.difficulties}
          />
        ))}
      </div>
      <div className="md:hidden flex justify-center mt-10">
        <button className="p-2 px-3 space-x-2 text-[0.75rem] text-gray-400 hover:bg-[#F2F2F2] bg-white rounded-md">
          <span>SEE ALL ARTICLES</span>
          <span className="font-semibold">
            {">"}
            {">"}
          </span>
        </button>
      </div>
    </>
  )
}

const CategoriesArticle = () => {
  const categories = useCategories((state) => state.categories)
  return (
    <div className="my-5">
      {categories?.map(
        (category, index) =>
          category.posts.nodes.length > 0 &&
          category.name.toLowerCase() !== "uncategorized" && (
            <div>
              <CategoryBlock
                key={index}
                name={titleCase(category.name)}
                posts={category?.posts?.nodes}
              />
              {index !== categories.length - 1 && (
                <hr className="my-[2.5rem] h-[0.125rem] bg-black opacity-5" />
              )}
            </div>
          )
      )}
    </div>
  )
}

export default CategoriesArticle
