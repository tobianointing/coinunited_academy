import { Dropdown, TextInput } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useCategories } from "../lib/hooks";
import {ContainImage} from "./OptimizedImage";
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";


export const  titleCase = (str:string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
  }

const TopMainDesktop = () => {
    const { t } = useTranslation('common')
    const categories  = useCategories(state => state.categories);
  return (
    <div className="hidden md:block">
         <ContainImage src="/img/cu_academy_logo.png" alt="coinunited logo" className="w-64 h-20 mx-auto" />
        <ul className="flex items-center justify-center my-3 space-x-10 text-sm font-semibold">
            <li>
                <Link href='/'><a>{t("Home")}</a></Link>
            </li>            
            <Dropdown label={t("Articles")} inline={true}>
                    {
                        categories?.map((category, index) => (
                            category.name !== 'uncategorized' &&
                            <Dropdown.Item key={index}>
                                <span  className='p-1 px-3'>{titleCase(category.name)}</span>
                            </Dropdown.Item>
                        ))
                    }
            </Dropdown>
            <li>
                <Link href='/glossary'><a>{t("Glossary")}</a></Link>
            </li>            
            <li>{t("Partnership")}</li>            
            <form method="GET" action="/search" >
                <TextInput 
                    type="search" 
                    placeholder="search" 
                    name="query"
                    icon={MagnifyingGlassIcon}
                />
            </form>
        </ul>            
    </div>
  )
}

export default TopMainDesktop;