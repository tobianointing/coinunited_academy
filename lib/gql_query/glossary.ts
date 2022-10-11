import { gql } from "@apollo/client";

export const GET_GLOSSARIES = gql`
    query getGlossaries{
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