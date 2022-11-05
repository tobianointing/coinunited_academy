import TextInput from "./utils/TextInput"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { useGlossary } from "../lib/hooks"

const GlossarySection = () => {
  const glossaries = useGlossary((state) => state.glossaries)

  return (
    <div className="my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <div className="py-6 pr-6">
          <h3 className="text-[5rem] font-bold text-[#ED8B18]">350</h3>
          <p className="mb-5 text-[1.25rem] leading-6 font-bold md:mb-10">
            That's how many terms we have in our glossary. Can you name them all?
          </p>
          <div className="flex justify-center text-sm md:justify-start md:w-3/4">
            <form method="GET" action="/glossary">
              <TextInput
                type="search"
                name="query"
                placeholder="Search terms here.."
                icon={MagnifyingGlassIcon}
              />
            </form>
          </div>
        </div>

        {glossaries?.map((post, index) => (
          <div key={index} className={`${index > 0 && "md:hidden lg:block"} p-4 bg-white shadow-lg hover:shadow-xl rounded-xl`}>
            <span className="p-1 px-2 text-xs text-white bg-black rounded-md">Glossary</span>
            <br />
            <br />
            <span className="py-3 mb-3 text-2xl font-bold border-b-2 border-site-amber">
              {post?.title}
            </span>
            <div className="my-10 mb-12 text-sm md:text-[16px] font-bold">
              <p>No Picture Blockchain & Crypto News</p>
              <p>No Picture Blockchain & Crypto News</p>
              <p>No Picture Blockchain & Crypto News</p>
            </div>
            <Link href={post?.uri}>
              <a className="p-1 px-2 bg-[#62636B0D] rounded-md text-sm hover:bg-[#62636B1A]">
                Full Definition {">>"}
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GlossarySection
