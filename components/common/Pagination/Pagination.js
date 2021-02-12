import Spinner from '../Spinner'

export default function Pagination({ isLoading, error, pageInfo, loadMore }) {
   // if (isLoading) return <Spinner />
   return (
      <>
         {!isLoading && !error && pageInfo?.hasNextPage &&
            <div className="flex justify-center mt-16">
               <button onClick={() => loadMore(pageInfo?.endCursor)} className="bg-blue-500 px-12 py-2 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none">
                  Load more results
            </button>
            </div>
         }
      </>
   )
}