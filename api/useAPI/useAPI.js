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
} from "../queries"

const postPageSize = process.env.NEXT_PUBLIC_POST_PAGE_SIZE
const photoPageSize = process.env.NEXT_PUBLIC_PHOTO_PAGE_SIZE

export async function getMenu() {
  const data = await fetcher(menu)
  return data?.menuItems?.nodes
}

export async function getPageBySlug(slug) {
  const data = await fetcher(page, { variables: { id: slug, idType: "URI" } })
  return data?.page
}

export async function getAllContentPaths(type) {
  const query = type === "photos" ? allPhotoPaths : allPostPaths
  const data = await fetcher(query)
  return data?.[type]?.nodes?.map(slug => ({ params: slug }))
}

export async function getAllContent(type) {
  const query = type === "photos" ? allPhotos : allPosts
  const first = type === "photos" ? photoPageSize * 2 : postPageSize * 2

  const data = await fetcher(query, { variables: { first } })
  return data?.[type]
}

export async function getContentBySlug(slug, type) {
  const query = type === "photo" ? photoBySlug : postBySlug

  const data = await fetcher(query, {
    variables: { id: slug, idType: "SLUG" },
  })
  return data?.[type]
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

export function getContentWithFilters(type, query, initialContent) {
  // Set initial cached data only for default query, ommit it for other queries to fetch data and cache it.
  // If initial data is not set to undefined, swr will use it as initial data for each new set of requests.
  const initialData =
    initialContent && query.length === 0 ? [{ [type]: { ...initialContent } }] : undefined
  const pageSize = type === "posts" ? postPageSize : photoPageSize

  const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0) {
      const variables = { first: 2 * pageSize, before: "", query }
      return type === "posts" ? postByCategories(variables) : photoByCategories(variables)
    }

    const before = previousPageData?.[type]?.pageInfo?.endCursor
    const variables = { first: postPageSize, before, query }
    return type === "posts" ? postByCategories(variables) : photoByCategories(variables)
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, swrFetcher, {
    initialData,
  })

  const dataLength = data?.reduce((sum, item) => (sum += item[type].nodes.length), 0) || 0

  const displayData =
    data && data.length > 0
      ? [].concat(...data.map(item => item[type].nodes)).slice(0, size * pageSize)
      : data?.[type]?.nodes.slice(0, size * pageSize)

  const isReachingEnd =
    data &&
    !data[data?.length - 1]?.[type]?.pageInfo?.hasNextPage &&
    displayData.length === dataLength

  const isLoading = (!data && !error) || (size > 0 && data && typeof data[size - 1] === "undefined")

  return {
    data: displayData,
    isLoading,
    isReachingEnd,
    loadMore: () => setSize(size + 1),
    error,
  }
}
