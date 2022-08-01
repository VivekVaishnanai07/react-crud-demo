import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Component } from "react";
import { toast } from 'react-toastify';
import { apiHeader, API_URL, notificationConfig } from "../../util/constant";

class UserOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      userId: "",
      isEmailDisable: false
    }
  }
  //get api call(data display on update time)
  componentDidMount() {
    this.setState({
      ...this.state,
      userId: this.props.match.params.userId,
      isEmailDisable: this.props.match.params.userId ? true : false,
    }, () => {
      this.state.userId &&
        axios.get(`${API_URL}/user/${this.state.userId}`, {
          headers: apiHeader
        })
          .then(response => {
            this.setState({
              ...this.state,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email
            })
          })
          .catch(error => {
            toast.error("Ops your api is not working", notificationConfig)
            console.error(error)
          })
    })
  }
  render() {
    const theme = createTheme()
    const { firstName, lastName, email, userId, isEmailDisable } = this.state
    let data = {
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'email': this.state.email,
    }
    //put and post(create) api
    const SubmitHandler = (event) => {
      event.preventDefault();

      userId ?
        axios.put(`${API_URL}/user/${userId}`, data,
          {
            headers: apiHeader
          })
          .then(response => console.error(response),
            toast.success("Your data has been successfully updated", notificationConfig),
            this.props.history.push("/user"))
          .catch(error => {
            toast.error(error.response.data.data.email)
          }) :
        // Add User Api Call

        axios.post(`${API_URL}/user/create`, data,
          {
            headers: apiHeader
          })
          .then(response => {
            toast.success("Your data has been successfully Added", notificationConfig)
            this.props.history.push("/user")
          })
          .catch(error => {
            toast.error(error.response.data.data.email, notificationConfig)
          })
    }
    //onChange api call
    const handleChangeForTextField = (event) => {
      let name = event.target.name
      let value = event.target.value
      this.setState({
        ...this.state,
        [name]: value
      })
    }
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box className="add-data-box" sx={{ marginTop: 11, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5">{userId ? "Update User" : "Add User"} </Typography>
            <form onSubmit={SubmitHandler}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={firstName}
                name="firstName"
                label="FirstName"
                type="text"
                onChange={handleChangeForTextField}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={lastName}
                name="lastName"
                label="LastName"
                type="text"
                onChange={handleChangeForTextField}
              />
              <TextField
                margin="normal"
                disabled={isEmailDisable}
                fullWidth
                value={email}
                name="email"
                label="Email"
                type="text"
                onChange={handleChangeForTextField}
              />
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
}

export default UserOperation;