import { gql } from "@apollo/client";

export const GET_GLOSSARIES = gql`
    query getGlossaries{
    generalSettings {
        url
    }
    keyAlphabets (first: 100){
        edges {
        node {
            name
            id
            glossaries {
                nodes {
                    title
                    uri
                    content
                    id
                }
            }
        }
        cursor
        }
    }
    }
`

export const GET_GLOSSARY = gql`
   query getGlossy($id: ID = "") {
  glossary(id: $id, idType: URI) {
    id
    title
    content
    keyAlphabets(first: 1) {
      nodes {
        uri
      }
    }
    difficulties(first: 1) {
      nodes {
        name
        id
      }
    }
    seo {
      fullHead
    }
  }
}
`

export const GET_SUGGESTIONS = gql`
    query getGlossyRest($id: ID = "", $notIn: [ID]
    ) {
    keyAlphabet(id: $id, idType: URI) {
        glossaries(first: 3, where: {notIn: $notIn}) {
        nodes {
            title
            uri
            id
        }
        }
    }
    }
`

export const GET_GLOSSARIES_KEY = gql`
    query getGlossaries{
        keyAlphabets (first: 30){
            nodes {
                name
                id
            }
        }
    }   
`

export const GET_GLOSSARIES_BY_KEY = gql`
    query getGlossaries($id: ID = "") {
    keyAlphabet(id: $id, idType: ID) {
        glossaries(first: 1) {
        nodes {
            title
            uri
        }
        }
    }
    }
`