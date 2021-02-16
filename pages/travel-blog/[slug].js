import Head from 'next/head'
import Layout from '../../components/layouts/Layout'
import HeroPage from '../../components/heroes/HeroPage'
import Article from '../../components/common/Article'
import moment from 'moment'
import { getMenu, getAllPostPaths, getPostBySlug } from '../../api/useAPI'

export default function Post({ links, post }) {
   const { title, content, date, author: { node: { name: author } }, featuredImage: { node: { sourceUrl, srcSet } } } = post
   const published = `Published ${moment(date).fromNow()} by ${author}`
   const readTime = '3 min read'
   const tags = [readTime, published]

   return (
      <>
         <Head>
            <title>ourglobaltrek - {title}</title>
            <link rel="icon" href="/" />
         </Head>

         <Layout links={links}>
            {/* HERO */}
            <HeroPage image={sourceUrl} title={title} tags={tags} />

            {/* CONTENT */}
            <Article data={content} />
         </Layout>
      </>
   )
}

export async function getStaticPaths() {
   const allPaths = await getAllPostPaths()

   return {
      paths: allPaths.map(path => `/travel-blog/${path.slug}`),
      fallback: true
   }
}

export async function getStaticProps({ params }) {
   const links = await getMenu()
   const post = await getPostBySlug(params.slug)
   return {
      props: {
         links,
         post
      }
   }
}