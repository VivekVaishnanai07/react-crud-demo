import {
  Button,
  CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Container } from "@mui/system";
import axios from "axios";
import ForumIcon from '@mui/icons-material/Forum';
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import { apiHeader, API_URL, notificationConfig } from "../../util/constant";
import moment from "moment";
import DeleteDialog from "../../util/DeleteDialog";

class User extends Component {
  constructor() {
    super();
    this.state = {
      snackbarSeverity: "",
      snackbarMessage: "",
      open: false,
      openComment: false,
      userList: [],
      commentList: [],
      userId: ""
    }
  }

  //Get data api
  componentDidMount() {
    this.getUserList()
  }
  handleClose = () => {
    this.setState({
      ...this.state,
      open: false,
      openComment: false
    });
  };
  //Get user list 
  getUserList = () => {
    axios.get(`${API_URL}/user`, {
      headers: apiHeader
    }).then(response => {
      this.setState({ userList: response.data.data })
    }).catch(error => {
      toast.error("Ops your api is not working", notificationConfig)
      console.error(error)
    })
  }
  //Get post list
  getPostList = (postId) => {
    axios.get(`${API_URL}/user/${postId}/post`, {
      headers: apiHeader
    }).then(response => {
      this.setState({
        ...this.state,
        openComment: true,
        commentList: response.data.data
      })
    }).catch(error => {
      toast.error("Ops your api is not working", notificationConfig)
      console.error(error)
    })
  }
  //Delete User data 
  deleteUser() {
    axios.delete(`${API_URL}/user/${this.state.userId}`, {
      headers: apiHeader
    }).then(response => {
      toast.success("Your data has been successfully deleted", notificationConfig)
      this.getUserList()
      this.handleClose()
    }).catch(error => {
      toast.error("Your data has been not delete", notificationConfig)
      console.error(error)
    })
  }
  render() {
    const handleClickOpen = (Id) => {
      this.setState({
        ...this.state,
        open: true,
        userId: Id
      });
    };
    const { userList } = this.state
    return (
      <>
        <Container className="table-content">
          <Button className="add-btns" variant="contained"><Link className="web-nav-button" to="/add-user">Add User</Link></Button>
          <TableContainer className="table-container" component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Picture</TableCell>
                  <TableCell>FirstName</TableCell>
                  <TableCell>LastName</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              {
                userList.length > 0 &&
                <TableBody>
                  {userList.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">{(index + 1)}</TableCell>
                      <TableCell><img className="img-content" src="https://picsum.photos/id/237/200/300" alt="img" /></TableCell>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>
                      <TableCell><ForumIcon className="comment-btn" onClick={() => this.getPostList(item.id)} /></TableCell>
                      <TableCell><Link className="delete-btn" to={"/user-list"} refresh="true"><DeleteForeverIcon onClick={() => handleClickOpen(item.id)} /></Link></TableCell>
                      <TableCell><Link className="update-btn" to={`/edit-user/${item.id}`}><EditIcon /></Link></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              }
            </Table>
            {userList.length === 0 && <Box className="progressbar">
              <CircularProgress />
            </Box>}
          </TableContainer>
        </Container>
        <DeleteDialog open={this.state.open} closeDialog={() => this.handleClose()} confirmDialog={() => this.deleteUser()}
          title="Are you sure you want to delete this user?" />
        <Dialog open={this.state.openComment} keepMounted onClose={() => this.handleClose()}>
          <DialogTitle>Post Comments</DialogTitle>
          {
            this.state.commentList.length > 0 ?
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Text</TableCell>
                        <TableCell>Likes</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Publish Date</TableCell>
                        <TableCell>Update Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.commentList.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.text}</TableCell>
                          <TableCell>{item.likes}</TableCell>
                          <TableCell>{item.tags}</TableCell>
                          <TableCell>{item.owner.firstName} {item.owner.lastName}</TableCell>
                          <TableCell>{moment(item.publishDate).format('DD  MMMM, YYYY')}</TableCell>
                          <TableCell>{moment(item.updateDate).format('DD  MMMM, YYYY')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContentText>
              </DialogContent> : <h3 className="comment-msg">No Posts</h3>
          }
          <DialogActions>
            <Button onClick={() => this.handleClose()}>Close</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}

export default withRouter(User);