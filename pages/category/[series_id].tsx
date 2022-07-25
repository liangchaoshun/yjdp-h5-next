import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { fetchGoodsBySeriesId } from '../../http/category'
import type { GoodsInfoType } from '../../@types/shared'
import noDataSvg from '../../public/cart-no-data.svg'

import styles from './goodslist.module.scss'

const SeriesGoodsList: FC<any> = (props) => {
  const { goods } = props
  const router = useRouter()

  return (
    <div className='relative h-full overflow-y-auto p-2.5 box-border bg-[#edf0f2]'>
      <Head>
        <title>goods list</title>
      </Head>
      {goods.length ? (
        <div>
          {goods.map((item: GoodsInfoType) => (
            <div
              className='flex flex-row h-[8.4375rem] mb-2.5 last:mb-0 rounded bg-white'
              key={item._id}
              onClick={() => router.push(`/detail/${item._id}`)}
            >
              <div className='mr-2.5'>
                <Image
                  src={item.icon_url}
                  width={135}
                  height={135}
                  priority
                  alt='wow!'
                />
              </div>
              <div className='flex-1 flex flex-col h-full'>
                <div
                  className={classNames(
                    styles.desc,
                    'h-[4rem] text-sm text-[#423f3f] overflow-hidden text-ellipsis'
                  )}
                >
                  {item.desc_en}
                </div>
                <div className='leading-6'>
                  <span className='text-xs text-[#fa2c19]'>￥</span>
                  <span className='text-base text-[#fa2c19]'>{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center'>
          <Image src={noDataSvg} width={350} height={250} priority alt='wow!' />
        </div>
      )}
      <div
        className='absolute w-6 h-6 left-2.5 top-2.5 z-10 text-center rounded-full bg-[#353535e6]'
        onClick={() => router.back()}
      >
        <span className='iconfont icon-arrowleft text-sm text-white leading-6	font-medium ' />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const {
    params: { series_id },
  } = context
  const goodsResult = await fetchGoodsBySeriesId({ series_id })
  const { data, error_code } = goodsResult
  const goods = error_code === '00' ? data.res : []
  return {
    props: { goods },
  }
}

export default SeriesGoodsList
