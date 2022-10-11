import { gql } from "@apollo/client";
import { POST_DATA_FRAGMENT } from "./fragments";

// TODO: change all size to 12

export const FILTER_POSTS_BY_TAG_AND_DIFF = gql `
${POST_DATA_FRAGMENT}
query searchPost($search: String!, $tags: [String!], $difficulties: [String!], $language:LanguageCodeFilterEnum = ALL, $page:Int! = 0) {
  posts(
    where: {search: $search, taxQuery: {taxArray: [{terms: $tags, taxonomy: TAG, operator: IN, field: SLUG}, {terms: ["beginner"], taxonomy: DIFFICULTY, operator: AND, field: NAME}], relation: OR}, offsetPagination: {size: 10, offset: $page}, language: $language}
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


export const FILTER_POSTS_BY_TAG = gql `
${POST_DATA_FRAGMENT}
query searchPost($search: String!, $tags: [String!], $language:LanguageCodeFilterEnum = ALL, $page:Int! = 0) {
  posts(
    where: {
      search: $search, 
      taxQuery: {
        taxArray: [
          {terms: $tags, taxonomy: TAG, operator: IN, field: NAME}
        ], 
        relation: AND}, 
        offsetPagination: {size: 3, offset: $page}, 
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