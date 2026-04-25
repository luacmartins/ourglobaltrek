import { useCallback, useEffect, useMemo, useState } from 'react'

const postPageSize = process.env.NEXT_PUBLIC_POST_PAGE_SIZE
const photoPageSize = process.env.NEXT_PUBLIC_PHOTO_PAGE_SIZE
const parsedPostPageSize = Math.max(1, parseInt(postPageSize, 10) || 8)
const parsedPhotoPageSize = Math.max(1, parseInt(photoPageSize, 10) || 8)

function queryDependencyKey(query) {
  if (Array.isArray(query)) return query.join(',')
  return String(query ?? '')
}

function normalizeFilterQuery(query) {
  if (Array.isArray(query)) return query.filter(item => Number.isInteger(item))
  return String(query || '').trim().toLowerCase()
}

export function getContentWithFilters(type, query, initialContent) {
  const pageSize = type === 'posts' ? parsedPostPageSize : parsedPhotoPageSize
  const queryKey = queryDependencyKey(query)

  const normalizedQuery = useMemo(() => normalizeFilterQuery(query), [queryKey])

  const nodes = useMemo(() => {
    if (Array.isArray(initialContent)) return initialContent
    return initialContent?.nodes || []
  }, [initialContent])

  const filtered = useMemo(() => {
    if (Array.isArray(normalizedQuery) && normalizedQuery.length > 0) {
      return nodes.filter(item =>
        item?.categories?.nodes?.some(category => normalizedQuery.includes(category.databaseId))
      )
    }

    if (typeof normalizedQuery === 'string' && normalizedQuery.length > 0) {
      return nodes.filter(item => {
        const text = item.searchText || `${item.title} ${item.excerpt || ''}`.toLowerCase()
        return text.includes(normalizedQuery)
      })
    }

    return nodes
  }, [nodes, normalizedQuery])

  const [size, setSize] = useState(1)

  useEffect(() => {
    setSize(1)
  }, [queryKey])

  const displayData = filtered.slice(0, (size + 1) * pageSize)
  const isReachingEnd = displayData.length >= filtered.length

  const loadMore = useCallback(() => setSize(prev => prev + 1), [])

  return {
    data: displayData,
    isLoading: false,
    isReachingEnd,
    loadMore,
    error: null,
  }
}
