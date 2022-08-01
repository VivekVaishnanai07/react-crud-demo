import { Box, Button, Container, FormControl, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import { toast } from 'react-toastify';
import { apiHeader, API_URL, notificationConfig } from "../../util/constant";

// For tags static Option
const stag = [
  {
    key: "IT", value: "INFORMATION TECHNOLOGY"
  },
  {
    key: "CS", value: "COMPUTER SCIENCE AND ENGINEERING"
  },
  {
    key: "ME", value: "MECHANICAL ENGINEERING"
  },
  {
    key: "BT", value: "BIO-TECHNOLOGY (SS)"
  },
  {
    key: "AU", value: "AUTOMOBILE ENGINEERING"
  },
  {
    key: "BM(SS)", value: "BIO-MEDICAL ENGINEERING (SS)"
  },
  {
    key: "FT", value: "FASHION TECHNOLOGY"
  }
]

function PostOperation(props) {
  const [text, setText] = useState('')
  const [likes, setLikes] = useState('')
  const [tags, setTags] = useState([])
  const [owner, setOwner] = useState('')
  const [userId, setUserId] = useState('')
  const [userList, setUserList] = useState([])
  const theme = createTheme()
  const params = useParams();

  // For fetch user list 
  useEffect(() => {
    axios.get(`${API_URL}/user`, {
      headers: apiHeader
    })
      .then(response => {
        setUserList(response.data.data)
      })
      .catch(error => {
        toast.error("Ops your api is not working", notificationConfig)
        console.error(error)
      })
  }, [])
  // For get user by id
  useEffect(() => {
    let findTagAry = []
    if (params.postUserId && userList.length > 0) {
      setUserId(params.postUserId)
      axios.get(`${API_URL}/post/${params.postUserId}`, {
        headers: apiHeader
      })
        .then(response => {
          response.data.tags.forEach((data) => {
            let findObj = stag.find(element => element.key === data)
            findTagAry.push(findObj)
          })

          setText(response.data.text)
          setLikes(response.data.likes)
          setTags(findTagAry)
          setOwner(response.data.owner.id)
        })
        .catch(error => {
          toast.error("Ops your api is not working", notificationConfig)
          console.error(error)
        })
    }
  }, [params.postUserId, userList])
  //put and post(create) api 
  const handlerSubmit = (event) => {
    event.preventDefault();

    let selectedValue = []
    tags.forEach((item) => {
      selectedValue.push(item.key)
    })


    let data = {
      'text': text,
      'likes': likes,
      'tags': selectedValue,
      'owner': owner,
    }

    if (userId) {
      axios.put(`${API_URL}/post/${userId}`, data,
        {
          headers: apiHeader
        })
        .then(response =>
          toast.success("Your data has been successfully updated", notificationConfig),
          props.history.push("/postuserlist"))
        .catch(error => {
          console.error(error)
          toast.error(error.response.data.data.email, notificationConfig)
        })
    } else {
      axios.post(`${API_URL}/post/create`, data,
        {
          headers: apiHeader
        })
        .then(response => {
          toast.success("Your data has been successfully Added", notificationConfig)
          props.history.push("/postuserlist")
        })
        .catch(error => {
          toast.error(error.response.data.data.email, notificationConfig)
        })
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          className="add-data-box" sx={{ marginTop: 11, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">{userId ? "Update Post User" : "Add Post User"}</Typography>
          <form onSubmit={handlerSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={text}
              name="text"
              label="Text"
              type="text"
              onChange={e => setText(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={likes}
              name="likes"
              label="Likes"
              type="number"
              onChange={e => setLikes(e.target.value)}
            />
            <Stack className='user-post-tagbox' spacing={3}>
              <Autocomplete
                multiple
                required
                value={tags}
                id="tags-outlined"
                options={stag}
                getOptionLabel={(option) => option.key}
                renderOption={(props, option) => (
                  <Box component="li"{...props}>
                    {option.value}
                  </Box>
                )}
                onChange={(event, value) => (
                  setTags(value)
                )}
                renderInput={(value) => (
                  <TextField
                    {...value}
                    label="Tags"
                    placeholder="Tags"
                  />
                )}
              />
            </Stack>
            <FormControl className="user-post-inputbox" fullWidth>
              <InputLabel id="demo-simple-select-label">Owner Name</InputLabel>
              <Select
                disabled={userId ? true : false}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={owner}
                label="Owner"
                onChange={(e) => setOwner(e.target.value)}>
                {userList.map((name) => (
                  <MenuItem
                    key={name.id}
                    value={name.id}>
                    {name.firstName} {name.lastName}
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

export default withRouter(PostOperation)