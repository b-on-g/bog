import { useState, useEffect, useCallback } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  // Manually sync document title
  useEffect(() => {
    document.title = `Count: ${count}`
    return () => {
      document.title = 'App'
    }
  }, [count])   // ← forget this dependency = bug

  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  )
}
