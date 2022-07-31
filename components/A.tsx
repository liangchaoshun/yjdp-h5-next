import { useEffect, useState } from 'react'
import { Button } from 'antd'

export default function A() {
  const [couter, setCouter] = useState(0)
  useEffect(() => {
    console.log('A.tsx init')
  }, [])
  return <div>
    <h3>A 组件</h3>
    <Button onClick={() => setCouter(couter + 1)}>A-Component: {couter}</Button>
  </div>
}