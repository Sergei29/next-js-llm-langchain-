import { useState, useEffect } from 'react'

import { isServer } from '@/utils/common'

const getValueFromLocalStorage = <P>(key: string, initialValue: P): P => {
  if (isServer()) {
    return initialValue
  }
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.log(error)
    return initialValue
  }
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T | null, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T | null>(null)

  const setValue = (value: T) => {
    if (isServer()) return

    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const value = getValueFromLocalStorage(key, initialValue)
    setStoredValue(value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [storedValue, setValue]
}
