import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import {
  fetchAllCategories,
  fetchSeriesByCategoryId,
} from '../../http/category'
import type { CategoryData, SeriesData } from '../../@types/category'
import classNames from 'classnames'

// const Category: FC<any> = (props) => {
  function Category(props: any) {
  const { menuList, seriesList } = props
  const [currIndex, setCurrIndex] = useState(0)
  const [seriesData, setSeriesData] = useState(seriesList)

  const router = useRouter()
  useEffect(() => {
    console.log('category.tsx init')
  }, [])

  // 切换类别
  const tapMenuItem = async (index: number, id: string) => {
    setCurrIndex(index)
    const seriesResult = await fetchSeriesByCategoryId({
      category_id: id,
    })
    const { data, error_code } = seriesResult
    setSeriesData(error_code === '00' ? data.res : [])
  }

  return (
    <main className='h-full flex flex-row pt-1 bg-white'>
      <Head>
        <title>category</title>
      </Head>
      <div className='h-full w-28 bg-[#e3eaf1]'>
        {menuList.map((item: any, index: number) => (
          <div
            key={item._id}
            className={classNames(
              {
                'bg-white': index === currIndex,
              },
              'text-sm leading-8 text-slate-700 p-1.5 text-center truncate'
            )}
            onClick={() => tapMenuItem(index, item._id)}
          >
            {item.name_en}
          </div>
        ))}
      </div>
      <div className='flex-1 bg-white overflow-y-auto'>
        <div className='grid grid-rows-[repeat(auto-fill, 246px)] grid-cols-3 gap-2.5 p-2.5 box-border'>
          {seriesData.map((item: any) => (
            <div
              className='flex flex-col justify-center items-center overflow-hidden max-h-[37.5rem] rounded box-border'
              key={item._id}
              onClick={() => router.push(`/category/${item._id}`)}
            >
              <Image
                src={item.icon_url}
                width={70}
                height={70}
                priority
                alt='wow!'
              />
              <div className='p-2.5 text-xs text-[#423f3f] leading-4 text-center'>
                {item.name_en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function getStaticProps() {
  // 获取所有类别
  const categoryResult = await fetchAllCategories()
  const { data: category_data, error_code: category_code } = categoryResult
  const menuList: CategoryData[] =
    category_code === '00' ? category_data.res : [{ _id: null }]

  // 获取某个类别下的系列数据
  const seriesResult = await fetchSeriesByCategoryId({
    category_id: menuList[0]._id,
  })
  const { data: series_data, error_code: series_code } = seriesResult
  const seriesList: SeriesData[] = series_code === '00' ? series_data.res : []

  return {
    props: {
      menuList,
      seriesList,
    },
    revalidate: 1800, // 秒
  }
}

export default Category
