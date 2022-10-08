import { gql } from "@apollo/client";
import { POST_DATA_FRAGMENT } from "./fragments";

export const FILTER_POSTS_BY_SLUG_AND_DIFFICULTY = gql `
${POST_DATA_FRAGMENT}
query searchPost($search: String!, $tags: [String!], $difficulties: [String!], $language:LanguageCodeFilterEnum = ALL) {

  posts(
    where: {
        search: $search, 
        taxQuery: {
            taxArray: [
                {terms: $tags, taxonomy: TAG, operator: IN, field: SLUG}, 
                {terms: $difficulties, taxonomy: DIFFICULTY, operator: IN, field: NAME}
                ], 
            relation: AND}, 
        offsetPagination: {offset: 0, size: 10},
        language: $language
        }
    ) {
      
    nodes {
        ...postData
      }

    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}
`


export const GET_POSTS_BY_QUERY = gql `
${POST_DATA_FRAGMENT}
query searchPost($search: String!, $language:LanguageCodeFilterEnum = ALL, $page:Int!) {
  posts(
    where: {
        search: $search, 
        offsetPagination: {offset: $page, size: 3},
        language: $language
        }
    ) {
      
    nodes {
        ...postData
      }

    pageInfo {
      offsetPagination {
        total
      }
    }
  }
  difficulties {
    nodes {
      id
      name
    }
  }
  tags(first: 12, where: {orderby: COUNT, order: DESC}) {
    nodes {
      id
      name
    }
  }
}
`


export const GET_POSTS_BY_QUERY_2 = gql `
${POST_DATA_FRAGMENT}
query searchPost($search: String!, $language:LanguageCodeFilterEnum = ALL, $page:Int!) {
  posts(
    where: {
        search: $search, 
        offsetPagination: {offset: $page, size: 3},
        language: $language
        }
    ) {
      
    nodes {
        ...postData
      }
  }
}
`