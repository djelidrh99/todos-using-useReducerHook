import './App.css'
import TodoList from './TodoList'
import TodosProvider from './todoContext/TodoContext'
import { ToastProvider } from './todoContext/ToastContxt'
TodosProvider
function App() {

  
  

  return (
    <TodosProvider>
    <ToastProvider >
    <div className=' min-h-screen	pt-16 bg-gray-700'>
      
      
      

      <TodoList/>
     

      
    </div>
    </ToastProvider >
    </TodosProvider>
  )
}

export default App
