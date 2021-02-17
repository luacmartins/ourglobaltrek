import fetcher, { swrFetcher } from "./fetcher"
import { useSWRInfinite } from "swr"
import {
  menu,
  page,
  allPosts,
  allPhotos,
  allPostPaths,
  allPhotoPaths,
  postBySlug,
  postByCategories,
  photoByCategories,
  photoBySlug,
  allCategories,
  allPhotoCategories,
  search,
} from "../queries"

export async function getMenu() {
  const data = await fetcher(menu)
  return data?.menuItems?.nodes
}

export async function getPageBySlug(slug) {
  const data = await fetcher(page, { variables: { id: slug, idType: "URI" } })
  return data?.page
}

export async function getAllPostPaths() {
  const data = await fetcher(allPostPaths)
  return data?.posts?.nodes?.map(slug => ({ params: slug }))
}

export async function getAllPhotoPaths() {
  const data = await fetcher(allPhotoPaths)
  return data?.photos?.nodes?.map(slug => ({ params: slug }))
}

export async function getAllPosts(num) {
  const data = await fetcher(allPosts, { variables: { first: num } })
  return data?.posts
}

export async function getAllPhotos(num) {
  const data = await fetcher(allPhotos, { variables: { first: num } })
  return data?.photos
}

export async function getPostBySlug(slug) {
  const data = await fetcher(postBySlug, {
    variables: { id: slug, idType: "SLUG" },
  })
  return data?.post
}

export async function getPhotoBySlug(slug) {
  const data = await fetcher(photoBySlug, {
    variables: { id: slug, idType: "SLUG" },
  })
  return data?.photo
}

export async function getCategories(parent) {
  const data = await fetcher(allCategories, { variables: { parent } })
  return data?.categories?.nodes
}

export async function getPhotoCategories() {
  const data = await fetcher(allPhotoCategories)
  const hash = {}
  data?.categories?.nodes.forEach(item => {
    if (item.photos.nodes.length > 0 && item.parent) {
      hash[item.parent.node.name]
        ? hash[item.parent.node.name].children.nodes.push({
            name: item.name,
            databaseId: item.databaseId,
          })
        : (hash[item.parent.node.name] = {
            databaseId: item.parent.node.databaseId,
            name: item.parent.node.name,
            children: {
              nodes: [
                {
                  name: item.name,
                  databaseId: item.databaseId,
                },
              ],
            },
          })
    }
  })
  const result = Object.keys(hash).map(key => hash[key])
  return result
}

export function getPostsWithFilters(query, initialContent) {
  // Set initial cached data only for default query, ommit it for other queries to fetch data and cache it.
  // If initial data is not set to undefined, swr will use it as initial data for each new set of requests.
  const initialData =
    query.length === 0 ? [{ posts: { ...initialContent } }] : undefined

  const getKey = (pageIndex, previousPageData) => {
    // first page, we don't have `previousPageData`
    if (pageIndex === 0)
      return postByCategories({ first: 12, before: "", query })

    // get next page cursor from previous page data and return new variables
    const before = previousPageData?.posts?.pageInfo?.endCursor
    return postByCategories({ first: 12, before, query })
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, swrFetcher, {
    initialData,
  })

  return {
    data:
      data && data.length > 0
        ? [].concat(...data.map(item => item.posts.nodes))
        : data?.posts?.nodes,
    isLoading:
      (!data && !error) ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isReachingEnd:
      data && !data[data?.length - 1]?.posts?.pageInfo?.hasNextPage,
    loadMore: () => setSize(size + 1),
    error,
  }
}

export function getPhotosWithFilters(query, initialContent) {
  const initialData =
    query.length === 0 ? [{ photos: { ...initialContent } }] : undefined

  const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0)
      return photoByCategories({ first: 10, before: "", query })

    const before = previousPageData?.photos?.pageInfo?.endCursor
    return photoByCategories({ first: 10, before, query })
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, swrFetcher, {
    initialData,
  })

  return {
    data:
      data && data.length > 0
        ? [].concat(...data.map(item => item.photos.nodes))
        : data?.photos?.nodes,
    isLoading:
      (!data && !error) ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isReachingEnd:
      data && !data[data?.length - 1]?.photos?.pageInfo?.hasNextPage,
    loadMore: () => setSize(size + 1),
    error,
  }
}

export function getSearch(query) {
  const getKey = (pageIndex, previousPageData) => {
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return search({ first: 12, before: "", query })

    // get next page cursor from previous page data and return new variables
    const before = previousPageData?.posts?.pageInfo?.endCursor
    return search({ first: 12, before, query })
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, swrFetcher)

  return {
    data:
      data && data.length > 0
        ? [].concat(...data.map(item => item.posts.nodes))
        : data?.posts?.nodes,
    isLoading:
      (!data && !error) ||
      (size > 0 && data && typeof data[size - 1] === "undefined"),
    isReachingEnd:
      data && !data[data?.length - 1]?.posts?.pageInfo?.hasNextPage,
    loadMore: () => setSize(size + 1),
    error,
  }
}
