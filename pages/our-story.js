import Head from 'next/head'
import { getMenu, getPageBySlug } from '../api/useAPI'
import Layout from '../components/layouts/Layout'
import HeroPage from '../components/heroes/HeroPage'
import Article from '../components/common/Article'

export default function OurStory({ links, page }) {
   const { title, content, featuredImage: { node: { srcSet, sourceUrl } } } = page

   return (
      <>
         <Head>
            <title>ourglobaltrek - {title}</title>
            <link rel="icon" href="/" />
         </Head>

         <Layout links={links}>
            {/* HERO */}
            <HeroPage image={sourceUrl} title={title} />

            {/* CONTENT */}
            <Article data={content} />
         </Layout>
      </>
   )
}

export async function getStaticProps() {
   const links = await getMenu()
   const page = await getPageBySlug('our-story')

   return {
      props: {
         links,
         page
      }
   }
}