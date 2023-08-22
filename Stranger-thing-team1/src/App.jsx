import { useState } from 'react'
import './App.css'
import SearchForm from './SearchForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SearchForm/>  
    </>
  )
}

export default App
