import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import classNames from 'classnames'
import { fetchGoddsDetail } from '../../http/detail'

const Detail: FC<any> = (props) => {
  const { goodsInfo } = props

  return (
    <div>
      <Head>
        <title>detail</title>
      </Head>
      <main>
        <div>
          <h3>detail</h3>
          <div>{goodsInfo.name_zh}</div>
          <div>{goodsInfo._id}</div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const {
    params: { id },
  } = context
  const detailResult = await fetchGoddsDetail({ id })
  const { data, error_code } = detailResult
  const goodsInfo = error_code === '00' ? data.res : []
  return {
    props: { goodsInfo },
  }
}

export default Detail
