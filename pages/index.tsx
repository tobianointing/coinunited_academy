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
import Footer from '../components/Footer'
import {client} from '../lib/apollo'
import { DocumentNode, gql } from '@apollo/client'
import { IData } from '../custom_interface'
import {usePosts, useCategories, useFeaturedPost} from '../lib/hooks'
import { useEffect } from 'react'

const Home = (props:IData) => {
  const {categories, posts, featuredPost} = props
  const setPosts = usePosts(state => state.setPosts)
  const setCategories = useCategories(state => state.setCategories)  
  const setFeaturedPost = useFeaturedPost(state => state.setFeaturedPost)


  useEffect(() => {
    setPosts(posts);
    setCategories(categories);
    setFeaturedPost(featuredPost);
  }, [])


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
                        <img src="img/announcement.svg" className='w-3/5 mx-auto md:w-full object-cover' alt="announcement" />
                    </div>

                    <div className='md:w-3/4 w-full'>
                        <div className="text-center md:text-left">
                        <h3 className='font-bold text-3xl md:text-5xl w-full md:tracking-[.06em]'>Make Every Minute Count.</h3>
                        
                        <p className='my-4 mt-6 font-bold text-lg'>Summer Limited Offer! <br /> FREE subscription to first-hand exclusive crypto news.</p>
                        
                        <div className='flex items-center space-x-5 my-9'>
                            <input type="text" placeholder='Enter your email address' className='border placeholder:font-semibold border-gray-300 rounded-sm p-1 bg-gray-100 px-2 w-80' />
                            <button className='bg-gray-100 px-4 p-1 border border-gray-300 font-semibold rounded-sm'>Subscribe</button>
                        </div>                      


                        </div>
                        <div className="flex font-bold items-center space-x-3">
                            <input type="checkbox" name="subscribe" />
                            <p>I have read and agree to CoinUnited.io's <span className='text-amber-600'>Terms of Service</span></p>
                        </div>

                    </div>
                </div>
          </Container>
        </div>

        <div className='bg-footer'>
            <Container>
               <Footer />
            </Container>
        </div>
      </div>
    </main>
  )
}


export default Home


export const getServerSideProps = async () => {
  const GET_ALL_POSTS:DocumentNode = gql`
  query GetPostsByCategory {
    categories(where: {orderby: COUNT, order: DESC}, first: 5) {
      nodes {
        name
        posts(first: 5) {
          nodes {
            title
            featuredImage {
              node {
                sourceUrl(size: POST_THUMBNAIL)
              }
            }
          }
        }
      }
    }
    posts(first: 12, where: {orderby: {order: DESC, field: DATE}}) {
      edges {
        node {
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
        }
      }
    }
    featuredPosts(first: 1) {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        uri
        id
      }
    }
  }     
  `
  const {data} = await client.query({
    query: GET_ALL_POSTS
  });

  const categories = await data.categories.nodes;
  const posts = await data.posts.edges;
  const featuredPost = await data?.featuredPosts?.nodes[0];

  return  {
    props: {
      categories,
      posts,
      featuredPost
    }
  }
}

