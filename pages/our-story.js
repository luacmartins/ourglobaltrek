import Head from "../components/common/Head"
import { getMenu, getPageBySlug } from '../api/useAPI'
import Layout from '../components/layouts/Layout'
import HeroPage from '../components/heroes/HeroPage'
import Article from '../components/common/Article'

export default function OurStory({ links, page }) {
   const { title, seo, content, featuredImage: { node: { sourceUrl } } } = page

   return (
      <>
         <Head title={title} description={seo} />

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