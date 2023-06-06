import { useState } from 'react'

import './App.css'
import Pag from './Pag'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Pag></Pag>
  )
}

export default App
