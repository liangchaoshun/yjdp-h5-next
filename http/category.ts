import type { LocalResponseType } from '../@types/shared'
import type {
  CategoryFetchGoodsBySeriesIdParams,
  CategoryFetchSeriesParams,
} from '../@types/category'

const CATEGORY_URL = `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/category`
const SERIES_URL = `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/category/s`
const SERIES_LIST_URL = `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/goods/series`

// 获取所有类别
export const fetchAllCategories = async () => {
  const result = await fetch(CATEGORY_URL)
  return (await result.json()) as Promise<LocalResponseType>
}

// 获取系列
export const fetchSeriesByCategoryId = async (
  options: CategoryFetchSeriesParams
) => {
  const result = await fetch(`${SERIES_URL}/${options.category_id}`)
  return (await result.json()) as Promise<LocalResponseType>
}

// 获取系列下的商品列表
export const fetchGoodsBySeriesId = async (
  options: CategoryFetchGoodsBySeriesIdParams
) => {
  const result = await fetch(`${SERIES_LIST_URL}/${options.series_id}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })
  return (await result.json()) as Promise<LocalResponseType>
}
