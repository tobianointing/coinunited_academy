  
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
    uri? : string,
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
    },
    tags?: {
        nodes: Tag[]
      },
    translation?: {
      uri: string,
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


interface IDifficulty {
    id: string;
    name: string;
}

  
export interface IData {
    categories: category[];
    posts: Post[];
    featuredPost: Post;
    difficulties: IDifficulty[];
    tags: Tag[];
  }
  

export interface ICatStore {
    categories: IData['categories']
    setCategories: (categories: IData['categories']) => void
}

export interface IPostStore{
  posts: Array<Post>
  setPosts: (state:Post[]) => void
}


export interface IDifficultyStore{
  difficulties: IDifficulty[]
  setDifficulties: (state:IDifficulty[]) => void
}

export interface ITagStore{
  tags: Tag[]
  setTags: (state:Tag[]) => void
}


export interface Glossary {
  (props: {
      title: string,
      description: string,
  }): JSX.Element
} 

export type GlossaryItem = {
  title: string,
  content: string,
  id: string
}

type GlossaryNode = {
  nodes: Array<GlossaryItem>
}

export interface GlossaryKey{
  node: {
      name: string,
      id: string,
      glossaries: GlossaryNode,
  },
  cursor: string,   
}

export interface IGlossary{
  glossaryKey: Array<GlossaryKey>;
  setGlossaryKey: (state:GlossaryKey[]) => void
}


export interface IFilters {
  difficulties:Array<string>;
  tags:Array<string>;
}


export type FilterComponenet = (
  props: {
      tags:Tag[],
      difficulties:IDifficulty[],
      query?:string,
      dataSetter? : ({tags,difficulties}:IFilters, data:any)=> void    
  }
) => JSX.Element
