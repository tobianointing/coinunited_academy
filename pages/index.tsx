import Head from 'next/head'
import Image from 'next/image'
import CategoriesArticle from '../components/CategoriesArticle'
import Container from '../components/Container'
import LatestArticles from '../components/LatestArticles'
import MoreArticles from '../components/MoreArticles'
import Top from '../components/Top'
import TopMainDesktop from '../components/TopMain'
import advert_one from '../public/img/advert_one.png'
import GlossarySection from '../components/GlossarySection'
import {client} from '../lib/apollo'
import { DocumentNode, gql } from '@apollo/client'
import { IData } from '../custom_interface'
import {usePosts, useCategories, useFeaturedPost, useDifficuties, useTags} from '../lib/hooks'
import { useEffect } from 'react'
import {ContainImage} from '../components/OptimizedImage'
import { GetStaticProps } from 'next'



const Home = (props:IData) => {
  const {categories, posts, featuredPost, difficulties, tags} = props
  const setPosts = usePosts(state => state.setPosts)
  const setCategories = useCategories(state => state.setCategories)  
  const setFeaturedPost = useFeaturedPost(state => state.setFeaturedPost)
  const setDifficulties = useDifficuties(state => state.setDifficulties)  
  const setTags = useTags(state => state.setTags)
  
  useEffect(() => {
    setPosts(posts);
    setCategories(categories);
    setFeaturedPost(featuredPost);
    setDifficulties(difficulties);
    setTags(tags);
  }, [posts, categories, featuredPost,difficulties,tags])


  return (
    <main className='mt-2'>
      <Head>
        <title>CoinUnited IO</title>
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <div>
        <div className='bg-white'>
          <Container>
              <TopMainDesktop />
              <Top />
          </Container>
        </div>
        
        <div className='bg-gray-100'>
            <Container>
              <LatestArticles />
            </Container>
        </div>

        <div className='bg-white'>
            <Container>
              <div className='my-2 md:my-8'>
                <Image src={advert_one} layout='responsive' objectFit='cover'/>
              </div>
            </Container>
        </div>

      {posts?.length > 6 &&
          <div className='bg-gray-100'>
            <Container>
              <MoreArticles />
            </Container>
          
          </div>
        }
        <div className="bg-white">
          <Container>
              <CategoriesArticle />
          </Container>
        </div>
        
        <div className="bg-gray-100">
          <Container>
              <GlossarySection />
          </Container>
        </div>

        <div className="bg-white">
          <Container>
                <div className="flex flex-col md:flex-row my-8 items-center md:space-x-20 md:justify-between">

                    <div className='md:w-1/4 p-8 md:p-1 w-full'>
                        <ContainImage src="/img/announcement.svg" className='w-3/5 mx-auto md:w-full h-64' alt="announcement" />
                    </div>

                    <div className='md:w-3/4 w-full'>
                        <div className="text-center md:text-left">
                        <h3 className='font-bold text-3xl md:text-5xl w-full md:tracking-[.06em]'>Make Every Minute Count.</h3>
                        
                        <p className='my-4 mt-6 font-bold text-lg'>Summer Limited Offer! <br /> FREE subscription to first-hand exclusive crypto news.</p>
                        
                        <div className='flex items-center space-x-5 justify-center md:justify-start my-9'>
                            <input type="text" placeholder='Enter your email address' className='border placeholder:font-semibold border-gray-300 rounded-sm p-1 bg-gray-100 px-2 w-80' />
                            <button className='bg-gray-100 px-4 p-1 border border-gray-300 font-semibold rounded-sm'>Subscribe</button>
                        </div>                      


                        </div>
                        <div className="flex font-bold items-center justify-center md:justify-start space-x-3">
                            <input type="checkbox" name="subscribe" /> <br />
                            <span>I have read and agree to CoinUnited.io's <span className='text-amber-600'>Terms of Service</span></span>
                        </div>

                    </div>
                </div>
          </Container>
        </div>
      </div>
    </main>
  )
}


export default Home


export const getStaticProps:GetStaticProps = async ({locale}) => {
  
  const GET_ALL_POSTS:DocumentNode = gql`
  query GetPostsByCategory($language: LanguageCodeFilterEnum!) {
  categories(where: {orderby: COUNT, order: DESC, language: $language}, first: 5) {
    nodes {
      name
      posts(first: 5) {
        nodes {
          title
          uri
          featuredImage {
            node {
              sourceUrl(size: POST_THUMBNAIL)
            }
          }
          readingTime
          date
          difficulties(first: 1) {
            edges {
              node {
                name
              }
            }
          }
          translation(language: EN) {
            uri
          }
        }
      }
    }
  }
  posts(
    first: 12
    where: {orderby: {order: DESC, field: DATE}, language: $language}
  ) {
    nodes {
      id
      title
      uri
      featuredImage {
        node {
          altText
          sourceUrl(size: POST_THUMBNAIL)
        }
      }
      categories {
        nodes {
          name
        }
      }
      date
      readingTime
      difficulties(first: 1) {
        edges {
          node {
            name
          }
        }
      }
      translation(language: EN) {
            uri
        }
    }
  }
  featuredPosts(
    first: 1
    where: {orderby: {order: DESC, field: DATE}, language: $language}
  ) {
    nodes {
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      uri
      id
      difficulties(first: 1) {
        edges {
          node {
            name
          }
        }
      }
      date
      content
    }
  }
  difficulties {
    nodes {
      id
      name
    }
  }
  tags(first: 12, where: {orderby: COUNT, order: DESC}) {
    nodes {
      id
      name
    }
  }
}
  `
  const {data} = await client.query({
    query: GET_ALL_POSTS,
    variables: {
      language: locale?.toLocaleUpperCase()
    }
  });

  
  try{
    const categories = await data.categories.nodes;
    const posts = await data.posts.nodes;
    const featuredPost = await data?.featuredPosts?.nodes[0];
    const difficulties = await data.difficulties.nodes; 
    const tags = await data.tags.nodes;
  
  return  {
    props: {
      categories: categories ? categories : [],
      posts: posts ? posts : [],
      featuredPost : featuredPost ? featuredPost : {},
      difficulties : difficulties ? difficulties : [],
      tags: tags ? tags : []
    },
    revalidate: 150
  }
  }catch{
    return {
      notFound: true
    }
  }
}

