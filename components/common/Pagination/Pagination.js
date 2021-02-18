import Spinner from "../Spinner"

export default function Pagination({ isLoading, isReachingEnd, error, loadMore }) {
  if (error || isReachingEnd) return <></>
  if (isLoading) return <Spinner />

  return (
    <>
      <div className='flex items-center justify-center h-32'>
        <button
          onClick={loadMore}
          className='h-12 px-12 text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none'
        >
          Load more results
        </button>
      </div>
    </>
  )
}
