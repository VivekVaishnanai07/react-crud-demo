import AppsIcon from '@mui/icons-material/Apps';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ForumIcon from '@mui/icons-material/Forum';
import ListIcon from '@mui/icons-material/List';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, CircularProgress, Container, Grid, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import CommentDialog from "../../util/CommentDialog";
import { notificationConfig } from "../../util/constant";
import DeleteDialog from "../../util/DeleteDialog";
import api from "../interceptor/api";

function PostList() {
  const [posts, setPost] = useState([])
  const [selectedPostId, setSelectedPostId] = useState("")
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [commentList, setCommentList] = useState([])
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  //get postList Call Api
  useEffect(() => {
    getPostList()
  }, [])
  //Get post list
  const getPostList = () => {
    api.get('/post')
      .then(response => {
        setPost(response.data.data)
      }).catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })
  }
  //Delete user data
  const deleteUser = () => {
    api.delete(`/post/${selectedPostId}`)
      .then(response => {
        toast.success("Your data has been successfully deleted", notificationConfig)
        handleClose()
        getPostList()
      }).catch(error => {
        toast.error("Your data has been not delete", notificationConfig)
        console.error(error)
      })
  }
  const handleClickOpen = (Id) => {
    setOpen(true);
    setSelectedPostId(Id)
  };
  const handleCommentOpen = (postId) => {
    api.get(`/post/${postId}/comment`)
      .then(response => {
        setOpenComment(true)
        setCommentList(response.data.data)
      }).catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })

  };
  const handleClose = () => {
    setOpen(false);
    setOpenComment(false)
  };
  return (
    <>
      <Container className="table-content">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button className="add-btns" variant="contained"><Link className="web-nav-button" to="/add-post">Add Post</Link></Button>
          </Grid>
          <Grid item xs={8} className="grid-header">
            <Grid item xs={4}><AppsIcon className='app-icon' /></Grid>
            <Grid item xs={4}><Link to="/post-grid" className='post-list-btn'><Switch {...label} className="post-switch" /></Link></Grid>
            <Grid item xs={4}><ListIcon className='list-icon' /></Grid>
          </Grid>
        </Grid>
        <TableContainer className="table-container" component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Picture</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Owner Name</TableCell>
                <TableCell>PublishDate</TableCell>
                <TableCell>UpdateDate</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {
              posts.length > 0 &&
              <TableBody>
                {posts.map((post, index) => (
                  <TableRow key={post.id}>
                    <TableCell component="th" scope="row">{(index + 1)}</TableCell>
                    <TableCell><img className="img-content" src="https://picsum.photos/id/237/200/300" alt="img" /></TableCell>
                    <TableCell>{post.text}</TableCell>
                    <TableCell>{post.likes}</TableCell>
                    <TableCell>{post.tags}</TableCell>
                    <TableCell><b>{post.owner.firstName} {post.owner.lastName}</b></TableCell>
                    <TableCell>{moment(post.publishDate).format('DD  MMMM, YYYY')}</TableCell>
                    <TableCell>{moment(post.updatedDate).format('DD  MMMM, YYYY')}</TableCell>
                    <TableCell><Link className="update-btn" to={`/post-details/${post.id}`}><VisibilityIcon className="view-btn" /></Link></TableCell>
                    <TableCell><ForumIcon className="comment-btn" onClick={() => handleCommentOpen(post.id)} /></TableCell>
                    <TableCell><DeleteForeverIcon className="delete-btn" onClick={() => handleClickOpen(post.id)} /></TableCell>
                    <TableCell><Link className="update-btn" to={`/edit-post/${post.id}`}><EditIcon /></Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            }
          </Table>
          {posts.length === 0 && <Box className="progressbar">
            <CircularProgress />
          </Box>}
        </TableContainer>
      </Container>
      <DeleteDialog open={open} confirmDialog={deleteUser} closeDialog={handleClose} title="Are you sure you want to delete this post?" />
      <CommentDialog openComment={openComment} closeDialog={handleClose} commentList={commentList} />
    </>
  )
}

export default withRouter(PostList)