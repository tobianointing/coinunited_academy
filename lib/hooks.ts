import create from 'zustand'
import {ICatStore, IPostStore, IFeaturedStore, IDifficultyStore, ITagStore} from '../custom_interface'

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