  
type featuredImage = {
    node: {
      sourceUrl: string
      altText: string
    }
}


export type Post = {
    __typename?: string,
    id?: string,
    title: string,
    uri : string,
    featuredImage?: Object<featuredImage>,
    categories?: Object<postCategory>
  
  }


export interface IFeaturedStore {
  post: Post
  setFeaturedPost: (post: Post) => void
}

export type category = {
    __typename: string,
    name: string,
    posts: {
        __typename: string,
        nodes: Array<Post>
    }
  }

  export type postCategory = {
    __typename: string,

    nodes: category[],  
}

export interface Allposts {
    __typename: string;
    node: Post;
  }
  
  
export interface IData {
    categories: category[]
    posts: Allposts[];
    featuredPost: Post;
  }
  

export interface ICatStore {
    categories: IData['categories']
    setCategories: (categories: IData['categories']) => void
}

export interface IPostStore{
  posts: Array<Allposts>
  setPosts: (state:Allposts[]) => void
}