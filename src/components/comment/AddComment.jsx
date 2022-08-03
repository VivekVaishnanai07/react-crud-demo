import { Box, Button, Container, FormControl, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { notificationConfig } from "../../util/constant";
import api from "../interceptor/api";

function AddComment(props) {
  const theme = createTheme()
  const [message, setMessage] = useState("")
  const [owner, setOwner] = useState("")
  const [userList, setUserList] = useState([])
  const [postList, setPostList] = useState([])
  const [postId, setPostId] = useState("")

  // get Owner in User Api
  useEffect(() => {
    api.get('/user')
      .then(response => {
        setUserList(response.data.data)
      })
      .catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })
  }, [])
  //get post id
  useEffect(() => {
    api.get('/post')
      .then(response => {
        setPostList(response.data.data)
      })
      .catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })
  }, [])
  const handlerSubmit = (event) => {
    event.preventDefault();

    let data = {
      'message': message,
      'owner': owner,
      'post': postId
    }
    api.post('/comment/create', data)
      .then(response => {
        toast.success("Your data has been successfully Added", notificationConfig)
        props.history.push("/comment-list")
      })
      .catch(error => {
        toast.error(error.response.data.data.email, notificationConfig)
      })
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box className="add-data-box" sx={{ marginTop: 11, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">Add Comment</Typography>
          <form onSubmit={handlerSubmit}>
            <TextField
              id="outlined-multiline-static"
              autoFocus
              multiline
              rows={4}
              fullWidth
              value={message}
              name="message"
              label="Message"
              type="text"
              onChange={e => setMessage(e.target.value)}
            />
            <FormControl className="user-post-inputbox" fullWidth>
              <InputLabel id="demo-simple-select-label">Owner</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={owner}
                label="Owner"
                onChange={(e) => setOwner(e.target.value)}
              >
                {userList.map((name) => (
                  <MenuItem
                    key={name.id}
                    value={name.id}>
                    {name.firstName} {name.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="user-post-inputbox" fullWidth>
              <InputLabel id="demo-simple-select-label">Post</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={postId}
                label="Post"
                onChange={(e) => setPostId(e.target.value)}
              >
                {postList.map((post) => (
                  <MenuItem
                    key={post.id}
                    value={post.id}>
                    {post.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            > Submit </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default AddComment;