import { Avatar, Chip, Divider, Grid, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import { toast } from "react-toastify";
import { notificationConfig } from "../../util/constant";
import api from "../interceptor/api";


export default function PostDetails() {
  const [text, setText] = useState('')
  const [likes, setLikes] = useState('')
  const [tags, setTags] = useState([])
  const [owner, setOwner] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [updateDate, setUpdateDate] = useState('')
  const [commentList, setCommentList] = useState([])
  const params = useParams();

  //Get post list
  useEffect(() => {
    api.get(`/post/${params.postId}`)
      .then(response => {
        setText(response.data.text)
        setLikes(response.data.likes)
        setTags(response.data.tags)
        setOwner(response.data.owner)
        setPublishDate(response.data.publishDate)
        setUpdateDate(response.data.updateDate)
      })
      .catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })
  }, [params.postId])
  // To get comment & post list
  useEffect(() => {
    api.get(`/post/${params.postId}/comment`)
      .then(response => {
        setCommentList(response.data.data)
      }).catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })
  }, [params.postId])

  return (
    <div>
      <Card sx={{ display: 'flex' }} className="post-details-cards">
        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image="https://picsum.photos/id/237/200/300"
          alt="Live from space album cover"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <br />
                <b>Owner:-</b> {owner.firstName} {owner.lastName}
              </Grid>
              <Grid item xs={12}>
                <b>Likes:-</b> {likes}
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1} > <b>Tags:-</b>
                  {tags.map((data) => (<Chip label={data} component="a" color="primary" variant="outlined" key={data} />))}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <b>Text:-</b> {text}
              </Grid>
              <Grid item xs={12}>
                <b>Publish Date:-</b> {moment(publishDate).format('DD  MMMM, YYYY')}
              </Grid>
              <Grid item xs={12}>
                <b>Update Date:-</b> {moment(updateDate).format('DD  MMMM, YYYY')}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
      <h1>Comments</h1>
      <Paper style={{ padding: "40px 20px" }}>
        {
          commentList.length > 0 ?
            <div>
              {
                commentList.map((itemData) => (
                  <div key={itemData.id}>
                    <Grid container wrap="nowrap" spacing={2} >
                      <Grid item>
                        <Avatar alt="Rem-Sharp" src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                      </Grid>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{itemData.owner.firstName} {itemData.owner.lastName}</h4>
                        <p style={{ textAlign: "left" }}>
                          {itemData.message}
                        </p>
                      </Grid>
                    </Grid>
                    <p style={{ textAlign: "left", color: "gray" }}>
                      Posted {moment(itemData.publishDate).format('DD  MMMM, YYYY')}
                    </p>
                    < Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                  </div>
                ))
              }
            </div> : "No Comments"
        }
      </Paper>
    </div>
  );
}