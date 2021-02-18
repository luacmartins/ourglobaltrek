export default `query Page($id: ID!, $idType: PageIdType!) {
  __typename
  page(id: $id, idType: $idType) {
    date
    content
    title
    featuredImage {
      node {
        srcSet
        sourceUrl
      }
    }
    author {
      node {
        name
      }
    }
    seo {
      metaDesc
      opengraphDescription
    }
  }
}
`