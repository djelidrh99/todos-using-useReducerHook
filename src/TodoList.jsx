

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect, useMemo } from "react";


import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

import { useToast } from "./todoContext/ToastContxt";
import Todo from "./Todo";

/* dialag import */
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTodos } from "./todoContext/TodoContext";

function TodoList() {

  const { handleClickToast} = useToast()
  const [alignment, setAlignment] = useState("all");
  const [deletetodo,setDeletetodo]=useState(null)

  const [openEdit, setOpenEdit] = useState(false);
  const [inputTitleEdite, setInputTitleEdite] = useState("");
  const [inputDescreptioneEdite, setInputDescreptionEdite] = useState("");
  const [Editetodo,setEditetodo]=useState(null)

  function handleAlignment(event) {
    setAlignment(event.target.value);
  };
  const [todoInput, setTodoInput] = useState("");
  const [openDelete, setOpen] = useState(false);

  // reducer
  const {todoElement,dispatch}=useTodos()




  const completedTodos = useMemo(()=>{
    return todoElement.filter((t)=>{
        return t.done
    }) 
  },[todoElement]) 
  const notCompletedTodos = useMemo(()=>{
    return todoElement.filter((t)=>{
        return !t.done
      }) 
  },[todoElement]) 

  let todosCat = todoElement
  if (alignment ==="not-completed" ) {
    todosCat = notCompletedTodos
  } else if (alignment === "completed" ) {
    todosCat = completedTodos
  }

//   DIALOG DELETE FUNCTION
function handleDelete(todo) {
    setOpen(true);
    setDeletetodo(todo)
  }
  function handleCloseDelet() {
    setOpen(false);
  }

  function deleteTodo() {
    dispatch({type:"delete",payload :deletetodo })
    setOpen(false);
    handleClickToast("You delete a Item")
  }

//   DIALOG DELETE FUNCTION

// dialog edite function

function handleEdit(todo) {
    setOpenEdit(true);
    setEditetodo(todo)
    setInputTitleEdite(todo.title)
    setInputDescreptionEdite(todo.descreption)
  }
  function handleCloseEdit() {
    setOpenEdit(false);
  }

  function handleEditConfirm() {
    
    dispatch({type:"edite",payload:{
      id:Editetodo.id,
      title:inputTitleEdite,
      descreption:inputDescreptioneEdite
    }})
    setOpenEdit(false);
    handleClickToast("You Edite a Item")
  }


// dialog edite function

  useEffect(() => {
    if(localStorage.getItem("todo")){
        
        dispatch({payload:JSON.parse(localStorage.getItem("todo"))})
    }
    
  }, []);

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  function addTodo() {
    dispatch({type:"added",
      payload:{
        mytodos:todoInput
      }
    })
    setTodoInput("");
    handleClickToast("You add a Item")
    
  }



  const todoList = todosCat.map((t) => {
    return <Todo key={t.id} td={t} handleDeleteClick={handleDelete}  handleEditeClick={handleEdit} />;
  });

  return (
    <>
    <React.Fragment>
        <Dialog open={openDelete} onClose={handleCloseDelet}>
          <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete this todo item
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelet}>Disagree</Button>
            <Button onClick={deleteTodo} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {/* delete dialog */}

      <React.Fragment>
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle id="alert-dialog-title">{"Edit Item"}</DialogTitle>
          <DialogContent>
            <div className="mb-5">
              <DialogContentText id="alert-dialog-description">
                Are you sure to edit this todo item?
              </DialogContentText>
            </div>
            <Grid rowSpacing={2} container>
              <Grid size={12}>
                <TextField
                  value={inputTitleEdite}
                  onChange={(e) => {
                    setInputTitleEdite(e.target.value);
                  }}
                  className="w-full"
                  id="outlined-basic"
                  label="Edite the title"
                  variant="outlined"
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  value={inputDescreptioneEdite}
                  onChange={(e) => {
                    setInputDescreptionEdite(e.target.value);
                  }}
                  className="w-full"
                  id="outlined-basic"
                  label="Add a descreption"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Disagree</Button>
            <Button onClick={handleEditConfirm} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {/* dialog edite */}
  
    <Container
      style={{ paddingLeft: "0", paddingRight: "0" }}
      className="bg-white "
      maxWidth="sm"
    >
      <Card className="crd px-10 py-5  " sx={{}}>
        <CardContent>
          <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
            Todo List
            <Divider />
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="all" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="not-completed" aria-label="centered">
                Not Accolished
              </ToggleButton>
              <ToggleButton value="completed" aria-label="right aligned">
                Accomplished
              </ToggleButton>
            </ToggleButtonGroup>
          </Typography>
          <Typography variant="h5" component="div">
            {todoList}
          </Typography>
          <div className="mt-5">
            <Grid container spacing={2}>
              <Grid size={8}>
                <TextField
                  value={todoInput}
                  onChange={handleInput}
                  className="w-full"
                  id="outlined-basic"
                  label="Add a Todo"
                  variant="outlined"
                />
              </Grid>
              <Grid size={4}>
                <Button
                  onClick={addTodo}
                  className="h-full w-full"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </Container>
    </>
  );
}

export default TodoList;
