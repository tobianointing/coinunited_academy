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
import { GlossaryItem, IData } from '../custom_interface'
import {usePosts, useCategories, useFeaturedPost, useDifficuties, useTags, useGlossary} from '../lib/hooks'
import { useEffect } from 'react'
import {ContainImage} from '../components/OptimizedImage'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import {POST_DATA_FRAGMENT} from '../lib/fragments'
import { GET_GLOSSARIES_KEY, GET_GLOSSARIES_BY_KEY } from '../lib/gql_query/glossary'


const Home = (props:IData) => {
  const {categories, posts, featuredPost, difficulties, tags} = props
  const setPosts = usePosts(state => state.setPosts)
  const setCategories = useCategories(state => state.setCategories)  
  const setFeaturedPost = useFeaturedPost(state => state.setFeaturedPost)
  const setDifficulties = useDifficuties(state => state.setDifficulties)  
  const setTags = useTags(state => state.setTags)
  const setGlossaries = useGlossary(state => state.setGlossaries)
  
  useEffect(() => {
    setPosts(posts);
    setCategories(categories);
    setFeaturedPost(featuredPost);
    setDifficulties(difficulties);
    setTags(tags);
  }, [posts, categories, featuredPost,difficulties,tags])



  useEffect(() => {
    (async ()=>{

        const res = await client.query({query: GET_GLOSSARIES_KEY})
        const keys = await res?.data?.keyAlphabets?.nodes
        const randomKeys = await keys?.sort(() => Math.random() - 0.5).slice(0, 2)
        const randomKeysName = await randomKeys?.map((key:{id:string}) => key?.id)            
        
        const items = randomKeysName?.map(async(keyName:string) => {
              const res = await client.query({
                          query: GET_GLOSSARIES_BY_KEY,
                          variables: {
                              id: keyName
                          }
                      })
              const item =  await res?.data?.keyAlphabet?.glossaries?.nodes[0]
              return item
            }
        );
        const glossaries = await Promise.all(items)
        setGlossaries(glossaries)

    })();
  },[])


  const { t } = useTranslation('common')

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

      
          <div className='bg-gray-100'>
            <Container>
              <MoreArticles />
            </Container>
          
          </div>
      
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
                        <h3 className='font-bold text-3xl md:text-5xl w-full md:tracking-[.06em]'>{t("make-every-minute-count")}</h3>
                        
                        <p className='my-4 mt-6 font-bold text-lg'>{t("Summer Limited Offer")}! <br /> {t("free-subscription")}</p>
                        
                        <div className='flex items-center space-x-5 justify-center md:justify-start my-9'>
                            <input type="text" placeholder={t('Enter your email address')} className='border placeholder:font-semibold border-gray-300 rounded-sm p-1 bg-gray-100 px-2 w-80' />
                            <button className='bg-gray-100 px-4 p-1 border border-gray-300 font-semibold rounded-sm'>Subscribe</button>
                        </div>                      


                        </div>
                        <div className="flex font-bold items-center justify-center md:justify-start space-x-3">
                            <input type="checkbox" name="subscribe" /> <br />
                            <span>{t("i-agree")} <span className='text-amber-600'>{t("Terms of Service")}</span></span>
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
  ${POST_DATA_FRAGMENT}

  query GetPostsByCategory($language: LanguageCodeFilterEnum!) {
  categories(where: {orderby: COUNT, order: DESC, language: $language}, first: 5) {
    nodes {
      name
      posts(first: 5) {
        nodes {
          ...postData
        }
      }
    }
  }
  posts(
    first: 12
    where: {orderby: {order: DESC, field: DATE}, language: $language}
  ) {
    nodes {
      ...postData
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
 
  try{
    const {data} = await client.query({
      query: GET_ALL_POSTS,
      variables: {
        language: locale?.toLocaleUpperCase()
      }
    });
  
    const categories = await data?.categories?.nodes;
    const posts = await data?.posts?.nodes;
    const featuredPost = await data?.featuredPosts?.nodes[0];
    const difficulties = await data?.difficulties?.nodes; 
    const tags = await data?.tags?.nodes;
  
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

