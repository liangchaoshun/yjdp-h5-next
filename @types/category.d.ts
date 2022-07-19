export interface CategoryFetchSeriesParams extends Record<string, any> {
  category_id: string
}

export interface CategoryFetchGoodsBySeriesIdParams
  extends Record<string, any> {
  series_id: string
  page_index?: number
  page_size?: number
}

export interface SeriesData {
  category_id: string
  desc: string
  icon_url: string
  name_en: string
  name_zh: string
  no: number
  create_time: string
  update_time: string
  _id: string
  __v?: 0
}

export interface CategoryData {
  name_en: string
  name_zh: string
  no: number
  desc: string
  create_time: string
  update_time: string
  series_data: SeriesData[]
  _id: string
  __v?: number
}
