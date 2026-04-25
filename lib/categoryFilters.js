import CONST from './CONST'

/** Frontmatter / legacy slugs -> kebab slug used in CONST keys (camelToKebab) */
const SLUG_ALIASES = {
  falklands: 'falkland-islands',
}

function camelToKebab(key) {
  return String(key)
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

function buildSlugMap(listRowsInternal) {
  const map = new Map()
  listRowsInternal.forEach(row => {
    const regionSlug = camelToKebab(row.slugKey)
    map.set(regionSlug, {
      databaseId: row.databaseId,
      name: row.name,
      slug: regionSlug,
    })
    row.children.nodes.forEach(child => {
      map.set(child.slug, child)
    })
  })
  return map
}

let cachedSerializable = null
let slugMapCache = null
let mainFilterIdsCache = new Set()

/** Ids for post-only tags (not in filter bar); keep clear of list ids (starts ~100) */
const POST_TAG_ID_BASE = 9000

export function getConstCategoryFilters() {
  if (cachedSerializable) return cachedSerializable

  const main = Object.entries(CONST.categories.main).map(([key, name], index) => ({
    databaseId: 11 + index,
    name,
    slug: camelToKebab(key),
  }))
  mainFilterIdsCache = new Set(main.map(item => item.databaseId))

  let nextId = 100
  const listInternal = Object.entries(CONST.categories.list).map(([regionKey, children]) => {
    const regionId = nextId++
    const childNodes = Object.entries(children).map(([childKey, name]) => {
      const slug = camelToKebab(childKey)
      return {
        databaseId: nextId++,
        name,
        slug,
      }
    })

    return {
      slugKey: regionKey,
      databaseId: regionId,
      name: regionKey.charAt(0).toUpperCase() + regionKey.slice(1),
      children: { nodes: childNodes },
    }
  })

  const slugMap = buildSlugMap(listInternal)
  main.forEach(item => slugMap.set(item.slug, item))
  Object.entries(CONST.categories.postTags || {}).forEach(([key, name], index) => {
    const slug = camelToKebab(key)
    slugMap.set(slug, {
      databaseId: POST_TAG_ID_BASE + index,
      name,
      slug,
    })
  })
  Object.entries(SLUG_ALIASES).forEach(([alias, canonical]) => {
    const target = slugMap.get(canonical)
    if (target) slugMap.set(alias, target)
  })
  slugMapCache = slugMap

  const list = listInternal.map(({ databaseId, name, children }) => ({
    databaseId,
    name,
    children,
  }))

  cachedSerializable = { main, list }
  return cachedSerializable
}

export function resolveConstCategoryNodes(categorySlugs = []) {
  getConstCategoryFilters()
  const slugMap = slugMapCache || new Map()
  const seen = new Set()
  const nodes = []

  categorySlugs.forEach(raw => {
    const slug = String(raw).trim().toLowerCase()
    const canonical = SLUG_ALIASES[slug] || slug
    const match = slugMap.get(canonical) || slugMap.get(slug)
    if (match && !seen.has(match.databaseId)) {
      seen.add(match.databaseId)
      nodes.push({
        databaseId: match.databaseId,
        name: match.name,
        slug: match.slug,
      })
    }
  })

  nodes.sort((a, b) => {
    const aMain = mainFilterIdsCache.has(a.databaseId)
    const bMain = mainFilterIdsCache.has(b.databaseId)
    if (aMain && !bMain) return 1
    if (!aMain && bMain) return -1
    return 0
  })

  return nodes
}
