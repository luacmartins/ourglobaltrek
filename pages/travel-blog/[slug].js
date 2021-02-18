import Head from "../../components/common/Head"
import Layout from "../../components/layouts/Layout"
import HeroPage from "../../components/heroes/HeroPage"
import Article from "../../components/common/Article"
import moment from "moment"
import { getMenu, getAllContentPaths, getContentBySlug } from "../../api/useAPI"

export default function Post({ links, post }) {
  const {
    title,
    content,
    seo,
    date,
    author: {
      node: { name: author },
    },
    featuredImage: {
      node: { sourceUrl },
    },
  } = post
  const published = `Published ${moment(date).fromNow()} by ${author}`
  const readTime = "3 min read"
  const tags = [readTime, published]

  return (
    <>
      <Head title={title} description={seo} />

      <Layout links={links}>
        {/* HERO */}
        <HeroPage image={sourceUrl} title={title} tags={tags} />

        {/* CONTENT */}
        <Article data={content} />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const allPaths = await getAllContentPaths("posts")

  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const links = await getMenu()
  const post = await getContentBySlug(params.slug, "post")
  return {
    props: {
      links,
      post,
    },
  }
}
