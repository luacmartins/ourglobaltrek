import useSearch from '../../hooks/useSearch'

export default function Search({ toggle }) {
   const { value, handleChange, handleSubmit } = useSearch(toggle)

   return (
      <>
         <div onClick={toggle} className="fixed inset-0 w-screen h-screen bg-gray-300 bg-blur-3 bg-opacity-75 z-10"></div>
         <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 h-14 rounded-lg overflow-hidden z-20 bg-white w-11/12 md:w-1/2">
            <form onSubmit={handleSubmit} className="h-full flex items-center text-blue-500">
               <svg className="h-6 ml-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M22.133 20.133l7.2 7.2-2 2-7.2-7.2c-1.867 1.467-4.133 2.267-6.667 2.267-6 0-10.8-4.8-10.8-10.8s4.8-10.933 10.8-10.933 10.8 4.8 10.8 10.8c0 2.533-0.8 4.8-2.133 6.667zM13.467 21.6c4.533 0 8.133-3.6 8.133-8.133s-3.6-8.133-8.133-8.133-8.133 3.6-8.133 8.133 3.6 8.133 8.133 8.133z"></path></svg>
               <input value={value} onChange={handleChange} className="rounded h-14 px-4 flex-1 text-lg text-gray-600 placeholder-gray-500 focus:outline-none" type="text" placeholder="Search" autoFocus />
            </form>
         </div>
      </>
   )
}