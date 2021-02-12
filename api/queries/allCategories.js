export default `query categories($parent: Int!) {
  categories(where: {parent: $parent}) {
    nodes {
      databaseId
      name
      children(first: 50) {
        nodes {
          name
          databaseId
        }
      }
    }
  }
}`