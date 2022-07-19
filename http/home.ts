import type { HomeFetchGoodListParams } from '../@types/home'
import type { LocalResponseType } from '../@types/shared'

const HOME_BANNER = `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/goods/home/banner`
const HOME_GOODS = `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/goods/home/products`

// 轮播图
export const fetchBannerList = async () => {
  const result = await fetch(HOME_BANNER)
  return (await result.json()) as Promise<LocalResponseType>
}

// 商品列表
export const fetchHomeGoodsList = async (
  options: HomeFetchGoodListParams = { page_index: 1 }
) => {
  const result = await fetch(HOME_GOODS, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  })
  return (await result.json()) as Promise<LocalResponseType>
}
