import useOverlay from '../../hooks/useOverlay'
import useFilter from '../../hooks/useFilter'

export default function Filters({ categories: { main, list }, query, setQuery }) {
   const [isOpen, toggleModal] = useOverlay()
   const {
      filter,
      showClear,
      add,
      addAll,
      toggle,
      clear,
      clearAll,
      update,
      close
   } = useFilter(query, main, setQuery, toggleModal)

   return (
      <>
         {/* BAR */}
         <div className="flex font-medium justify-between items-center border-b border-gray-300 pb-4 md:mb-12">

            {/* MAIN CATEGORY BUTTONS */}
            <div className="space-x-4">
               <span onClick={clearAll} className={`${filter.main === '' ? 'text-gray-900' : 'text-gray-500'} cursor-pointer`}>All</span>
               {main.map(item => (
                  <span
                     key={item.databaseId}
                     onClick={() => add(item.databaseId)}
                     className={`text-gray-500 hover:text-gray-900 transition-colors cursor-pointer 
                     ${filter.main === item.databaseId ? 'text-gray-900' : ''}`}
                  >
                     {item.name}
                  </span>
               ))}
            </div>

            {/* FILTERS BUTTON */}
            <div className="flex">
               {showClear && <button onClick={clearAll} className="text-blue-500 px-2 md:px-4 mr-2 md:mr-4 text-sm md:text-base hover:text-blue-600 transition-colors focus:outline-none">Clear</button>}
               <button onClick={toggleModal} className="px-3 py-1 border text-sm md:text-base border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600 transition-colors rounded">
                  Filters
            </button>
            </div>
         </div>

         {/* MODAL */}
         {isOpen && <>
            <div onClick={close} className="hidden md:flex fixed inset-0 w-screen h-screen bg-gray-300 bg-blur-3 bg-opacity-75 z-10"></div>
            <div className="fixed flex flex-col inset-0 md:inset-36 lg:inset-y-32 lg:inset-x-56 xl:inset-x-80 bg-white bg-opacity-75 bg-blur-5 rounded-lg z-10">
               {/* HEADER */}
               <div className="h-14 flex items-center justify-between">
                  <button onClick={clear} className="ml-4 text-blue-500 hover:text-blue-600 transition-colors focus:outline-none">
                     {filter.list.length > 0 && 'Clear filters'}
                  </button>
                  <button onClick={close} className="h-14 w-14 flex items-center text-gray-600 justify-center hover:text-gray-900 transition-colors focus:outline-none">
                     <svg className="h-6 fill-current" viewBox="0 0 329.269 329" xmlns="http://www.w3.org/2000/svg"><path d="M194.8 164.77L323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0" /></svg>
                  </button>
               </div>

               {/* MAIN */}
               <div className="flex-1 px-4 py-4 overflow-y-scroll">
                  {list.map(item => (
                     <div key={item.databaseId} className="mb-6">
                        <div className="flex justify-between items-baseline border-b border-gray-300">
                           <div className="font-medium text-lg">{item.name}</div>
                           <div onClick={() => addAll(item.children.nodes)} className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">Select all</div>
                        </div>
                        <div className="mt-4 flex flex-wrap">
                           {item.children.nodes.map(country => (
                              <span
                                 key={country.databaseId}
                                 onClick={() => toggle(country.databaseId)}
                                 className={`border text-sm rounded-full px-2 py-1 mr-2 mb-2 cursor-pointer transition-colors ` +
                                    `${filter.list.includes(country.databaseId) ? 'text-blue-500 border-blue-500' : 'border-gray-500 text-gray-500 hover:text-gray-700 hover:border-gray-700 '}`
                                 }
                              >
                                 {country.name}
                              </span>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>

               {/* FOOTER */}
               <div className="border-t pt-3 py-4 px-4 border-gray-300 flex items-center lg:justify-end">
                  <button onClick={update} className="w-full lg:w-40 py-2 bg-blue-500 text-sm text-white rounded hover:bg-blue-600 transition-colors">
                     Update results
                  </button>
               </div>
            </div>
         </>}
      </>
   )
}