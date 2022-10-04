import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/solid"
import { useFeaturedPost } from "../lib/hooks"
import { Difficulty, formatDate, formatReadingTime } from "./LatestArticles"
import OptimizedImage from "./OptimizedImage"
import Link from "next/link";

const getReadingTime = (htmlstring?:string) => {
    if (!htmlstring) return '1m'
    const wordsPerMinute = 225;
    const parser = new DOMParser();
    const doc = parser.parseFromString(
        `
        <div id="content">
            ${htmlstring}
        </div>
        `
        , 'text/html');

    const text = doc.body.textContent || '';

    const numberOfWords = text.split(/\s/g).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return `${minutes}m`;
}



const Top = () => {
    const featuredPost = useFeaturedPost(state => state.post)
    

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0 md:gap-14 my-6">
        <div className="md:mt-24">
            <p className="font-semibold opacity-80">DISCOVER EVERYTHING ABOUT</p>
            <h2 className="text-6xl md:text-5xl my-8 font-bold break-normal font-Dm">
                Blockchain {'&'} Crypto
            </h2>
            <p className="mt-10 text-sm opacity-90 text-gray-700">
                Here is your all-in-one Blockchain {'&'} Crypto guide. 
                You can find everything you need to know about crypto here. We covered you with articles designed to help you learn about crypto, 
                whether you are a newbie or an experienced trader.
            </p>
        </div>

        {featuredPost && <Link href={featuredPost?.uri}><a>
            <p className="text-2xl mb-4 font-bold">FEATURED</p>
            <div className="rounded-xl shadow-xl overflow-hidden">
                <OptimizedImage src={featuredPost?.featuredImage?.node?.sourceUrl} alt="featured image" className="h-60 w-full"/>
                <div className="p-6 px-6">
                    <p className="text-xl font-bold">{featuredPost?.title}</p>
                    <div className="flex items-center justify-between mt-8">
                        <Difficulty difficulty={featuredPost?.difficulties?.edges[0]?.node?.name} />
                        
                        <span className="flex items-center space-x-3 opacity-75 text-gray-600">
                            <span className="flex space-x-2 items-center" >
                                <CalendarDaysIcon className="h-5 w-5 text-gray-600" />
                                <span>{formatDate(featuredPost?.date)}</span>
                            </span>

                            <span className="flex space-x-2 items-center">
                                <ClockIcon className="h-5 w-5 text-gray-600" />
                                <span>{getReadingTime(featuredPost?.content)}</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

        </a>
        </Link>
        }

    </div>
  )
}

export default Top
