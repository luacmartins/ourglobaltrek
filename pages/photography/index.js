import Head from 'next/head'
import { useState } from 'react'
import { getMenu, getAllPhotos, getCategories, getPhotosWithFilters } from '../../api/useAPI'
import Layout from '../../components/layouts/Layout'
import Filters from '../../components/common/Filters'
import CardPhotoList from '../../components/cards/CardPhotoList'
import Pagination from '../../components/common/Pagination'

export default function Photography({ links, categories, initialData }) {
   const [query, setQuery] = useState([])
   const { data, isLoading, error, isReachingEnd, loadMore } = getPhotosWithFilters(query, initialData)

   return (
      <>
         <Head>
            <title>ourglobaltrek - Photography</title>
            <link rel="icon" href="/" />
         </Head>

         <Layout links={links}>
            <div className="mt-24 md:mt-32 lg:mt-40 mx-4 md:mx-8 xl:mx-20">
               {!error && <Filters categories={categories} query={query} setQuery={setQuery} />}
               <CardPhotoList data={data} error={error} />
               <Pagination isLoading={isLoading} isReachingEnd={isReachingEnd} loadMore={loadMore} />
            </div>
         </Layout>
      </>
   )
}

export async function getStaticProps() {
   const links = await getMenu()
   const data = await getAllPhotos(10)
   const listCategories = await getCategories(1984)
   const mainCategories = await getCategories(2096)

   return {
      props: {
         links,
         categories: {
            main: mainCategories,
            list: listCategories
         },
         initialData: data
      }
   }
}