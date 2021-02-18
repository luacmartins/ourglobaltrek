import Spinner from '../Spinner'

export default function Pagination({ isLoading, isReachingEnd, error, loadMore }) {
   if (isLoading) return <Spinner />
   return (
      <>
         {!isReachingEnd && !error &&
            <div className="flex justify-center mt-16">
               <button onClick={loadMore} className="px-12 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors focus:outline-none">
                  Load more results
            </button>
            </div>
         }
      </>
   )
}