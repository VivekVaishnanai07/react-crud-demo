import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

function DeleteDialog(props) {
  const { open, title, closeDialog, confirmDialog } = props
  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button onClick={closeDialog}>No</Button>
        <Button onClick={confirmDialog} autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog;