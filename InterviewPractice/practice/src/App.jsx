import { useState } from 'react'
import './App.css'

function App() {

  const [newTodo, setNewTodo] = useState('')
  const [todos, settodos] = useState([])

  const handleAdd = (e) => {
    
    settodos([...todos,newTodo])
    console.log(todos)

    e.preventDefault()
  }
  return (
    <div>
      <form onSubmit={(e) => {((handleAdd(e)))}}>
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
        <button type='submit'>Add</button>
      </form>
      {
        todos ? todos.map((todo,index) => {
        return (
          <div key={index}>
            {todo}
            
          </div>
        )
       }) : <></>
      }

    </div>
  )
}

export default App
