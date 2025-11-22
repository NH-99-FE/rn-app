/*
 * @Author: lianglonghui_i lianglonghui_i
 * @Date: 2025-11-21 19:14:18
 * @LastEditors: lianglonghui_i lianglonghui_i
 * @LastEditTime: 2025-11-21 20:47:12
 * @FilePath: /rn-app/services/useFetch.ts
 * @Description: 自定义请求处理hook
 */
import { useEffect, useState } from 'react'
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetchFunction()
      setData(result)
    } catch (error) {
      setError(error instanceof Error ? error : new Error('出错了'))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setLoading(false)
    setError(null)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
    return () => reset()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    reset,
  }
}

export default useFetch
