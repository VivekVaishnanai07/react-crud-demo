import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import moment from "moment";

function DeleteDialog(props) {
  const { openComment, closeDialog, commentList } = props
  return (
    <Dialog open={openComment} keepMounted onClose={closeDialog}>
      <DialogTitle>Post Comments</DialogTitle>
      {
        commentList.length > 0 ?
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Owner</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Publish Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commentList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.owner.firstName} {item.owner.lastName}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>{moment(item.publishDate).format('DD  MMMM, YYYY')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </DialogContentText>
          </DialogContent> : <h3 className="comment-msg">No Comments</h3>
      }
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog;