import { useRouter } from 'next/router'
import Head from '../../components/common/Head'
import Layout from '../../components/layouts/Layout'
import Filters from '../../components/common/Filters'
import CardPhotoList from '../../components/cards/CardPhotoList'
import Pagination from '../../components/common/Pagination'
import { getContentWithFilters } from '../../api/useAPI/client'
import { getMenu, getPageBySlug, getAllContent, getPhotoCategories } from '../../api/useAPI/server'

export default function Photography({ links, page, categories, initialData }) {
  const router = useRouter()
  const path = router.query?.q
  const query = (path && [...path.split(',').map(x => parseInt(x))]) || []

  const { title, seo } = page
  const { data, isLoading, error, isReachingEnd, loadMore } = getContentWithFilters(
    'photos',
    query,
    initialData
  )

  return (
    <>
      <Head title={title} description={seo} />

      <Layout links={links}>
        <div className='mx-4 mt-24 md:mt-32 lg:mt-40 md:mx-8 xl:mx-20'>
          {!error && <Filters categories={categories} query={query} />}
          <CardPhotoList data={data} error={error} />
          <Pagination isLoading={isLoading} isReachingEnd={isReachingEnd} loadMore={loadMore} />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const links = await getMenu()
  const data = await getAllContent('photos')
  const page = await getPageBySlug('photography')
  const categories = await getPhotoCategories()

  return {
    props: {
      links,
      page,
      categories,
      initialData: data,
    },
  }
}
