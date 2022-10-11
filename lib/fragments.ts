import { gql } from "@apollo/client";

export const POST_DATA_FRAGMENT = gql`
  fragment postData on Post {
    id
    title
    uri
    featuredImage {
    node {
        sourceUrl(size: MEDIUM)
    }
    }
    readingTime
    date
    difficulties(first: 1) {
    edges {
        node {
        name
        }
    }
    }
    translation(language: EN) {
    uri
    }
    categories {
        nodes {
        id
        name
        }
    }
}
`