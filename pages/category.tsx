import Head from 'next/head'
import Image from 'next/image'
import { FC, useState } from 'react'
import { fetchAllCategories, fetchSeriesByCategoryId } from '../http/category'
import type { LocalResponseType } from '../@types/shared'
import type { CategoryData, SeriesData } from '../@types/category'
import classNames from 'classnames'
import styles from './category.module.scss'

const Category: FC<any> = (props) => {
  const { menuList, seriesList } = props
  const [currIndex, setCurrIndex] = useState(0)

  const tapMenuItem = (index: number, id: string) => {
    console.log('tapMenuItem => ', index, id)
  }
  const go2SeriessList = (id: string) => {
    console.log('go2SeriessList => ', id)
  }

  return (
    <main className='h-full flex flex-row'>
      <Head>
        <title>category</title>
      </Head>
      <div className='h-full w-28 bg-[#e3eaf1]'>
        {menuList.map((item: any, index: number) => (
          <div
            key={item._id}
            className={classNames(styles['menu-item'], {
              [styles['menu-item-active']]: index === currIndex,
            })}
            onClick={() => tapMenuItem(index, item._id)}
          >
            {item.name_en}
          </div>
        ))}
      </div>
      <div className='flex-1'>
        {seriesList.map((item: any) => (
          <div
            className={styles.series}
            key={item._id}
            onClick={() => go2SeriessList(item._id)}
          >
            <div className={styles['series-img']}>
              <Image src={item.icon_url} width={20} height={20} />
            </div>
            <div className={styles['series-name']}>{item.name_en}</div>
          </div>
        ))}
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
