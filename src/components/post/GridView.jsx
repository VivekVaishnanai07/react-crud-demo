import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TagSharpIcon from '@mui/icons-material/TagSharp';
import { CircularProgress, Grid } from '@mui/material';
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
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentDialog from '../../util/CommentDialog';
import { apiHeader, API_URL, notificationConfig } from '../../util/constant';
import DeleteDialog from '../../util/DeleteDialog';



export default function GridView() {
  const [open, setOpen] = useState(false);
  const [postList, setPostList] = React.useState([])
  const [selectedPostId, setSelectedPostId] = useState("")
  const [openComment, setOpenComment] = useState(false);
  const [commentList, setCommentList] = useState([])

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
      <Grid>
        <Grid className='gridpost'>
          {postList.map((item) => (
            <Card key={item.id}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>}
                action={<IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
                }
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
                <Link className="updateGridbtn" to={`/AddandUpdatePostUser/${item.id}`}><EditIcon /></Link>
                <DeleteForeverIcon onClick={() => handleClickOpen(item.id)} />
              </CardActions>
            </Card>
          ))}
          {postList.length === 0 && <Box className="progressbar">
            <CircularProgress />
          </Box>}
        </Grid>
      </Grid>
      <DeleteDialog open={open} deleteUserList={deleteUser} closeDialog={handleClose} />
      <CommentDialog openComment={openComment} closeDialog={handleClose} commentList={commentList} />
    </>
  );
}
