import Head from 'next/head'
import { useRouter } from 'next/router'
import { getMenu, getSearch } from '../api/useAPI'
import Layout from '../components/layouts/Layout'
import CardPostList from '../components/cards/CardPostList'
import Pagination from '../components/common/Pagination'

export default function Search({ links }) {
   const query = useRouter().query.q
   const { data, isLoading, error, isReachingEnd, loadMore } = getSearch(query)

   return (
      <>
         <Head>
            <title>ourglobaltrek - Travel Blog</title>
            <link rel="icon" href="/" />
         </Head>

         <Layout links={links}>
            <div className="mx-4 mt-24 md:mt-32 lg:mt-40 md:mx-8 xl:mx-20">
               <header className="md:text-xl md:font-medium">Your search results for "{query}"</header>
               <CardPostList data={data} error={error} />
               <Pagination isLoading={isLoading} isReachingEnd={isReachingEnd} loadMore={loadMore} />
            </div>
         </Layout>
      </>
   )
}

export async function getStaticProps() {
   const links = await getMenu()

   return {
      props: {
         links
      }
   }
}