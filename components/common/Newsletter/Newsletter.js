import useNewsletter from "../../hooks/useNewsletter"

export default function Newsletter() {
  const { formData, message, handleChange, handleSubmit } = useNewsletter()

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col mt-6 md:flex-row md:rounded-lg md:overflow-hidden'
      >
        <fieldset className='overflow-hidden rounded-lg md:rounded-none md:rounded-l-lg md:flex md:flex-1 md:border-t md:border-l md:border-b md:border-gray-300'>
          <input
            className='w-full px-3 py-2 text-gray-600 border-b outline-none border-blue-50 md:w-2/5 md:border-none'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
          />
          <input
            className='flex-1 w-full px-3 py-2 text-gray-600 outline-none md:border-l md:border-gray-300'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
          />
        </fieldset>
        <button className='w-full py-2 mt-3 font-semibold text-white bg-blue-500 rounded-lg md:mt-0 md:w-1/5 md:rounded-none hover:bg-blue-600'>
          Sign up
        </button>
      </form>
      {message?.success && <div className='mt-2 text-green-600'>{message.success}</div>}
      {message?.error && <div className='mt-2 text-red-600'>{message.error}</div>}
    </>
  )
}
