import { FC, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import classNames from 'classnames'
import { fetchGoddsDetail } from '../../http/detail'
import invalidSvg from '../../public/invalid-goods-illu.svg'

import styles from './detail.module.scss'

const Detail: FC<any> = (props) => {
  const { detailData } = props
  // console.log('detailData => ', detailData)
  const [tip, setTip] = useState('loading...')

  return (
    <div className='relative flex flex-col h-full overflow-y-auto'>
      <Head>
        <title>detail</title>
      </Head>
      {detailData !== null ? (
        <div className='bg-[#edf0f2]'>
          <div className='bg-white mb-4'>
            <div className='h-[23.4375rem] bg-sky-100'>
              {/* <Swiper className={styles.swiper} duration={500} indicator-dots indicator-color="rgba(221, 221, 221, .6)"
              indicator-active-color="#ff6347">
                {
                  detailData?.banner_url.map((url: string) => <SwiperItem key={url}>
                <div className={styles['banner-item']}>
                  <Image src={ url } />
                </div>
              </SwiperItem>) ?? []
                }

            </Swiper> */}
            </div>
            <div className='p-2.5'>
              <div>
                <span className='text-xl text-[#ef0e3b] font-semibold'>
                  ￥{detailData.price}
                </span>
                <span className='text-xs text-[#6c6c6c] ml-1'>(RMB)</span>
              </div>
              <div className='text-[15px] mt-2.5 text-[#333]'>
                {detailData.desc_en}
              </div>
            </div>
          </div>
          <div className='p-2.5 box-border'>
            {detailData?.desc_url?.length ? (
              <div>
                {detailData.desc_url.map((url: string) => (
                  <div key={url}>
                    <Image
                      className='block'
                      src={url}
                      layout='responsive'
                      width='375'
                      height='375'
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-base text-[#999] text-center'>no data</div>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center'>
          <div>
            <Image
              className='block'
              src={invalidSvg}
              width='320'
              height='240'
            />
            <div className='text-base text-center text-[#ff5722]'>{tip}</div>
          </div>
        </div>
      )}
      {/* <AtMessage /> */}
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const {
    params: { id },
  } = context
  const detailResult = await fetchGoddsDetail({ id })
  const { data, error_code } = detailResult
  const detailData = error_code === '00' ? data.res : null
  return {
    props: { detailData },
  }
}

export default Detail
