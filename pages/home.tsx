import { FC, useEffect, useState } from 'react'
import Head from 'next/head'
import { Carousel, Button } from 'antd'
import Image from 'next/image'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { fetchBannerList, fetchHomeGoodsList } from '../http/home'
import { useSelector } from 'react-redux'
import { wrapper, State } from '../store/store'
import A from '../components/A'

import styles from './home.module.scss'

// const Home: FC<any> = (props) => {
  function  Home(props: any) {
  const { banner, goods } = props
  const router = useRouter()
  // const { tick } = useSelector<State, State>(state => state);
  const [couter, setCouter] = useState(0)
  
  const hcounter = sessionStorage.getItem('home-counter')
  if (hcounter) {
    setCouter(+hcounter)
  }
  useEffect(() => {
    console.log('Home.tsx init')
  }, [])

  const setccc = () => {
    const n = couter + 1
    setCouter(n)
    sessionStorage.setItem('home-counter', `${n}`)
  }

  // console.log('tick =>? ', tick)
  return (
    <div>
      <Head>
        <title>home</title>
      </Head>
      <main>
        <Button onClick={setccc}>数字：{couter}</Button>
        <A />
        {/* <Carousel autoplay>
          {banner.map((item: any) => (
            <div
              className='h-[23.4375rem] overflow-hidden'
              key={item._id}
              onClick={() => router.push(`/detail/${item._id}`)}
            >
              <Image
                src={item.path}
                layout='responsive'
                width={375}
                height={375}
                priority
                alt='wow!'
              />
            </div>
          ))}
        </Carousel> */}
        <section className='grid grid-cols-2 gap-2.5 p-2.5'>
          {goods.map((item: any) => (
            <div
              className='bg-white overflow-hidden rounded box-border border border-solid border-[#9e9e9e66]'
              key={item._id}
              onClick={() => router.push(`/detail/${item._id}`)}
            >
              <Image
                src={item.icon_url}
                layout='responsive'
                width={170.5}
                height={170.5}
                priority
                alt='wow!'
              />
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
// export const getStaticProps = wrapper.getStaticProps(store => async () => {
//   store.dispatch({
//     type: 'TICK',
//     payload: 'was set in other page',
//   })
export async function getStaticProps() {
  const bannerResult = await fetchBannerList()
  const goodsResult = await fetchHomeGoodsList()

  const { data: banner_data, error_code: banner_ecode } = bannerResult
  const banner = banner_ecode === '00' ? banner_data.res : []

  const { data: goods_data, error_code: goods_ecode } = goodsResult
  const goods = goods_ecode === '00' ? goods_data.res : []

  return {
    props: {
      // banner,
      goods,
    },
    revalidate: 1800, // 秒
  }
}
// })

export default Home
