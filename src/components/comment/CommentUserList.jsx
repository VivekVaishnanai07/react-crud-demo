import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button, CircularProgress, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { apiHeader, API_URL, notificationConfig } from "../../util/constant";
import DeleteDialog from "../../util/DeleteDialog";

function CommentUserList() {

  const [userId, setUserId] = useState("")
  const [open, setOpen] = useState(false);
  const [postList, setPostList] = useState("");
  const [commentList, setCommentList] = useState([])

  // To get comment & post list
  useEffect(() => {
    getCommentList()
    getPostList()
  }, [])

  const getCommentList = () => {
    axios.get(`${API_URL}/comment`, {
      headers: apiHeader
    }).then(response => {
      setCommentList(response.data.data)
    }).catch(error => {
      toast.error("Ops your api is not working", notificationConfig)
      console.error(error)
    })
  }

  const getPostList = () => {
    axios.get(`${API_URL}/post`, {
      headers: apiHeader
    })
      .then(response => {
        setPostList(response.data.data)
      })
      .catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })
  }

  // Delete model handlers
  const deleteUser = () => {
    axios.delete(`${API_URL}/comment/${userId}`, {
      headers: apiHeader
    }).then(response => {
      toast.success("Your data has been successfully deleted", notificationConfig)
      handleClose()
      getCommentList()
    }).catch(error => {
      toast.error("Your data has been not delete", notificationConfig)
      console.error(error)
    })
  }

  const handleOpen = (Id) => {
    setOpen(true);
    setUserId(Id)
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  // To get post name from post list
  const getPostName = (postId) => {
    let post = postList.find(element => element.id === postId)
    if (post) {
      return post.text
    }
  }

  return (
    <>
      <Container className="table-content">
        <Button className="add-btns" variant="contained"><Link className="web-nav-button" to="/commentAddUser">Add Comment</Link></Button>
        <TableContainer className="table-container" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>owner</TableCell>
                <TableCell>Post</TableCell>
                <TableCell>PublishDate</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {commentList.length > 0 &&
              <TableBody>
                {commentList.map((post, index) => (
                  <TableRow key={post.id}>
                    <TableCell component="th" scope="row">{(index + 1)}</TableCell>
                    <TableCell>{post.message}</TableCell>
                    <TableCell>{post.owner.firstName} {post.owner.lastName}</TableCell>
                    <TableCell>{getPostName(post.post)}</TableCell>
                    <TableCell>{moment(post.publishDate).format('DD  MMMM, YYYY')}</TableCell>
                    <TableCell><DeleteForeverIcon className="delete-btn" onClick={() => handleOpen(post.id)} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            }
          </Table>
          {commentList.length === 0 && <Box className="progressbar"><CircularProgress /></Box>}
        </TableContainer>
      </Container>
      <DeleteDialog open={open} deleteUserList={deleteUser} closeDialog={handleClose} />
    </>
  )
}

export default CommentUserList;