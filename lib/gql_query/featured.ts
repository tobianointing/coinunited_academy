import { gql } from "@apollo/client";


export const GET_POST_BY_SLUG = gql`
    query PostBySlug($id: ID!, $language: LanguageCodeEnum!, 
        $lang: LanguageCodeFilterEnum!) {
        featuredPost(id: $id, idType: SLUG) {
            seo {
                fullHead
                }
            author {
            node {
                firstName
                lastName
            }
            }
            title
            date
            content
            difficulties(first: 1) {
            edges {
                node {
                name
                }
            }
            }
                featuredImage {
                node {
                    altText
                    sourceUrl(size: LARGE)
                }
                }
                id
                uri
                translation(language: $language){
                author {
                node {
                    firstName
                    lastName
                }
                }
                title
                date
                content
                difficulties(first: 1) {
                edges {
                    node {
                    name
                    }
                }
                }
                featuredImage {
                  node {
                      altText
                      sourceUrl(size: LARGE)
                    }
                 }
              id
          uri
          } 
        }
  
  posts(first: 4, where : {language : $lang}) {
          nodes {
            title
            uri
            id
            readingTime
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
           
            difficulties(first: 1) {
                edges {
                  node {
                    name
                  }
                }
              }
            date
            categories {
              nodes {
                id
                name
              }
            }
          }
        }  
  }
`