import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { getConstCategoryFilters, resolveConstCategoryNodes } from './categoryFilters'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')
const PHOTOS_DIR = path.join(process.cwd(), 'content', 'photography')
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images')
const PUBLIC_IMAGES_BASE_PATH = '/images'
const UPLOADS_PATH_REGEX =
  /(?:https?:\/\/[^/]+)?(?:\/travel-blog)?\/wp-content\/uploads\/(.+)$/i

function toTitleCase(text = '') {
  return text
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
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

function removeHtmlTags(value = '') {
  return value.replace(/<[^>]*>/g, ' ')
}

function trimWords(value = '', count = 32) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, count)
    .join(' ')
}

/** Turn markdown / loose HTML into plain text so excerpts never break mid-link */
function stripMarkdownToPlain(src) {
  let t = String(src)
  t = t.replace(/<a\s[^>]*>([^<]*)<\/a>/gi, '$1')
  t = t.replace(/<a\s[^>]*>/gi, '')
  t = t.replace(/<\/a>/gi, '')
  t = removeHtmlTags(t)
  let prev
  do {
    prev = t
    t = t.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    t = t.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  } while (t !== prev)
  t = t.replace(/\[([^\]]+)\]\([^)]*$/g, '$1')
  t = t.replace(/\*\*([^*]+)\*\*/g, '$1')
  t = t.replace(/\*([^*\n]+)\*/g, '$1')
  t = t.replace(/`([^`]+)`/g, '$1')
  t = t.replace(/^#{1,6}\s+/gm, '')
  t = t.replace(/\s+/g, ' ').trim()
  return t
}

function normalizeCardExcerpt(raw) {
  const plain = stripMarkdownToPlain(raw)
  const shortened = trimWords(plain, 42)
  return `<p>${escapeHtml(shortened)}</p>`
}

function getExcerptFromMarkdown(markdown = '') {
  const paragraph = markdown.split('\n\n').find(block => block.trim()) || ''
  return normalizeCardExcerpt(paragraph)
}

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
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

  // Prefer flat path when file naming is already normalized in public/images.
  return `${PUBLIC_IMAGES_BASE_PATH}/${flatCandidate}`
}

function getGalleryImages(markdown = '', date = '') {
  const markdownImageRegex = /!\[[^\]]*]\(([^)]+)\)/g
  const htmlImageRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/g
  const images = []
  let match

  while ((match = markdownImageRegex.exec(markdown)) !== null) {
    images.push(resolveMediaPath(match[1], date))
  }

  while ((match = htmlImageRegex.exec(markdown)) !== null) {
    images.push(resolveMediaPath(match[1], date))
  }

  return Array.from(new Set(images.filter(Boolean)))
}

function getAllPostFiles(directory) {
  return fs.readdirSync(directory).filter(file => file.endsWith('.md'))
}

async function markdownToHtml(markdown = '', date = '') {
  const htmlContent = marked.parse(markdown || '')
  return htmlContent.replace(/src="([^"]+)"/g, (_, src) => `src="${resolveMediaPath(src, date)}"`)
}

function parseFile(fileName, directory) {
  const slugFromFile = fileName.replace(/\.md$/, '')
  const fullPath = path.join(directory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const slug = data.slug || slugFromFile
  const date = toIsoDate(data.date)
  const categories = Array.isArray(data.categories) ? data.categories : []
  const normalizedCategories = categories
    .map(category => String(category).trim().toLowerCase())
    .filter(category => Boolean(category))

  return {
    slug,
    title: data.title || toTitleCase(slug),
    date,
    author: data.author || 'ourglobaltrek',
    seo: data.seo || data.title || toTitleCase(slug),
    rawContent: content,
    excerpt:
      data.excerpt != null && String(data.excerpt).trim() !== ''
        ? normalizeCardExcerpt(String(data.excerpt))
        : getExcerptFromMarkdown(content),
    categorySlugs: normalizedCategories,
    coverImageUrl: resolveMediaPath(data.coverImage || '', date),
  }
}

async function buildPostNode(post) {
  const htmlContent = await markdownToHtml(post.rawContent, post.date)
  const galleryImages = getGalleryImages(post.rawContent, post.date)
  const categoryNodes = resolveConstCategoryNodes(post.categorySlugs)

  return {
    title: post.title,
    slug: post.slug,
    date: post.date,
    seo: post.seo,
    excerpt: post.excerpt,
    content: htmlContent,
    author: { node: { name: post.author } },
    featuredImage: { node: { sourceUrl: post.coverImageUrl } },
    categories: { nodes: categoryNodes },
    galleryImages,
    searchText: `${post.title} ${removeHtmlTags(post.excerpt)} ${removeHtmlTags(htmlContent)}`.toLowerCase(),
  }
}

async function buildPostsData(directory) {
  const files = getAllPostFiles(directory)
  const posts = files
    .map(fileName => parseFile(fileName, directory))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  const { main, list } = getConstCategoryFilters()
  const nodes = await Promise.all(posts.map(post => buildPostNode(post)))
  return { nodes, categories: { main, list } }
}

let postsCachePromise = null
let photosCachePromise = null

async function getPostsData() {
  if (!postsCachePromise) {
    postsCachePromise = buildPostsData(POSTS_DIR)
  }
  return postsCachePromise
}

async function getPhotosData() {
  if (!photosCachePromise) {
    photosCachePromise = buildPostsData(PHOTOS_DIR)
  }
  return photosCachePromise
}

export async function getAllPosts({ limit } = {}) {
  const { nodes } = await getPostsData()
  if (limit) return nodes.slice(0, limit)
  return nodes
}

export async function getPostBySlug(slug) {
  const normalized = String(slug).replace(/\.md$/, '')
  const posts = await getAllPosts()
  return posts.find(post => post.slug === normalized) || null
}

export async function getAllPostPaths() {
  const posts = await getAllPosts()
  return posts.map(post => ({ params: { slug: post.slug } }))
}

export async function getPostFilterCategories() {
  const { categories } = await getPostsData()
  return categories
}

function toPhotoContent(images, title) {
  return images
    .map(image => `<p><img src="${image}" alt="${escapeHtml(title)}" /></p>`)
    .join('\n\n\n\n')
}

function toPhotoNode(post) {
  const coverImage = post.featuredImage?.node?.sourceUrl || ''
  const images = post.galleryImages.length ? post.galleryImages : [coverImage].filter(Boolean)
  const featuredImageUrl = coverImage || images[0] || ''
  return {
    title: post.title,
    slug: post.slug,
    seo: post.seo,
    categories: post.categories,
    featuredImage: { node: { sourceUrl: featuredImageUrl } },
    content: toPhotoContent(images, post.title),
    searchText: post.searchText,
  }
}

export async function getAllPhotos({ limit } = {}) {
  const { nodes: posts } = await getPhotosData()
  const nodes = posts.map(toPhotoNode)
  if (limit) return nodes.slice(0, limit)
  return nodes
}

export async function getPhotoBySlug(slug) {
  const normalized = String(slug).replace(/\.md$/, '')
  const photos = await getAllPhotos()
  return photos.find(photo => photo.slug === normalized) || null
}

export async function getAllPhotoPaths() {
  const photos = await getAllPhotos()
  return photos.map(photo => ({ params: { slug: photo.slug } }))
}
