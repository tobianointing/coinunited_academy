import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { FilterComponenet,IFilters } from "../custom_interface"
import { client } from "../lib/apollo"
import { FILTER_POSTS_BY_TAG_AND_DIFF, GET_POSTS_BY_QUERY } from "../lib/queries"
import { Difficulty } from "./MoreArticles"
import { Tags } from "./MoreArticles"


export const Filters:FilterComponenet = ({tags, difficulties, dataSetter, query})=>{
    const { t } = useTranslation('common')
    const {locale} = useRouter()

    const [filters, setFilters] = useState<IFilters>({
        difficulties:[],
        tags:[]
    })

    const setDifficulty = (difficulty?:string) =>{
        if(difficulty){
            if(filters.difficulties.includes(difficulty)){
                setFilters({
                    ...filters,
                    difficulties:filters.difficulties.filter(d => d !== difficulty)
                })
            }else{
                setFilters({
                    ...filters,
                    difficulties:[...filters.difficulties, difficulty]
                })
            }
        }
        
    }

    const setTag = (tag?:string) =>{
        if(tag){
        if(filters.tags.includes(tag)){
            setFilters({
                ...filters,
                tags:filters.tags.filter(t => t !== tag)
            })
        }else{
            setFilters({
                ...filters,
                tags:[...filters.tags, tag]
            })
            }
        }
    }
    
    useEffect(()=>{

        console.log(filters, query, locale)
        if (filters.difficulties.length > 0 || filters.tags.length > 0){
            if (query) {
                client.query({
                    query:FILTER_POSTS_BY_TAG_AND_DIFF,
                    variables:{
                        search: query,
                        difficulties: filters.difficulties,
                        tags:filters.tags,
                        language: locale ? locale.toUpperCase() : "EN"
                    }
                }).then(result=>{
                    const posts = result.data?.posts?.nodes
                    const resultTotal = result.data?.posts?.pageInfo?.offsetPagination?.total
                    console.log(result)
                    if(dataSetter){
                        dataSetter(filters, {posts, resultTotal})
                    }

                })
            }  
            
        }
    },[filters])

  
    return <div className="grid grid-cols-1 gap-6 my-7 md:grid-cols-2 md:gap-16">
    <div>
        <p className="font-semibold">{t("Popular tags")}</p>   
        <div className="grid grid-cols-4 gap-3 my-4">
            { tags.length > 0 && tags.map((tag) => <Tags key={tag.id} name={tag.name} callback={setTag}  />)}
        </div>
    </div>

    <div>
        <p className="font-semibold">{t("Difficulty")}</p>

        <div className="grid grid-cols-3 gap-3 my-4 mb-7">
            {difficulties.length > 0 && difficulties.map((difficulty) => (
                    <Difficulty key={difficulty.id} difficulty={difficulty.name} callback={setDifficulty}/>
                ))
            }
        </div>
    </div>
</div>
}