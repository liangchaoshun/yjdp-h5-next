import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { fetchGoodsBySeriesId } from '../../http/category'
import type { GoodsInfoType } from '../../@types/shared'

import styles from './a.module.scss'

const SeriesGoodsList: FC<any> = (props) => {
  const { goods } = props
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>goods list</title>
      </Head>
      <div>
        {goods.map((item: GoodsInfoType) => (
          <div
            className={styles.goods}
            key={item._id}
            onClick={() => router.push(`/detail/${item._id}`)}
          >
            <div className={styles.img}>
              <Image src={item.icon_url} width='135' height='135' />
            </div>
            <div className={styles['desc-info']}>
              <div className={styles.desc}>{item.desc_en}</div>
              <div className={styles['price-info']}>
                <span className={styles.currency}>￥</span>
                <span className={styles['price-txt']}>{item.price}</span>
              </div>
            </div>
          </div>
        ))}
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
