import useNewsletter from '../../hooks/useNewsletter'

export default function Newsletter() {
   const { formData, message, handleChange, handleSubmit } = useNewsletter()

   return (
      <>
         <form onSubmit={handleSubmit} className="flex flex-col md:flex-row mt-6 md:rounded-lg md:overflow-hidden">
            <fieldset className="rounded-lg md:rounded-none md:rounded-l-lg md:flex md:flex-1 overflow-hidden md:border-t md:border-l md:border-b md:border-gray-300">
               <input className="w-full px-3 py-2 text-gray-600 border-b border-blue-50 outline-none md:w-2/5 md:border-none" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Name" autoFocus />
               <input className="w-full px-3 py-2 text-gray-600 outline-none flex-1 md:border-l md:border-gray-300" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </fieldset>
            <button className="bg-blue-500 font-semibold mt-3 md:mt-0 w-full md:w-1/5 py-2 rounded-lg md:rounded-none text-white hover:bg-blue-600">Sign up</button>
         </form>
         {message?.success && <div className="text-green-600 mt-2">{message.success}</div>}
         {message?.error && <div className="text-red-600 mt-2">{message.error}</div>}
      </>
   )
}
