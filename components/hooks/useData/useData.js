import useSWR from 'swr'
import { request } from 'graphql-request'
import { homePosts } from '../../../api/queries'

const uri = process.env.NEXT_PUBLIC_API_URI
const fetcher = query => request(uri, query)

export const getHomepage = () => {
   const { data, error } = useSWR(homepage, fetcher)
   return { data, error }
}

export default function useData(endpoint) {
   const links = [
      { name: 'Our Story', href: '/our-story' },
      { name: 'Travel Blog', href: '/travel-blog' },
      { name: 'Photography', href: '/photography' },
   ]

   const posts = [
      { id: 1, image: 'bg.jpg', slug: 'bora-bora', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, excerpt: 'This is a test and you should not take it seriously. I live life to the fullest every day. This is a test and you should not take it seriously. I live life to the fullest every day.' },
      { id: 2, image: 'bg.jpg', slug: 'bora-bora', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, excerpt: 'This is a test and you should not take it seriously. I live life to the fullest every day. This is a test and you should not take it seriously. I live life to the fullest every day.' },
      { id: 3, image: 'bg.jpg', slug: 'bora-bora', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, excerpt: 'This is a test and you should not take it seriously. I live life to the fullest every day. This is a test and you should not take it seriously. I live life to the fullest every day.' },
      { id: 4, image: 'bg.jpg', slug: 'bora-bora', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, excerpt: 'This is a test and you should not take it seriously. I live life to the fullest every day. This is a test and you should not take it seriously. I live life to the fullest every day.' },
   ]

   const photos = [
      { id: 1, image: 'bg.jpg', category: 'Photography', subcategory: 'French Polynesia', title: 'Bora Bora', author: { image: 'bg.jpg', name: 'Carlos' }, numImages: 10 },
      { id: 2, image: 'bg.jpg', category: 'Photography', subcategory: 'Chile', title: 'Easter Island', author: { image: 'bg.jpg', name: 'Carlos' }, numImages: 10 },
      { id: 3, image: 'bg.jpg', category: 'Photography', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a year', author: { image: 'bg.jpg', name: 'Carlos' }, numImages: 10 },
      { id: 4, image: 'bg.jpg', category: 'Photography', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora', author: { image: 'bg.jpg', name: 'Carlos' }, numImages: 10 },
      { id: 5, image: 'bg.jpg', category: 'Photography', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a year', author: { image: 'bg.jpg', name: 'Carlos' }, numImages: 10 },
      { id: 6, image: 'bg.jpg', category: 'Photography', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a year', author: { image: 'bg.jpg', name: 'Carlos' }, numImages: 10 },
   ]

   const travelBlog = [
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
      { id: 1, image: 'bg.jpg', category: 'Oceania', subcategory: 'French Polynesia', title: 'Traveling in Bora Bora for a whole full year', date: 'Dec 23, 2020', readTime: '3 min read', author: { image: 'bg.jpg', name: 'Carlos' }, },
   ]

   const info = { links, posts, photos, travelBlog }

   return { data: info[endpoint] }
}