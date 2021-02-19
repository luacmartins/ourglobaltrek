import { useEffect, useRef } from "react"
import useSearch from "../../hooks/useSearch"

export default function Search({ toggle }) {
  const { value, handleChange, handleSubmit } = useSearch(toggle)
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus()
  }, [])

  return (
    <>
      <div
        onClick={toggle}
        className='fixed inset-0 z-10 w-screen h-screen bg-gray-300 bg-opacity-75 bg-blur-3'
      ></div>
      <div className='fixed z-20 w-11/12 overflow-hidden bg-white rounded-lg transform -translate-x-1/2 top-1/4 left-1/2 -translate-y-1/4 h-14 md:w-1/2'>
        <form onSubmit={handleSubmit} className='flex items-center h-full text-blue-500'>
          <svg
            className='h-6 ml-4 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 32 32'
            aria-hidden='true'
          >
            <path d='M22.133 20.133l7.2 7.2-2 2-7.2-7.2c-1.867 1.467-4.133 2.267-6.667 2.267-6 0-10.8-4.8-10.8-10.8s4.8-10.933 10.8-10.933 10.8 4.8 10.8 10.8c0 2.533-0.8 4.8-2.133 6.667zM13.467 21.6c4.533 0 8.133-3.6 8.133-8.133s-3.6-8.133-8.133-8.133-8.133 3.6-8.133 8.133 3.6 8.133 8.133 8.133z'></path>
          </svg>
          <input
            ref={ref}
            value={value}
            onChange={handleChange}
            className='flex-1 px-4 text-lg text-gray-600 placeholder-gray-500 rounded h-14 focus:outline-none'
            type='text'
            placeholder='Search'
            autoFocus
          />
        </form>
      </div>
    </>
  )
}
