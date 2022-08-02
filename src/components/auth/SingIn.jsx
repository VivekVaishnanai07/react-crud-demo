import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import axios from 'axios';
import * as React from 'react';
import { withRouter } from "react-router";
import { toast } from 'react-toastify';
import { apiHeader, API_URL, notificationConfig } from '../../util/constant';
import { login } from '../privaterouter/utils/FunctionCalls';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      pin: "",
      userList: []
    }
  }
  // Get user list
  componentDidMount() {
    axios.get(`${API_URL}/user`, {
      headers: apiHeader
    }).then(response => {
      this.setState({ userList: response.data.data })
    }).catch(error => {
      toast.error("Ops your api is not working", notificationConfig)
      console.error(error)
    })
  }
  render() {
    const theme = createTheme()
    //call OnChange event
    const handleChangeForTextField = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
        ...this.state,
        [name]: value
      })
    }
    //pin continent
    let currentDate = new Date();
    let totalMinutes = currentDate.getHours() * 60

    //Submit data
    const onSingIn = (e) => {
      e.preventDefault();
      if (this.state.pin == totalMinutes) {
        let findData = this.state.userList.find(element => element.firstName === this.state.firstName && element.lastName === this.state.lastName)
        if (findData) {
          toast.success("Sign in successfully.", notificationConfig)
          localStorage.setItem("isLogin", 'true')
          this.props.history.push("/user-list");
          login();
        }else{
          toast.error("Invalid firstName or lastName", notificationConfig)
        }
      } else {
        toast.error("Invalid pin", notificationConfig)
      }
    }
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box sx={{ marginTop: 11, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5"> Sign in </Typography>
            <form onSubmit={(e) => onSingIn(e)}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={this.state.firstName}
                name="firstName"
                label="FirstName"
                type="text"
                onChange={(e) => handleChangeForTextField(e)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={this.state.lastName}
                name="lastName"
                label="LastName"
                type="text"
                onChange={(e) => handleChangeForTextField(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={this.state.pin}
                name="pin"
                label="pin."
                type="number"
                onChange={(e) => handleChangeForTextField(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              > Sign In </Button>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    )
  }
}

export default withRouter(SignIn);