import type { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Carousel } from 'antd'
import { useRouter } from 'next/router'
import { fetchGoddsDetail } from '../../http/detail'
import invalidSvg from '../../public/invalid-goods-illu.svg'

const Detail: FC<any> = (props) => {
  const { detailData } = props
  const router = useRouter()

  return (
    <div className='relative flex flex-col h-full overflow-y-auto'>
      <Head>
        <title>detail</title>
      </Head>
      {detailData !== null ? (
        <div className='bg-[#edf0f2]'>
          <header className='bg-white mb-4'>
            <Carousel>
              {detailData.banner_url.map((url: string) => (
                <div className='h-[23.4375rem] overflow-hidden' key={url}>
                  <Image
                    src={url}
                    layout='responsive'
                    width={375}
                    height={375}
                    priority
                    alt='wow!'
                  />
                  {/* <img src={url} className='block w-full h-auto' alt='wow!' /> */}
                </div>
              ))}
            </Carousel>
            <div className='p-2.5'>
              <div>
                <span className='text-xl text-[#ef0e3b] font-semibold'>
                  ￥{detailData.price}
                </span>
                <span className='text-xs text-[#6c6c6c] ml-1'>(RMB)</span>
              </div>
              <div className='text-sm mt-2.5 text-[#333] overflow-hidden'>
                {detailData.desc_en}
              </div>
            </div>
          </header>
          <section className='p-2.5 box-border bg-white'>
            {detailData?.desc_url?.length ? (
              <div>
                {detailData.desc_url.map((url: string) => (
                  <div key={url} className='w-full h-auto relative'>
                    {/* <Image
                      className='block'
                      src={url}
                      layout='responsive'
                      width={100}
                      height={100}
                      priority
                      alt='wow!'
                    /> */}
                    <img src={url} className='block w-full h-auto' alt='wow!' />
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-base text-[#999] text-center'>no data</div>
            )}
          </section>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center'>
          <div>
            <Image
              src={invalidSvg}
              width={350}
              height={250}
              priority
              alt='wow!'
            />
            <div className='text-base text-center text-[#ff5722]'>
              Sorry, this goods has expired
            </div>
          </div>
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
