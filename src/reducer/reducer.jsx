import { v4 as uuidv4 } from "uuid";




export default function reducer(currentElemnt,action) {
    switch(action.type){
        default :{
            return action.payload
        }
        case "added" :{
            if(action.payload.mytodos) {
                const newTodo = {
                    id: uuidv4(),
                    title: action.payload.mytodos,
                    descreption: "",
                    done: false,
                  };
                  const updateTodoList = [...currentElemnt, newTodo]
                  localStorage.setItem("todo", JSON.stringify(updateTodoList));
                  return updateTodoList
                
            }
        }
     break;
        case "delete" : {
        const todoListAfterDelete = currentElemnt.filter((t) => {
            return t.id !== action.payload.id;
          });
          localStorage.setItem("todo", JSON.stringify(todoListAfterDelete));
          return todoListAfterDelete
                        }
            case "edite" : {
                const EditeTodoElement = currentElemnt.map((t) => {
                    return t.id === action.payload.id
                        ? { ...t, title: action.payload.title, description: action.payload.descreption }
                        : t;
                    });
            localStorage.setItem("todo", JSON.stringify(EditeTodoElement));
            return EditeTodoElement
                            }
         
        case "done" : {
            const doneTodoElement = currentElemnt.map((t) => {
            return  (t.id === action.payload) ? {...t , done :!t.done} : t 
              });
        localStorage.setItem("todo", JSON.stringify(doneTodoElement));
        return doneTodoElement
                        }                    

    }
    }
    
    
   
    
    
