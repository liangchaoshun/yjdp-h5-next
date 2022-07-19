import type { FC } from 'react'
import Head from 'next/head'
import { Carousel } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames'

import styles from './home.module.scss'

const Home: FC<any> = (props) => {
  const { banner, products } = props

  return (
    <div>
      <Head>
        <title>home</title>
      </Head>
      <main>
        <Carousel autoplay>
          {banner.map((item: any) => (
            <div className='h-96' key={item._id}>
              <Link href='/contact'>
                <Image
                  src={item.path}
                  layout='responsive'
                  width={375}
                  height={375}
                />
              </Link>
            </div>
          ))}
        </Carousel>
        <section className='grid grid-cols-2 gap-2.5 p-2.5'>
          {products.map((item: any) => (
            <div
              className='bg-white overflow-hidden rounded box-border border border-solid border-[#9e9e9e66]'
              key={item._id}
            >
              <div className=''>
                <Image src={item.icon_url} width={170.5} height={170.5} />
              </div>
              <div className='p-2.5'>
                <div
                  className={classNames(
                    styles['goods-desc'],
                    'h-10 mb-2.5 text-sm text-[#423f3f] overflow-hidden leading-5 text-ellipsis'
                  )}
                >
                  {item.desc_en}
                </div>
                <div>
                  <span className='text-xs text-[#fa2c19]'>￥</span>
                  <span className='text-base text-[#fa2c19]'>{item.price}</span>
                  <span className='text-xs text-[#6c6c6c]'>(RMB)</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const bannerResult = (await fetch(
    `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/goods/home/banner`
  )) as unknown as any

  const productsResult = (await fetch(
    `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/goods/home/products`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_index: 1 }),
    }
  )) as unknown as any

  // console.log('bannerResult => ', bannerResult)

  const { data: banner_data, error_code: banner_ecode } =
    await bannerResult.json()
  const banner = banner_ecode === '00' ? banner_data.res : []

  const { data: product_data, error_code: product_ecode } =
    await productsResult.json()
  const products = product_ecode === '00' ? product_data.res : []

  return {
    props: {
      banner,
      products,
    },
    revalidate: 1800, // 秒
  }
}

export default Home
