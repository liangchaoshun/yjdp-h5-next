import type { FC } from 'react'
import Head from 'next/head'
import { Carousel } from 'antd'
import Image from 'next/image'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { fetchBannerList, fetchHomeGoodsList } from '../http/home'

import styles from './home.module.scss'

const Home: FC<any> = (props) => {
  const { banner, goods } = props
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>home</title>
      </Head>
      <main>
        <Carousel autoplay>
          {banner.map((item: any) => (
            <div
              className='h-96'
              key={item._id}
              onClick={() => router.push(`/detail/${item._id}`)}
            >
              <Image
                src={item.path}
                layout='responsive'
                width={375}
                height={375}
              />
            </div>
          ))}
        </Carousel>
        <section className='grid grid-cols-2 gap-2.5 p-2.5'>
          {goods.map((item: any) => (
            <div
              className='bg-white overflow-hidden rounded box-border border border-solid border-[#9e9e9e66]'
              key={item._id}
              onClick={() => router.push(`/detail/${item._id}`)}
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
  const bannerResult = await fetchBannerList()
  const goodsResult = await fetchHomeGoodsList()

  // console.log('bannerResult => ', bannerResult)

  const { data: banner_data, error_code: banner_ecode } = bannerResult
  const banner = banner_ecode === '00' ? banner_data.res : []

  const { data: goods_data, error_code: goods_ecode } = goodsResult
  const goods = goods_ecode === '00' ? goods_data.res : []

  return {
    props: {
      banner,
      goods,
    },
    revalidate: 1800, // 秒
  }
}

export default Home
