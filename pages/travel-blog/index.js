import { useRouter } from 'next/router'
import Head from '../../components/common/Head'
import Layout from '../../components/layouts/Layout'
import Filters from '../../components/common/Filters'
import CardPostList from '../../components/cards/CardPostList'
import Pagination from '../../components/common/Pagination'
import {
  getMenu,
  getPageBySlug,
  getAllContent,
  getCategories,
  getContentWithFilters,
} from '../../api/useAPI'

export default function TravelBlog({ links, page, categories, initialData }) {
  const router = useRouter()
  const path = router.query?.q
  const query = (path && [...path.split(',').map(x => parseInt(x))]) || []

  const { data, isLoading, error, isReachingEnd, loadMore } = getContentWithFilters(
    'posts',
    query,
    initialData
  )

  return (
    <>
      <Head title={page.title} description={page.seo} />

      <Layout links={links}>
        <div className='mx-4 mt-24 md:mt-32 lg:mt-40 md:mx-8 xl:mx-20'>
          {!error && <Filters categories={categories} query={query} />}
          <CardPostList data={data} error={error} />
          <Pagination isLoading={isLoading} isReachingEnd={isReachingEnd} loadMore={loadMore} />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const links = await getMenu()
  const data = await getAllContent('posts')
  const page = await getPageBySlug('travel-blog')
  const listCategories = await getCategories(1984)
  const mainCategories = await getCategories(2096)

  return {
    props: {
      links,
      page,
      categories: {
        main: mainCategories,
        list: listCategories,
      },
      initialData: data,
    },
  }
}
