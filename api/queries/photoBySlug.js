export default `query photoBySlug($id: ID!, $idType: PhotoIdType!) {
  photo(id: $id, idType: $idType) {
    content
    title
    seo {
      metaDesc
      opengraphDescription
    }
  }
}`
