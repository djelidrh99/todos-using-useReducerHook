import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useToast } from "./todoContext/ToastContxt";
import { useTodos } from "./todoContext/TodoContext";




/* eslint-disable react/prop-types */

export default function Todo({ td,handleDeleteClick,handleEditeClick }) {
  const { handleClickToast} = useToast()

  // reducer
  const {dispatch}=useTodos()
  

  function handleDone() {  
    dispatch({type:"done",payload:td.id})
    handleClickToast("a Item is Done")
  }
  
 

 
  

  return (
    <>
      
      
      <Box
        className="bg-blue-600 mb-2 py-8 px-4 transition-all delay-200 hover:py-12"
        component="section"
        sx={{}}
      >
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography className="text-white" style={td.done ? {textDecorationLine:"line-through"}:{textDecorationLine:"none"}} variant="h5" component="div">
              {td.title}
            </Typography>
            <Typography className="text-white" variant="h6" component="div">
              {td.description}
            </Typography>
          </Grid>
          <Grid size={4}>
            <div className="flex items-center justify-around">
              <IconButton
                onClick={handleDone}
                style={
                  !td.done
                    ? {
                        color: "green",
                        backgroundColor: "white",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: "green",
                      }
                    : {
                        color: "white",
                        backgroundColor: "green",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: "green",
                      }
                }
              >
                <DoneIcon />
              </IconButton>
              <IconButton
                onClick={()=>{handleEditeClick(td)}}
                className="transition-all"
                style={{
                  color: "blue",
                  backgroundColor: "white",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "blue",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={()=>{handleDeleteClick(td)}}
                style={{
                  color: "red",
                  backgroundColor: "white",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: "red",
                }}
                aria-label="delete"
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
