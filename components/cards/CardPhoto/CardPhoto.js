import Link from "next/link"
import Image from "next/image"
import useLoader from "../../hooks/useLoader"

export default function CardPhoto({ data, height }) {
  const {
    title,
    slug,
    featuredImage: {
      node: { sourceUrl, srcSet },
    },
    categories: { nodes: categories },
  } = data

  const loader = useLoader()

  return (
    <>
      <Link href={`/photography/${slug}`}>
        <a>
          <div
            className={`flex flex-col relative overflow-hidden rounded transition-opacity cursor-pointer hover:opacity-90 ${height}`}
          >
            <Image
              loader={loader}
              src={sourceUrl}
              layout={"fill"}
              className={`object-cover`}
            />
            <div className='absolute bottom-0 w-full opacity-75 h-2/5 bg-gradient-to-t from-gray-800 to-transparent'></div>
            <div className='absolute bottom-0 m-4 text-white'>
              {categories[0] && (
                <div className='text-sm font-medium md:text-xs lg:text-sm'>
                  {categories[0].name}
                </div>
              )}
              <div className='text-3xl font-bold md:text-xl lg:text-2xl line-clamp-1'>
                {title}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  )
}
