import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/solid"
import { useFeaturedPost } from "../lib/hooks"
import OptimizedImage from "./OptimizedImage"

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

        {featuredPost && <div>
            <p className="text-2xl mb-4 font-bold">FEATURED</p>
            <div className="rounded-xl shadow-xl overflow-hidden">
                <OptimizedImage src={featuredPost?.featuredImage?.node?.sourceUrl} alt="featured image" className="h-60 w-full"/>
                <div className="p-6 px-6">
                    <p className="text-xl font-bold">{featuredPost.title}</p>
                    <div className="flex items-center justify-between mt-8">
                        <span className="flex text-gray-700 bg-orange-200 rounded-md  p-1 px-3 items-center space-x-2 text-sm">
                            <img src="img/yellowdot.svg" alt="yellow dot" />
                            <span>Intermediate</span>
                        </span>
                        <span className="flex items-center space-x-3 opacity-75 text-gray-600">
                            <span className="flex space-x-2 items-center" >
                                <CalendarDaysIcon className="h-5 w-5 text-gray-600" />
                                <span>23 JUN 2023</span>
                            </span>

                            <span className="flex space-x-2 items-center">
                                <ClockIcon className="h-5 w-5 text-gray-600" />
                                <span>5m</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

        </div>
        }

    </div>
  )
}

export default Top