import { request } from 'graphql-request'
const uri = process.env.NEXT_PUBLIC_API_URI

export default async function fetcher(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const res = await fetch(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json()
  return json.data
}

export const swrFetcher = query => request(uri, query)
