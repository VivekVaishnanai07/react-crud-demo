import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import * as React from 'react';
import { withRouter } from "react-router";
import { toast } from 'react-toastify';
import { notificationConfig } from '../../util/constant';
import { login } from '../privaterouter/utils/FunctionCalls';

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      pin: "",
    }
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
    //Submit data
    const onSingIn = (e) => {
      e.preventDefault();
      if (this.state.username === "aaa" && this.state.password === "aaa" && this.state.pin === "aaa") {
        toast.success("Sign in successfully.", notificationConfig)
        localStorage.setItem("isLogin", 'true')
        this.props.history.push("/user-list");
      } else {
        toast.error("Invalid username or password", notificationConfig)
        login();
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
                value={this.state.username}
                name="username"
                label="User Name"
                type="text"
                onChange={(e) => handleChangeForTextField(e)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                value={this.state.password}
                name="password"
                label="Password"
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
                type="text"
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