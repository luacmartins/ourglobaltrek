export default `query postBySlug($id: ID!, $idType: PostIdType!) {
  post(id: $id, idType: $idType) {
    author {
      node {
        name
      }
    }
    content
    date
    featuredImage {
      node {
        sourceUrl
        srcSet
      }
    }
    title
  }
}`