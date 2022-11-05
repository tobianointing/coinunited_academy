import { CalendarDaysIcon} from "@heroicons/react/24/solid"
import { useFeaturedPost } from "../lib/hooks"
import { Difficulty, formatDate } from "./LatestArticles"
import OptimizedImage from "./OptimizedImage"
import Link from "next/link";
import useTranslation from 'next-translate/useTranslation'
import { parse } from 'node-html-parser'
import Image from "next/image"

export const getReadingTime = (htmlstring?:string) => {
    if (!htmlstring) return '1m'

    const wordsPerMinute = 225;
    const doc = parse(
        `
        <div id="content">
            ${htmlstring}
        </div>
        `);

    const text = doc.textContent || '';

    const numberOfWords = text.split(/\s/g).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return `${minutes}m`;
}



const Top = () => {
    const featuredPost = useFeaturedPost(state => state.post)
    const { t } = useTranslation('common')

    return (
    <div className="grid grid-cols-1 my-6 space-y-6 md:grid-cols-2 md:space-y-0 md:gap-14">
        <div className="md:mt-24">
            <p className="opacity-80 text-[1.125rem]">{t("DISCOVER EVERYTHING ABOUT")}</p>
            <h1 className="my-8 text-[3.75rem] break-normal leading-[3.5rem] md:text-5xl font-Dm">
                {t('Blockchain & Crypto')}
            </h1>
            <p className="mt-10 text-sm text-gray-700 opacity-90">
                {t("crypto-guide")}
            </p>
        </div>

        {featuredPost?.uri && <Link href={featuredPost?.uri ? featuredPost?.uri : '/' }><a>
            <p className="mb-4 text-base md:text-[1.625rem] font-bold">FEATURED</p>
            <div className="overflow-hidden shadow-xl rounded-xl">
                <OptimizedImage src={featuredPost?.featuredImage?.node?.sourceUrl} alt="featured image" className="w-full h-60"/>
                <div className="p-6 px-6">
                    <p className="text-xl font-bold">{featuredPost?.title}</p>
                    <div className="flex items-center justify-between mt-8">
                        <Difficulty difficulty={featuredPost?.difficulties?.edges[0]?.node?.name} />
                        
                        <span className="flex items-center space-x-3 text-gray-600 opacity-75">
                            <span className="flex items-center space-x-2" >
                                <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                                <span>{formatDate(featuredPost?.date)}</span>
                            </span>

                            <span className="flex items-center space-x-2">
                                <Image src='/img/clock.svg' objectFit="cover" width={16} height={16} />
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
