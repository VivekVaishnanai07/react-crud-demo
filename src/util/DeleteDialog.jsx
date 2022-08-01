import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

function DeleteDialog(props) {
    const { open, closeDialog, deleteUserList } = props
    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Do you want to delete this data?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={closeDialog}>No</Button>
                <Button onClick={deleteUserList} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteDialog;