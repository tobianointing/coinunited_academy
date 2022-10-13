import { gql } from "@apollo/client";

export const GET_SEO_DATA = gql`
    query getSeo {
        seo {
            contentTypes {
            page {
                schema {
                raw
                }
            }
            }
        }
        generalSettings {
            title
            description
            url
    }
    }
`

