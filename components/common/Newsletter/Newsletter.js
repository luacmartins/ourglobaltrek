export default function Newsletter() {
   return (
      <>
         <form className="flex flex-col md:flex-row mt-6 md:rounded-lg md:overflow-hidden">
            <fieldset className="rounded-lg md:rounded-none md:rounded-l-lg md:flex md:flex-1 overflow-hidden md:border-t md:border-l md:border-b md:border-gray-300">
               <input className="w-full px-3 py-2 text-gray-600 border-b border-blue-50 outline-none md:w-2/5 md:border-none" type="text" placeholder="Name" autoFocus />
               <input className="w-full px-3 py-2 text-gray-600 outline-none flex-1 md:border-l md:border-gray-300" type="email" placeholder="Email" />
            </fieldset>
            <button className="bg-blue-500 font-semibold mt-3 md:mt-0 w-full md:w-1/5 py-2 rounded-lg md:rounded-none text-white hover:bg-blue-600">Sign up</button>
         </form>
      </>
   )
}
