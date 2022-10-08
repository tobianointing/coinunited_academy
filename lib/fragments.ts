import { gql } from "@apollo/client";

export const POST_DATA_FRAGMENT = gql`
  fragment postData on Post {
    id
    title
    uri
    featuredImage {
    node {
        sourceUrl(size: POST_THUMBNAIL)
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
}

`