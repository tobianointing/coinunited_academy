  
type featuredImage = {
    node: {
      sourceUrl: string
      altText: string
    }
}

type Tag = {
  id: string
  name: string
  
}


type Difficulty = {
    edges : [
      {
        node?:{
          name: string
        }
      }
    ]
}


export type Post = {
    __typename?: string,
    id?: string,
    title: string,
    uri : string,
    featuredImage?: Object<featuredImage>,
    categories?: Object<postCategory>
    date?: string,
    readingTime?: string,
    difficulties?: Difficulty,
    content?: string,
    author?: {
      node: { 
        firstName: string, 
        lastName: string,
         __typename: string 
        },
      __typename: string
    }
    
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

interface IDifficulty {
    id: string;
    name: string;
}

  
export interface IData {
    categories: category[];
    posts: Allposts[];
    featuredPost: Post;
    difficulties: IDifficulty[];
    tags: Tag[];
  }
  

export interface ICatStore {
    categories: IData['categories']
    setCategories: (categories: IData['categories']) => void
}

export interface IPostStore{
  posts: Array<Allposts>
  setPosts: (state:Allposts[]) => void
}


export interface IDifficultyStore{
  difficulties: IDifficulty[]
  setDifficulties: (state:IDifficulty[]) => void
}

export interface ITagStore{
  tags: Tag[]
  setTags: (state:Tag[]) => void
}