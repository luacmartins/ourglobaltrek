export default `query allPhotoCategories {
  categories(where: {childless: true, excludeTree: "2096"}, first: 100) {
    nodes {
      photos {
        nodes {
          title
        }
      }
      databaseId
      name
      parent {
        node {
          name
          databaseId
        }
      }
    }
  }
}`
