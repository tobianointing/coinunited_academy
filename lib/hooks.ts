import create from 'zustand'
import {ICatStore, IPostStore, IFeaturedStore} from '../custom_interface'

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