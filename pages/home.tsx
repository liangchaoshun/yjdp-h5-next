import type { FC } from 'react'
import Head from 'next/head'
import { Button } from 'antd'

const Home: FC<any> = (props) => {
  return (
    <div>
      <Head>
        <title>home</title>
      </Head>
      <h3>主页页面</h3>
      <Button type='primary' className='bg-[#1890ff]'>
        Button
      </Button>
    </div>
  )
}

export default Home
