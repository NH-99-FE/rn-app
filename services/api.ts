/*
 * @Author: lianglonghui_i lianglonghui_i
 * @Date: 2025-11-21 18:15:09
 * @LastEditors: lianglonghui_i lianglonghui_i
 * @LastEditTime: 2025-11-21 20:34:45
 * @FilePath: /rn-app/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
}

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  })

  if (!response.ok) {
    // @ts-ignore
    throw new Error('获取电影信息失败', response.statusText)
  }

  const data = await response.json()

  return data.results
}
