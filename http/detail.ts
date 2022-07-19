import type { LocalResponseType } from '../@types/shared'

const DETAIL_URL = `${process.env.NEXT_PUBLIC_HTTP_PREFIX}/api/goods/detail`

// 获取商品详情
export const fetchGoddsDetail = async (options: { id: string }) => {
  const result = await fetch(`${DETAIL_URL}/${options.id}`)
  return (await result.json()) as Promise<LocalResponseType>
}
