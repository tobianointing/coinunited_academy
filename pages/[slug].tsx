import Container, { Container_2 } from "../components/Container"
import OptimizedImage from "../components/OptimizedImage"
import { CalendarDaysIcon, ChevronRightIcon, LinkIcon } from "@heroicons/react/24/solid"
import share from "public/img/share.svg"
import LatestArticles, { Difficulty } from "../components/LatestArticles"
import { Post } from "../custom_interface"
import { GetStaticPaths, GetStaticProps } from "next"
import { client } from "../lib/apollo"
import { gql } from "@apollo/client"
import { formatDate, formatReadingTime } from "../components/LatestArticles"
import Link from "next/link"
import Head from "next/head"
import parse from "html-react-parser"
import Image from "next/image"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

export const truncateWord = (str?: string, num?: number) => {
  if (!str) return ""

  if (num && str.length <= num) {
    return str
  }
  return str.slice(0, num).trim() + "..."
}

const ArticleDetail = (props: { article: Post; posts: Post[]; fullHead: string }) => {
  const { article, posts, fullHead } = props
  const filteredPosts = posts?.filter((post) => post.id !== article.id).slice(0, 3)
  return (
    <main>
      <Head>
        <title>{article?.title}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="description" content={truncateWord(article?.content, 150)} />
        {fullHead ? parse(fullHead) : ""}
      </Head>

      <Container_2>
        <div className="flex items-center space-x-3 text-xs font-bold">
          {article?.tags &&
            article?.tags?.nodes?.map((tag) => (
              <span key={tag.id} className="p-1 px-2 text-white bg-black rounded-md">
                {tag.name}
              </span>
            ))}
        </div>
        <div className="w-full mt-6 mb-9">
          <OptimizedImage
            src={article?.featuredImage?.node?.sourceUrl}
            className="rounded-3xl h-[201px] md:h-[405px]"
            alt="post image"
          />
        </div>
        <div className="flex items-center my-6 space-x-1 font-bold text-gray-500 text-md">
          <Link href="/">
            <a className="hover:underline hover:text-site-amber">Home</a>
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span>Articles</span>
          <ChevronRightIcon className="w-3 h-3" />
          <p className="flex-grow">{truncateWord(article?.title, 15)}</p>
        </div>

        <h1 className="text-[2rem] md:text-5xl leading-[2.375rem] font-bold">{article?.title}</h1>

        <div className="md:flex md:flex-row md:items-center md:gap-x-[1.25rem] my-6 text-base text-gray-500 md:text-base relative">
          <div className="flex justify-between items-center md:gap-[1.25rem] mb-[0.625rem] md:mb-0">
            <p>
              By {article?.author?.node?.firstName} {article?.author?.node?.lastName}{" "}
            </p>
            <Difficulty difficulty="intermediate" />
          </div>

          <div className="flex justify-between items-center md:gap-[1.25rem]">
            <span className="flex items-center space-x-3 text-gray-600 opacity-75 md:space-x-5">
              <span className="flex items-center space-x-1">
                <CalendarDaysIcon className="w-4 h-4" />
                <span>{formatDate(article?.date)}</span>
              </span>

              <span className="flex items-center space-x-1">
                <Image src="/img/clock.svg" objectFit="cover" alt="clock" width={20} height={20} />
                <span>{formatReadingTime(article?.readingTime)}</span>
              </span>
            </span>

            <div className="md:absolute right-0 group">
              <Tippy content={"Share"}>
                <Image src={share} title="Share" />
              </Tippy>
              <span className="grid-cols-4 hidden group-hover:grid cursor-pointer absolute gap-4 rounded-sm shadow-[-6px_8px_8px_-6px_rgba(0,0,0,0.4)] right-1 top-6 p-4 min-w-[12rem] bg-white z-10">
                <Tippy content={"Share on Facebook"}>
                  <img src="/img/fb.svg" alt="facebook" className="w-6 h-6" />
                </Tippy>
                <Tippy content="Share on Medium">
                  <img src="/img/medium.svg" alt="twitter" className="w-6 h-6" />
                </Tippy>
                <Tippy content="Share on Twitter">
                  <img src="/img/twitter.svg" alt="twitter" className="w-6 h-6" />
                </Tippy>
                <Tippy content="Share on Linkedin">
                  <img src="/img/linkedin.svg" alt="linkedin" className="w-6 h-6" />
                </Tippy>
                <Tippy content="Share on Telegram">
                  <img src="/img/tg.svg" alt="telegram" className="w-6 h-6" />
                </Tippy>
                <Tippy content={"Share Link"}>
                  <LinkIcon className="w-4 h-4" />
                </Tippy>
              </span>
            </div>
          </div>
        </div>

        <div
          className="article-container md:px-8 lg:px-[3rem]"
          dangerouslySetInnerHTML={{ __html: article?.content as string }}
        ></div>
      </Container_2>
      {filteredPosts?.length > 0 && (
        <div className="bg-gray-100">
          <Container>
            <LatestArticles props_post={filteredPosts} />
          </Container>
        </div>
      )}
    </main>
  )
}

export default ArticleDetail

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug

  const GET_POST_BY_SLUG = gql`
    query PostBySlug($slug: ID!, $language: LanguageCodeEnum!, $lang: LanguageCodeFilterEnum!) {
      post(id: $slug, idType: URI) {
        seo {
          fullHead
        }
        author {
          node {
            firstName
            lastName
          }
        }
        featuredImage {
          node {
            altText
            sourceUrl(size: LARGE)
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
        tags {
          nodes {
            name
            id
          }
        }

        translation(language: $language) {
          author {
            node {
              firstName
              lastName
            }
          }
          featuredImage {
            node {
              altText
              sourceUrl(size: LARGE)
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
          tags {
            nodes {
              name
              id
            }
          }
        }
      }
      posts(first: 4, where: { language: $lang }) {
        nodes {
          title
          uri
          id
          readingTime
          featuredImage {
            node {
              sourceUrl(size: LARGE)
            }
          }
          difficulties(first: 1) {
            edges {
              node {
                name
              }
            }
          }
          date
          categories {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  `

  const response = await client.query({
    query: GET_POST_BY_SLUG,
    variables: {
      slug: slug,
      language: locale?.toUpperCase(),
      lang: locale?.toUpperCase(),
    },
  })

  try {
    const article_found = await response.data.post.translation
    const article = article_found ? article_found : await response.data.post

    const posts = await response.data.posts.nodes
    const fullHead = await response.data?.post?.seo?.fullHead

    if (!article) {
      throw new Error("No article found")
    }

    return {
      props: {
        article,
        posts,
        fullHead,
      },
      revalidate: 150,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}
