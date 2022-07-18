import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

interface ProductInter {
  _id: number
  name_zh: string
  desc_zh: string
}

const requrl = 'http://localhost:7717/wx/yjdp/api/goods/home/products'
// const requrl = 'https://nextjs01-ac494-default-rtdb.firebaseio.com/products.json'

const Product: NextPage = (props: any) => {
  // console.log('props => ', props)
  const { products } = props
  const [pageIndex, setPageIndex] = useState(1)
  const [productsCache, setProductsCache] = useState(products)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const result = (await fetch(requrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_index: 2, page_size: 2 }),
    })) as unknown as any
    const { data, error_code } = await result.json()
    const products = error_code === '00' ? data.res : []
    const hy = [
      ...productsCache,
      ...products,
      { _id: `${Math.random()}`, name_zh: 'aaa', desc_zh: 'desc1111' },
    ]
    setProductsCache(hy)
  }

  return (
    <div>
      <h4>这是产品列表</h4>
      <ul>
        {productsCache?.map((p: ProductInter) => (
          <li key={p._id}>
            <span>{p.name_zh}: </span>
            <span>{p.desc_zh}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  console.log('product.tsx 页面生成...')
  const result = (await fetch(requrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_index: 1, page_size: 2 }),
  })) as unknown as any
  const { data, error_code } = await result.json()
  const products = error_code === '00' ? data.res : []

  // By returning { props: { products } }, the Blog component
  // will receive `products` as a prop at build time
  return {
    props: {
      products,
    },
    revalidate: 60, // 秒
  }
}

export default Product
