import { Dropdown, TextInput } from "flowbite-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useCategories } from "../lib/hooks";
import {ContainImage} from "./OptimizedImage";
import useTranslation from 'next-translate/useTranslation'


export const  titleCase = (str:string) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase());
  }

const TopMainDesktop = () => {
    const { t } = useTranslation('common')
    const categories  = useCategories(state => state.categories);
  return (
    <div className="md:block hidden">
         <ContainImage src="/img/cu_academy_logo.png" alt="coinunited logo" className="w-64 h-20 mx-auto" />
        <ul className="flex items-center justify-center space-x-10 text-sm font-semibold my-3">
            <li>{t("Home")}</li>            
            <Dropdown label="Articles" inline={true}>
                    {
                        categories?.map((category, index) => (
                            category.name !== 'uncategorized' &&
                            <Dropdown.Item key={index}>
                                <span  className='px-3 p-1'>{titleCase(category.name)}</span>
                            </Dropdown.Item>
                        ))
                    }
            </Dropdown>
            <li>{t("Glossary")}</li>            
            <li>{t("Partenership")}</li>            
            <TextInput 
                type="search" 
                placeholder="search" 
                icon={MagnifyingGlassIcon}
            />
        </ul>            
    </div>
  )
}

export default TopMainDesktop;