
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
/* eslint-disable react/prop-types */

export default function MysnackBar({open,msg}) {


  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpen(false);
  // };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}