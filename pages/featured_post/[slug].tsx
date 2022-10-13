import Container, {Container_2} from "../../components/Container";
import OptimizedImage from "../../components/OptimizedImage";
import { CalendarDaysIcon, ChevronRightIcon, ClockIcon, LinkIcon } from "@heroicons/react/24/solid"
import {ShareIcon} from "@heroicons/react/24/outline"
import LatestArticles, { Difficulty } from "../../components/LatestArticles";
import {  Post } from "../../custom_interface";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../../lib/apollo";
import { formatDate, formatReadingTime } from "../../components/LatestArticles";
import Link from "next/link";
import {getReadingTime} from '../../components/Top'
import parse from 'html-react-parser';
import Head  from "next/head";
import { GET_POST_BY_SLUG } from "../../lib/gql_query/featured";

const truncateWord = (str: string, num: number) => {
    if (!str) return ''    
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num).trim() + "...";
}

const ArticleDetail = (props:{article:Post, posts:Post[], fullHead:string}) => {
    const {article:initArticle, posts, fullHead} = props;
    
    // add reading time to article
    const article = {...initArticle, readingTime: getReadingTime(initArticle?.content)};
    const filteredPosts = posts?.filter(post => post.id !== article.id).slice(0,3);
  
    return (
        <main>
          <Head>
            <title>{article?.title}</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            {(fullHead) ? parse(fullHead): ""}
          </Head>

        <Container_2>
            <div className="flex items-center text-xs font-bold space-x-3">
                {article?.tags && article?.tags?.nodes?.map((tag) =>
                    <span key={tag.id} className="px-2 p-1 rounded-md bg-black text-white">{tag.name}</span>)
                }
            </div>
            <div className="w-full mt-6 mb-9">
                <OptimizedImage src={article?.featuredImage?.node?.sourceUrl} className="rounded-3xl h-[30rem]" alt="post image"/>
            </div>
            <div className="flex items-center space-x-1 text-md my-6 font-bold text-gray-500">
                    <Link href='/'><a className="hover:underline hover:text-amber-600">Home</a></Link>
                    <ChevronRightIcon className="h-3 w-3"/>
                    <span>Articles</span>
                    <ChevronRightIcon className="h-3 w-3"/>
                    <p className="flex-grow">{truncateWord(article?.title, 15)}</p>
            </div>

            <h1 className="text-5xl font-bold">{article?.title}</h1>
            
            <div className="flex items-center text-xs md:text-md justify-between my-6 text-gray-500">
                <div className="flex items-center space-x-3 md:space-x-5">
                        <p>By {article?.author?.node?.firstName} {article?.author?.node?.lastName} </p>
                        <Difficulty difficulty="intermediate" />
                        <span className="flex items-center space-x-3 md:space-x-5 opacity-75 text-gray-600">
                            <span className="flex space-x-1 items-center" >
                                <CalendarDaysIcon className="h-4 w-4" />
                                <span>{formatDate(article?.date)}</span>
                            </span>

                            <span className="flex space-x-1 items-center">
                                <ClockIcon className="h-4 w-4" />
                                <span>{formatReadingTime(article?.readingTime)}</span>
                            </span>
                        </span>
                    </div>
                    <div className="relative group">
                        <ShareIcon className="h-6 w-6 mx-2" />
                        <span className="grid-cols-4 hidden group-hover:grid cursor-pointer absolute gap-4 rounded-sm shadow-[-6px_8px_8px_-6px_rgba(0,0,0,0.4)] right-1 top-6 p-4 min-w-[12rem] bg-white z-10">
                            <img src='/img/fb.svg' alt="facebook" className="h-6 w-6" />
                            <img src='/img/medium.svg' alt="twitter" className="h-6 w-6" />
                            <img src='/img/twitter.svg' alt="twitter" className="h-6 w-6" />
                            <img src='/img/linkedin.svg' alt="linkedin" className="h-6 w-6" />
                            <img src='/img/tg.svg' alt="telegram" className="h-6 w-6" /> 
                            <LinkIcon className="h-4 w-4" />   
                        </span>
                    </div>
            </div>

            <div className="article-container" dangerouslySetInnerHTML={{__html: article?.content as string}}>

            </div>
        </Container_2>
          {filteredPosts?.length > 0 && <div className="bg-gray-100">
                                        <Container>
                                          <LatestArticles props_post={filteredPosts}/>
                                        </Container>
                                        </div>
        }
        </main>
    );
}


export default ArticleDetail;


export const getStaticProps:GetStaticProps = async ({params, locale}) => {
    const slug = params?.slug
    const response = await client.query({
        query: GET_POST_BY_SLUG,
        variables: {
            id: slug,
            language: locale?.toUpperCase(),
            lang: locale?.toUpperCase()
        }
    });
    

    try{
      const article_found = response.data?.featuredPost?.translation 
      const article = article_found ? article_found : response?.data?.featuredPost
      const fullHead = response?.data?.featuredPost?.seo?.fullHead  
      
      const posts = response?.data?.posts?.nodes
      if (!article) {
          throw new Error('No article found')
      }
      
      return {
          props: {
              article: article ? article : {},
              posts: posts ? posts : [],
              fullHead: fullHead ? fullHead : ''
          },
          revalidate: 150
      }
    
    }
      catch{
          return {
              notFound: true
          }
      }
  }



  export const getStaticPaths:GetStaticPaths = async () => {
      return {
          paths: [],
          fallback: true
      }
  }

