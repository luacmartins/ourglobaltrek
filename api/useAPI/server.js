import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import {
  getAllPhotos,
  getAllPhotoPaths,
  getAllPostPaths,
  getAllPosts,
  getPhotoBySlug,
  getPostBySlug,
} from '../../lib/posts'
import { getConstCategoryFilters } from '../../lib/categoryFilters'

const PAGES_DIR = path.join(process.cwd(), 'content', 'pages')
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images')
const PUBLIC_IMAGES_BASE_PATH = '/images'
const UPLOADS_PATH_REGEX =
  /(?:https?:\/\/[^/]+)?(?:\/travel-blog)?\/wp-content\/uploads\/(.+)$/i

const LOCAL_MENU = [
  { label: 'Our Story', path: '/our-story' },
  { label: 'Travel Blog', path: '/travel-blog' },
  { label: 'Photography', path: '/photography' },
]

export async function getMenu() {
  return LOCAL_MENU
}

function toIsoDate(value) {
  if (!value) return new Date().toISOString()
  if (value instanceof Date) return value.toISOString()
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

function getUploadsMonthPath(dateInput) {
  const date = new Date(toIsoDate(dateInput))
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  return `${year}/${month}`
}

function resolveMediaPath(src = '', date = '') {
  if (!src) return ''
  const rawSrc = String(src).trim()
  if (rawSrc.startsWith('/images/')) return rawSrc

  const uploadMatch = rawSrc.match(UPLOADS_PATH_REGEX)
  if (uploadMatch) {
    const rel = uploadMatch[1].replace(/^\/+/, '')
    const datedFsPath = path.join(PUBLIC_IMAGES_DIR, rel)
    const baseName = path.basename(rel)
    const flatFsPath = path.join(PUBLIC_IMAGES_DIR, baseName)
    if (fs.existsSync(datedFsPath)) return `${PUBLIC_IMAGES_BASE_PATH}/${rel}`
    if (fs.existsSync(flatFsPath)) return `${PUBLIC_IMAGES_BASE_PATH}/${baseName}`
    return `${PUBLIC_IMAGES_BASE_PATH}/${baseName}`
  }

  if (rawSrc.startsWith('http://') || rawSrc.startsWith('https://')) return rawSrc

  const normalized = rawSrc.replace(/^images\//, '').replace(/^\/+/, '')
  const datedCandidate = `${getUploadsMonthPath(date)}/${normalized}`
  const flatCandidate = normalized

  if (fs.existsSync(path.join(PUBLIC_IMAGES_DIR, flatCandidate))) {
    return `${PUBLIC_IMAGES_BASE_PATH}/${flatCandidate}`
  }

  if (fs.existsSync(path.join(PUBLIC_IMAGES_DIR, datedCandidate))) {
    return `${PUBLIC_IMAGES_BASE_PATH}/${datedCandidate}`
  }

  return `${PUBLIC_IMAGES_BASE_PATH}/${flatCandidate}`
}

function markdownToHtml(markdown = '', date = '') {
  const html = marked.parse(markdown || '')
  return html.replace(/src="([^"]+)"/g, (_, src) => `src="${resolveMediaPath(src, date)}"`)
}

function getPageFromMarkdown(slug) {
  const fullPath = path.join(PAGES_DIR, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null

  const file = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(file)
  const date = toIsoDate(data.date)

  return {
    title: data.title || 'Our Global Trek',
    seo: data.seo || data.title || 'Our Global Trek',
    content: markdownToHtml(content, date),
    featuredImage: {
      node: {
        sourceUrl: resolveMediaPath(data.coverImage || '', date),
      },
    },
  }
}

export async function getPageBySlug(slug) {
  const pageFromFile = getPageFromMarkdown(slug)
  if (pageFromFile) return pageFromFile

  const [latestPost] = await getAllPosts({ limit: 1 })
  const heroImage = latestPost?.featuredImage?.node?.sourceUrl || ''
  const homeHeroImage = resolveMediaPath('20200316-tahiti-bora-bora-147.jpg', '2020-03-16')
  const pages = {
    home: {
      title: "Let's adventure together!",
      seo: 'Travel stories and photo journeys from around the world.',
      content:
        '<p>We are Julie and Carlos, and traveling is our life-long hobby. You can find us either on the road or planning for our next trip. Come explore with us!</p>',
      featuredImage: { node: { sourceUrl: homeHeroImage } },
    },
    'travel-blog': {
      title: 'Travel Blog',
      seo: 'Stories, tips, and destination guides from our travels.',
      content: '<p>Travel stories from around the world.</p>',
      featuredImage: { node: { sourceUrl: heroImage } },
    },
    photography: {
      title: 'Photography',
      seo: 'Photo galleries from destinations around the world.',
      content: '<p>Curated galleries from our travel adventures.</p>',
      featuredImage: { node: { sourceUrl: heroImage } },
    },
    'our-story': {
      title: 'Our Story',
      seo: 'How Our Global Trek started and why we keep exploring.',
      content:
        '<p>We are a travel duo sharing stories, itineraries, and photos to inspire your next adventure.</p>',
      featuredImage: { node: { sourceUrl: heroImage } },
    },
  }

  return pages[slug] || pages.home
}

export async function getAllContentPaths(type) {
  if (type === 'posts') return getAllPostPaths()
  if (type === 'photos') return getAllPhotoPaths()
  return []
}

export async function getAllContent(type, num) {
  if (type === 'posts') {
    const nodes =
      num != null ? await getAllPosts({ limit: num }) : await getAllPosts()
    return { nodes }
  }

  if (type === 'photos') {
    const nodes =
      num != null ? await getAllPhotos({ limit: num }) : await getAllPhotos()
    return { nodes }
  }

  return { nodes: [] }
}

export async function getContentBySlug(slug, type) {
  if (type === 'post') return getPostBySlug(slug)
  if (type === 'photo') return getPhotoBySlug(slug)
  return null
}

export async function getCategories(parent) {
  const { main, list } = getConstCategoryFilters()
  if (parent === 2096) return main
  return list
}

export async function getPhotoCategories() {
  const { main, list } = getConstCategoryFilters()
  const mainForPhotos = main.filter(item => item.slug !== 'budget')
  return { main: mainForPhotos, list }
}
