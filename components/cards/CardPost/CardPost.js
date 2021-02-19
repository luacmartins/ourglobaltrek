import Link from 'next/link'
import Image from '../../common/Image'
import moment from 'moment'
import useLoader from '../../hooks/useLoader'

export default function CardPost({ data, featured }) {
  const {
    title,
    date,
    featuredImage: {
      node: { sourceUrl, srcSet },
    },
    categories,
    slug,
    excerpt,
  } = data

  const tags = [moment(date).format('MMM D, YYYY')]
  const loader = useLoader()

  return (
    <>
      <div
        className={
          'w-full flex ' +
          `${featured ? 'flex-col md:flex-row' : 'justify-between items-center md:flex-col'}`
        }
      >
        {/* IMAGE */}
        <Link href={`/travel-blog/${slug}`}>
          <a
            className={
              `${
                featured
                  ? 'w-full md:w-1/2 lg:mr-8 h-48 md:h-64 lg:h-96'
                  : 'w-32 md:w-full md:h-auto order-2 md:order-none'
              }` + ' relative overflow-hidden block rounded'
            }
          >
            <Image
              src={sourceUrl}
              sizes='300px'
              width={featured ? 800 : 300}
              height={featured ? 600 : 200}
              layout={'responsive'}
              className={
                'object-cover transform transition-transform hover:scale-110 duration-300 block rounded'
              }
            />
          </a>
        </Link>

        <div
          className={`${
            featured
              ? 'w-full md:w-1/2 md:pl-10 xl:pl-12 flex flex-col justify-center mt-4 md:mt-0'
              : 'w-full flex-1 pr-4 md:pr-0 md:mt-4'
          }`}
        >
          {/* COUNTRY & TITLE */}
          {categories.nodes[0] && (
            <div className='text-sm font-medium text-blue-500 capitalize'>
              {categories.nodes[0].name}
            </div>
          )}
          <Link href={`/travel-blog/${slug}`}>
            <a>
              <div className='text-xl font-semibold leading-7 md:text-2xl line-clamp-2 hover:underline'>
                {title}
              </div>
            </a>
          </Link>

          {/* TAGS */}
          <div className='flex items-center mt-1 space-x-1 text-xs font-medium text-gray-500'>
            {tags.map((tag, i) => (
              <div key={i}>
                <span>{tag}</span>
                {i !== tags.length - 1 && <span> • </span>}
              </div>
            ))}
          </div>

          {/* EXCERPT */}
          {excerpt && (
            <div
              className={
                `${
                  featured
                    ? 'line-clamp-2 md:line-clamp-3 lg:line-clamp-4 mb-6 md:mb-0'
                    : 'hidden md:flex md:line-clamp-2'
                }` + ' mt-6 md:mt-4'
              }
              dangerouslySetInnerHTML={{ __html: excerpt }}
            ></div>
          )}
        </div>
      </div>
    </>
  )
}
