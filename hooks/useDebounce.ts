import { useEffect, useState } from 'react'
interface Props {
  value: string
  delay: number
}
const useDebounce = ({ value, delay }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState('')
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timeoutId)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
