import create from 'zustand'
import {ICatStore, 
        IPostStore, 
        IFeaturedStore, 
        IDifficultyStore, 
        ITagStore, IGlossary, IGlossary2} from '../custom_interface'



export const usePosts =create<IPostStore>(
    set => ({
        posts: [],
        setPosts: (posts) => set({posts})
    })
)


export const useCategories = create<ICatStore>(
    set => ({
        categories: [],
        setCategories: (categories) => set({categories})
    })
)

export const useFeaturedPost = create<IFeaturedStore>(
    set => ({
        post: {
            title: '',
            uri: '',
        },
        setFeaturedPost: (post) => set({post})
    })
)


export const useDifficuties = create<IDifficultyStore>(
    set => ({
        difficulties: [],
        setDifficulties: (difficulties) => set({difficulties})
    })
)

export const useTags = create<ITagStore>(
    set => ({
        tags: [],
        setTags: (tags) => set({tags})
    })
)

export const useGlossaryKey = create<IGlossary>(
    set => ({
        glossaryKey : [], 
        setGlossaryKey: (glossaryKey) => set({glossaryKey})
    })
)

export const useGlossary = create<IGlossary2>(
    set => ({
        glossaries : [],
        setGlossaries: (glossaries) => set({glossaries})
    })
)
