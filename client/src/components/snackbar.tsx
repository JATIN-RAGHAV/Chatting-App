import Snackbar from '@mui/material/Snackbar';

export default function SimpleSnackbar(props:{message:string, open:boolean,setOpen:Function}) {

  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={6000}
        onClose={() => props.setOpen(false)}
        message={props.message}
      />
    </div>
  );
}