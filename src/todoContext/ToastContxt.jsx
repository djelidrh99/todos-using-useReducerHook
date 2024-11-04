import { createContext,useContext,useState } from "react";
import MysnackBar from "../MySnakBar";
/* eslint-disable react/prop-types */

 const ToastContxt = createContext({})

export  const ToastProvider = ({children})=> {
    const [message,setMessage] =useState("")
    const [open, setOpen] = useState(false);

  const handleClickToast= (yourMsg) => {
    setOpen(true);
    setMessage(yourMsg)
    setTimeout(()=>{
      setOpen(false);
    },2000)
  };
    return(
        <ToastContxt.Provider  value={{handleClickToast}}>
            <MysnackBar open={open} msg ={message}/>
            {children}
        </ToastContxt.Provider>
    )
}

export const useToast = ()=>{
    return useContext( ToastContxt)
}