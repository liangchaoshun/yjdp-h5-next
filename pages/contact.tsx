import Head from 'next/head'
import type { FC } from 'react'

const Contact: FC<any> = () => {
  return (
    <div className='h-full p-2.5'>
      <Head>
        <title>contact</title>
      </Head>
      <div className='text-lg mb-2.5 font-medium'>
        Please contact us in the following ways:
      </div>
      <div className='text-base mb-1'>
        <span className='text-gray-700 mr-2.5'>phone:</span>
        <span className='text-sky-500'>+86-17754528993</span>
      </div>
      <div className='text-base mb-1'>
        <span className='text-gray-700 mr-2.5'>wechat:</span>
        <span className='text-sky-500'>+86-17754528993</span>
      </div>
      <div className='text-base mb-1'>
        <span className='text-gray-700 mr-2.5'>whatsapp:</span>
        <span className='text-sky-500'>+86-17754528993</span>
      </div>
      <div className='text-base mb-1'>
        <span className='text-gray-700 mr-2.5'>Facebook:</span>
        <span className='text-sky-500'>Jessica Yan Liang</span>
      </div>
    </div>
  )
}

export default Contact
