import Head from "../../components/common/Head"
import useSize from "../../components/hooks/useSize"
import GalleryDesktop from "../../components/common/GalleryDesktop"
import GalleryMobile from "../../components/common/GalleryMobile"
import { getAllContentPaths, getContentBySlug } from "../../api/useAPI"

export default function Photo({ photos }) {
  const { title, content } = photos
  const { isDesktop } = useSize()
  const images = content.split("\n\n\n\n")

  return (
    <>
      <Head title={title} description={photos.seo} />

      {isDesktop ? <GalleryDesktop images={images} /> : <GalleryMobile images={images} />}
    </>
  )
}

export async function getStaticPaths() {
  const allPaths = await getAllContentPaths("photos")
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const photos = await getContentBySlug(params.slug, "photo")
  return {
    props: {
      photos,
    },
  }
}
