import Head from '../components/common/Head'
import { getMenu, getAllContent, getPageBySlug } from '../api/useAPI'
import useSize from '../components/hooks/useSize'
import HeroHomeDesktop from '../components/heroes/HeroHomeDesktop'
import HeroHomeMobile from '../components/heroes/HeroHomeMobile'
import CardPostList from '../components/cards/CardPostList'
import CardPhotoList from '../components/cards/CardPhotoList'
import Section from '../components/common/Section'
import Layout from '../components/layouts/Layout'

export default function Home({ links, page, posts, photos }) {
  const { isMobile } = useSize()

  return (
    <>
      <Head title={page.title} description={page.seo} />
      <Layout links={links}>
        {/* HERO */}
        <div className='min-h-176'>
          {isMobile ? <HeroHomeMobile data={page} /> : <HeroHomeDesktop data={page} />}
        </div>

        {/* POSTS */}
        <Section title={'Latest posts'} link={'More posts'} href={'/travel-blog'}>
          <CardPostList data={posts} home />
        </Section>

        {/* PHOTOGRAPHY */}
        <Section
          tag={'Explore'}
          title={'Photography'}
          link={'more galleries'}
          href={'/photography'}
        >
          <CardPhotoList data={photos} />
        </Section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const links = await getMenu()
  const page = await getPageBySlug('home')
  const posts = await getAllContent('posts', 4)
  const photos = await getAllContent('photos', 6)

  return {
    props: {
      links,
      page,
      posts: posts.nodes,
      photos: photos.nodes,
    },
  }
}
