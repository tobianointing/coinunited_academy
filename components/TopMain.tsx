import TextInput  from "./utils/TextInput";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useCategories } from "../lib/hooks";
import useTranslation from 'next-translate/useTranslation'
import Link from "next/link";
import Image from "next/image";

import {Dropdown, DropdownItem} from './utils/Dropdown'  



export const  titleCase = (str:string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
  }

const TopMainDesktop = () => {
    const { t } = useTranslation('common')
    const categories  = useCategories(state => state.categories);
  return (
    <div className="hidden md:block">
        <div className="flex items-center justify-center">
            <Image src="/img/academy-logo.png" alt="coinunited logo" objectFit="contain" className="border border-red-300" width={256} height={80} />
        </div>
        
        <ul className="flex items-center justify-center my-3 space-x-10 text-sm font-semibold">
            <li>
                <Link href='/'><a>{t("Home")}</a></Link>
            </li>    
                    
            <Dropdown label={t("Articles")}>
                {
                    categories?.map((category, index) => (
                        category.name !== 'uncategorized' &&
                        <DropdownItem key={index}>
                            <span  className='p-1 px-3'>{titleCase(category.name)}</span>
                        </DropdownItem>
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
                    placeholder="Search" 
                    name="query"
                    icon={MagnifyingGlassIcon}
                />
            </form>
        </ul>            
    </div>
  )
}

export default TopMainDesktop;