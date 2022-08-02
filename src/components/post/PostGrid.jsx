import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TagSharpIcon from '@mui/icons-material/TagSharp';
import { Button, CircularProgress, Grid, Switch } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import axios from 'axios';
import AppsIcon from '@mui/icons-material/Apps';
import moment from 'moment';
import * as React from 'react';
import ListIcon from '@mui/icons-material/List';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentDialog from '../../util/CommentDialog';
import { apiHeader, API_URL, notificationConfig } from '../../util/constant';
import DeleteDialog from '../../util/DeleteDialog';



export default function PostGrid() {
  const [open, setOpen] = useState(false);
  const [postList, setPostList] = React.useState([])
  const [selectedPostId, setSelectedPostId] = useState("")
  const [openComment, setOpenComment] = useState(false);
  const [commentList, setCommentList] = useState([])
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  //get Userlist Call Api
  useEffect(() => {
    getPostList()
  }, [])
  //Get post list
  const getPostList = () => {
    axios.get(`${API_URL}/post`, {
      headers: apiHeader
    }).then(response => {
      setPostList(response.data.data)
    }).catch(error => {
      toast.error("Ops your api is not working", notificationConfig)
      console.error(error)
    })
  }
  //Delete user data
  const deleteUser = () => {
    axios.delete(`${API_URL}/post/${selectedPostId}`, {
      headers: apiHeader
    }).then(response => {
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
    axios.get(`${API_URL}/post/${postId}/comment`, {
      headers: apiHeader
    }).then(response => {
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
      <Grid container spacing={2} className="post-grid-header2">
        <Grid item xs={4}>
          <Button className="add-btns" id="grid-add-post-btn" variant="contained"><Link className="web-nav-button" to="/add-post">Add Post</Link></Button>
        </Grid>
        <Grid item xs={8} className="grid-header">
          <Grid item xs={4}><AppsIcon className='app-icon' id="app-icon-layout"/></Grid>
          <Grid item xs={4}><Link to="/post-list" className='post-list-btn'><Switch {...label} defaultChecked className="post-switch" /></Link></Grid>
          <Grid item xs={4}><ListIcon className='list-icon' /></Grid>
        </Grid>
      </Grid>
      <Grid className='gridpost'>
        {postList.map((item) => (
          <Card key={item.id}>
            <CardHeader avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {item.owner.firstName.charAt(0).toUpperCase()}{item.owner.lastName.charAt(0).toUpperCase()}
              </Avatar>}
              action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
              title={`${item.owner.firstName} ${item.owner.lastName}`}
              subheader={moment(item.publishDate).format('DD  MMMM, YYYY')} />
            <CardMedia
              component="img"
              height="194"
              image="https://picsum.photos/id/237/200/300"
              alt="img"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    <b className='likeText'>{item.likes} likes</b>
                  </IconButton>
                  <IconButton aria-label="add to favorites">
                    <TagSharpIcon />
                    <b className='likeText'>{item.tags}</b>
                  </IconButton>
                  <IconButton aria-label="add to favorites">
                    <AlternateEmailRoundedIcon />
                    <b className='likeText'>{item.text}</b>
                  </IconButton>
                </CardActions>
              </Typography>
            </CardContent>
            <CardActions disableSpacing className='postIcons'>
              <ForumIcon onClick={() => handleCommentOpen(item.id)} />
              <Link className="grid-edit-post" to={`/edit-post/${item.id}`}><EditIcon /></Link>
              <DeleteForeverIcon onClick={() => handleClickOpen(item.id)} />
            </CardActions>
          </Card>
        ))}
        {postList.length === 0 && <Box className="progressbar">
          <CircularProgress />
        </Box>}
      </Grid>
      <DeleteDialog open={open} confirmDialog={deleteUser} closeDialog={handleClose} title="Are you sure you want to delete this post?" />
      <CommentDialog openComment={openComment} closeDialog={handleClose} commentList={commentList} />
    </>
  );
}
