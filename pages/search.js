import { useEffect } from "react"
import Head from "../components/common/Head"
import { useRouter } from "next/router"
import { getContentWithFilters } from "../api/useAPI/client"
import { getMenu, getAllContent } from "../api/useAPI/server"
import Layout from "../components/layouts/Layout"
import CardPostList from "../components/cards/CardPostList"
import Pagination from "../components/common/Pagination"

export default function Search({ links, initialData }) {
  const router = useRouter()
  const query = router.query?.q

  useEffect(() => {
    if (!query) router.push("/travel-blog")
  }, [query])

  const { data, isLoading, error, isReachingEnd, loadMore } = getContentWithFilters(
    "posts",
    query,
    initialData
  )

  return (
    <>
      <Head title={query} />

      <Layout links={links}>
        <div className='mx-4 mt-24 md:mt-32 lg:mt-40 md:mx-8 xl:mx-20'>
          <header className='md:text-xl md:font-medium'>Your search results for "{query}"</header>
          <CardPostList data={data} error={error} />
          <Pagination isLoading={isLoading} isReachingEnd={isReachingEnd} loadMore={loadMore} />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const links = await getMenu()
  const initialData = await getAllContent("posts")

  return {
    props: {
      links,
      initialData,
    },
  }
}
