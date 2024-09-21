import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Circle from './component/circle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Circle />
    </>
  )
}

export default App
