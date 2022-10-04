import Container, {Container_2} from "../components/Container";
import OptimizedImage from "../components/OptimizedImage";
import { CalendarDaysIcon, ChevronRightIcon, ClockIcon } from "@heroicons/react/24/solid"
import {ShareIcon} from "@heroicons/react/24/outline"
import LatestArticles, { Difficulty } from "../components/LatestArticles";
import { Allposts, Post } from "../custom_interface";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";
import { formatDate, formatReadingTime } from "../components/LatestArticles";

const ArticleDetail = (props:{article:Post}) => {
    const {article} = props;
    const latest:Allposts[] =[
        {
            __typename : "Post",
            node: {
                id: "cG9zdDoxMjM=",
                title: "How to buy Bitcoin in Nigeria",
                date: "2021-08-01T00:00:00",
                featuredImage: {
                    node: {
                        sourceUrl: "/img/featured.jpg",
                        altText: "How to buy Bitcoin in Nigeria"
                    }
                },
                uri: "/how-to-buy-bitcoin-in-nigeria/"
            }
        },
    ]


    return (
        <main>
        <Container_2>
            <div className="flex items-center text-xs font-bold space-x-3">
                <span className="px-2 p-1 rounded-md bg-black text-white">Crypto</span>
                <span className="px-2 p-1 rounded-md bg-black text-white">APY</span>
            </div>
            <div className="w-full mt-6 mb-9">
                <OptimizedImage src={article?.featuredImage?.node?.sourceUrl} className="rounded-3xl h-[30rem]" alt="post image"/>
            </div>
            <div className="flex items-center space-x-1 text-md my-6 font-bold text-gray-500">
                    <span>Home</span>
                        <ChevronRightIcon className="h-3 w-3"/>
                    <span>Articles</span>
                        <ChevronRightIcon className="h-3 w-3"/>
                    <span>{article?.title}</span>
            </div>

            <h1 className="text-5xl font-bold">{article?.title}</h1>
            
            <div className="flex items-center justify-between my-6 text-gray-500">
                <div className="flex items-center space-x-6">
                        <p>By {article?.author?.node?.firstName} {article?.author?.node?.lastName} </p>
                        <Difficulty difficulty="intermediate" />
                        <span className="flex items-center space-x-6 opacity-75 text-gray-600">
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

                    <ShareIcon className="h-6 w-6" />
            </div>

            <div dangerouslySetInnerHTML={{__html: article?.content as string}}></div>
        </Container_2>

        <div className="bg-gray-100">
            <Container>
                <LatestArticles props_post={latest}/>
            </Container>
        </div>

        </main>
    );
}


export default ArticleDetail;


export const getStaticProps:GetStaticProps = async ({params}) => {
    const slug = params?.slug
    const GET_POST_BY_SLUG = gql`
        query GetPostsByCategory($id: ID!) {
            post(id: $id, idType: URI) {
            author {
                node {
                firstName
                lastName
                }
            }
            featuredImage {
                node {
                altText
                sourceUrl(size: POST_THUMBNAIL)
                }
            }
            difficulties {
                nodes {
                name
                }
            }
            date
            uri
            title
            content(format: RENDERED)
            readingTime
            id
            }
        }
        `

        const response = await client.query({
            query: GET_POST_BY_SLUG,
            variables: {
                id: slug
            }
        })

        const article = await response.data.post
        // console.log(article)
        return {
            props: {
                article
            }
        }
    }



    export const getStaticPaths:GetStaticPaths = async () => {
        return {
            paths: [],
            fallback: true
        }
    }

