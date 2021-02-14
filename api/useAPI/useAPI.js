import fetcher, { swrFetcher } from './fetcher'
import useSWR, { useSWRInfinite } from 'swr'
import { menu, page, allPosts, allPhotos, allPostPaths, allPhotoPaths, postBySlug, postByCategories, photoByCategories, photoBySlug, allCategories } from '../queries'

const uri = process.env.NEXT_PUBLIC_API_URI

export async function getMenu() {
   const data = await fetcher(menu)
   return data?.menuItems?.nodes
}

export async function getPageBySlug(slug) {
   const data = await fetcher(page, { variables: { id: slug, idType: 'URI' } })
   return data?.page
}

export async function getAllPostPaths() {
   const data = await fetcher(allPostPaths)
   return data?.posts?.nodes
}

export async function getAllPhotoPaths() {
   const data = await fetcher(allPhotoPaths)
   return data?.photos?.nodes
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
   const data = await fetcher(postBySlug, { variables: { id: slug, idType: 'SLUG' } })
   return data?.post
}

export async function getPhotoBySlug(slug) {
   const data = await fetcher(photoBySlug, { variables: { id: slug, idType: 'SLUG' } })
   return data?.photo
}

export async function getCategories(parent) {
   const data = await fetcher(allCategories, { variables: { parent } })
   return data?.categories?.nodes
}

export function getPostsWithFilters(query, initialContent) {
   // Set initial cached data only for default query, ommit it for other queries to fetch data and cache it.
   // If initial data is not set to undefined, swr will use it as initial data for each new set of requests.
   const initialData = (query.length === 0) ? [{ posts: { ...initialContent } }] : undefined

   const getKey = (pageIndex, previousPageData) => {
      // first page, we don't have `previousPageData`
      if (pageIndex === 0) return postByCategories({ first: 12, before: "", query })

      // get next page cursor from previous page data and return new variables
      const before = previousPageData?.posts?.pageInfo?.endCursor
      return postByCategories({ first: 12, before, query })
   }

   const { data, error, size, setSize } = useSWRInfinite(getKey, swrFetcher, { initialData })

   return {
      data: data && data.length > 0 ? [].concat(...data.map(item => item.posts.nodes)) : data?.posts?.nodes,
      isLoading: !data && !error || (size > 0 && data && typeof data[size - 1] === "undefined"),
      isReachingEnd: data && !data[data?.length - 1]?.posts?.pageInfo?.hasNextPage,
      loadMore: () => setSize(size + 1),
      error,
   }
}

// export function getPhotosWithFilters(variables, initialContent) {
//    const initialQuery = photoByCategories({ first: 10, before: "", query: [] })
//    const query = photoByCategories(variables)
//    const initialData = initialQuery !== query ? undefined : { photos: { ...initialContent } }

//    const { data, error } = useSWR(query, swrFetcher, { initialData })

//    return {
//       data: data?.photos?.nodes,
//       pageInfo: data?.photos?.pageInfo,
//       isLoading: !data?.photos && !error,
//       error
//    }
// }

export function getPhotosWithFilters(query, initialContent) {
   const initialData = (query.length === 0) ? [{ photos: { ...initialContent } }] : undefined

   const getKey = (pageIndex, previousPageData) => {
      if (pageIndex === 0) return photoByCategories({ first: 10, before: "", query })

      const before = previousPageData?.photos?.pageInfo?.endCursor
      return photoByCategories({ first: 10, before, query })
   }

   const { data, error, size, setSize } = useSWRInfinite(getKey, swrFetcher, { initialData })

   return {
      data: data && data.length > 0 ? [].concat(...data.map(item => item.photos.nodes)) : data?.photos?.nodes,
      isLoading: !data && !error || (size > 0 && data && typeof data[size - 1] === "undefined"),
      isReachingEnd: data && !data[data?.length - 1]?.photos?.pageInfo?.hasNextPage,
      loadMore: () => setSize(size + 1),
      error,
   }
}