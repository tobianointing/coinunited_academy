import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { TextInput } from "flowbite-react"
import { GetStaticProps } from "next"
import Container from "../../components/Container"
import { ContainImage } from "../../components/OptimizedImage"
import TopMainDesktop from "../../components/TopMain"
import { client } from "../../lib/apollo"
import { GET_GLOSSARIES } from "../../lib/gql_query/glossary"
import { Glossary, GlossaryKey, GlossaryItem } from "../../custom_interface"
import { useGlossaryKey } from "../../lib/hooks"
import shallow from "zustand/shallow"
import { useEffect } from "react"
import { Link as Scroll, Element as Target } from "react-scroll"
import Link from "next/link"
import Head from "next/head"

const GlossaryItem: Glossary = ({ title, description, uri }) => {
  return (
    <Link href={uri}>
      <a className="flex flex-col py-5 px-2 lg:p-5 space-y-3 rounded-lg cursor-pointer hover:bg-[#F8F8F8]">
        <h3 className="text-2xl font-semibold">{title}</h3>
        {description && (
          <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: description }}></div>
        )}
      </a>
    </Link>
  )
}

const GlossaryContainer = ({ gKey, posts }: { gKey: string; posts?: Array<GlossaryItem> }) => {
  return (
    <Target name={gKey}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-6 lg:gap-y-0 border-b-2 py-7 snap-always snap-center justify-start">
          <div className="col-span-1">
            <h2 className="text-6xl font-bold text-gray-400">{gKey}</h2>
          </div>
          <div className="flex flex-col col-span-4 lg:space-y-3">
            {posts?.map((post) => (
              <GlossaryItem
                key={post.id}
                title={post.title}
                description={post?.content}
                uri={post.uri}
              />
            ))}
          </div>
        </div>
      </Container>
    </Target>
  )
}

type GProps = {
  glossaries_key: Array<GlossaryKey>
  page: {
    url: string
  }
}

const Glossary = (props: GProps) => {
  const g_key = props?.glossaries_key
  const page = props?.page
  const [glossaryKey, setGlossaryKey] = useGlossaryKey(
    (state) => [state.glossaryKey, state.setGlossaryKey],
    shallow
  )
  useEffect(() => {
    setGlossaryKey(g_key)
  }, [g_key])

  return (
    <div className="min-h-screen">
      <Head>
        <title>Glossary</title>
        <meta
          name="description"
          content="An alphabetical list of difficult, technical, or foreign words."
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Glossary" />
        <meta
          property="og:description"
          content="An alphabetical list of difficult, technical, or foreign words."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="CoinUnited.io" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={page?.url} />
        <meta property="og:image" content="/img/cu_academy_logo.png" />
        <meta property="og:image:secure_url" content="/img/cu_academy_logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@realcoinunited" />
        <meta name="twitter:title" content="Academy | CoinUnited.io" />
        <meta
          name="twitter:description"
          content="An alphabetical list of difficult, technical, or foreign words."
        />
        <meta name="twitter:creator" content="@realcoinunited" />
        <meta name="twitter:image" content="/img/cu_academy_logo.png" />
      </Head>
      <div className="bg-white hidden md:block">
        <Container>
          <TopMainDesktop />
        </Container>
      </div>
      <div className="bg-glossary">
        <Container>
          <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:order-1 my-10 md:grid-cols-2 text-center md:text-left">
            <div className="py-3 order-2">
              <h1 className="my-4 md:my-8 text-[2rem] smm:text-6xl  font-bold">
                CoinUnited <br className="hidden md:block" /> Glossary
              </h1>
              <p className="md:font-semibold">
                An alphabetical list of difficult, technical, or foreign words. in a text along with
                explanations of their meanings.
              </p>
            </div>

            <div className="h-full order-1 md:order-2">
              <ContainImage
                src="/img/glossarybook.png"
                alt="glossary book"
                className="w-full h-full"
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white sticky top-0">
        <Container>
          <div className="flex flex-col space-y-5 items-start md:flex-row md:items-center w-full md:space-y-0 md:space-x-5 gap-y-4 md:gap-y-0">
            <div className="w-full md:w-auto order-2 md:order-1">
              <form method="GET" action="/search">
                <TextInput
                  type="search"
                  placeholder="search"
                  name="query"
                  icon={MagnifyingGlassIcon}
                />
              </form>
            </div>

            <div className="grid grid-cols-10 gap-y-4 gap-x-[1.5625rem] md:gap-x-0 md:gap-y-0 md:flex md:items-center md:flex-wrap md:flex-grow md:space-x-2 text-gray-400 justify-evenly w-full order-1 md:order-2">
              {glossaryKey &&
                glossaryKey?.map((gk) => (
                  <Scroll
                    activeClass="text-black font-bold"
                    to={gk.node.name}
                    spy={true}
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="hover:text-black cursor-pointer active:text-black hover:font-bold transition-all duration-200 ease-in"
                    key={gk.cursor}
                  >
                    {gk.node.name}
                  </Scroll>
                ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-white snap-y snap-mandatory">
        {glossaryKey.map((gk) => (
          // gk.node.glossaries.nodes.length > 0 &&
          <GlossaryContainer key={gk.cursor} gKey={gk.node.name} posts={gk.node.glossaries.nodes} />
        ))}
      </div>
    </div>
  )
}

export default Glossary

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: GET_GLOSSARIES,
    })

    const glossaries_key = data?.keyAlphabets?.edges
    const page = data?.generalSettings

    return {
      props: {
        glossaries_key: glossaries_key ? glossaries_key : [],
        page: page ? page : { url: "https://coinunited.io/academy/glossary" },
      },
      revalidate: 300,
    }
  } catch {
    return {
      notFound: true,
    }
  }
}
