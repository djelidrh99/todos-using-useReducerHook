import { createContext ,useReducer,useContext } from "react"

import reducer from "../reducer/reducer"
/* eslint-disable react/prop-types */

let TodoContext = createContext([])
const TodosProvider = ({children})=>{
const [todoElement,dispatch]=useReducer(reducer,[])
    return(
        <TodoContext.Provider  value={{todoElement:todoElement,dispatch:dispatch}}>
           {children}
        </TodoContext.Provider>
    )
}


export default TodosProvider

export const useTodos= ()=>{
return useContext(TodoContext)
}