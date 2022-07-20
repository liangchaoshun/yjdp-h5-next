import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { fetchGoodsBySeriesId } from '../../http/category'
import type { GoodsInfoType } from '../../@types/shared'

import styles from './goodslist.module.scss'

const SeriesGoodsList: FC<any> = (props) => {
  const { goods } = props
  const router = useRouter()

  return (
    <div className='relative h-full overflow-y-auto p-2.5 box-border bg-[#edf0f2]'>
      <Head>
        <title>goods list</title>
      </Head>
      {goods.map((item: GoodsInfoType) => (
        <div
          className='flex flex-row h-[135px] mb-2.5 last:mb-0 rounded bg-white'
          key={item._id}
          onClick={() => router.push(`/detail/${item._id}`)}
        >
          <div className='mr-2.5'>
            <Image
              className='inline-block'
              src={item.icon_url}
              width='135'
              height='135'
            />
          </div>
          <div className='flex-1 flex flex-col h-full'>
            <div
              className={classNames(
                styles.desc,
                'h-[3.8125rem] text-sm text-[#423f3f] overflow-hidden text-ellipsis'
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
