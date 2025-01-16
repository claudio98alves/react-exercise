import { useState, useEffect } from "react";

const useSessionStorage = (sessionStorageKey: string, defaultValue = null) => {
  // Create state variable to store 
  // sessionStorage value in state
  const [sessionStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = sessionStorage.getItem(sessionStorageKey)
      if (value) {
        return JSON.parse(value)
      } else {
        return defaultValue
      }
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    const rawValue = JSON.stringify(sessionStorageValue);
    sessionStorage.setItem(sessionStorageKey, rawValue);
  }, [sessionStorageKey, sessionStorageValue]);

  return [sessionStorageValue, setLocalStorageValue]
}

export default useSessionStorage;