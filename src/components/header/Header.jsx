import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { logout } from '../privaterouter/utils/FunctionCalls';

class Header extends Component {
  constructor() {
    super();
    this.state = { menuitem: false }
  }
  render() {

    //menu Icon open
    const handleOpenNavMenu = () => {
      this.setState({
        menuitem: true
      })
    }

    //menu Icon close
    const handleCloseNavMenu = () => {
      this.setState({
        menuitem: false
      })
    }

    //logout event
    const handlerLogout = () => {
      logout();
      this.props.history.push("/")
    }

    return (
      <AppBar position="fixed">
        <Container maxWidth="x2">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" onClick={handleOpenNavMenu}
                color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                open={this.state.menuitem}
                className="custom-menuitem"
                onClose={handleCloseNavMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClose={handleCloseNavMenu}><Link to="/user-list">User</Link></MenuItem>
                <MenuItem onClose={handleCloseNavMenu}><Link to="/post-list">Post</Link></MenuItem>
                <MenuItem onClose={handleCloseNavMenu}><Link to="/comment-list">Comment</Link></MenuItem>
                <MenuItem onClose={handleCloseNavMenu}><Link to="/data-analysis">Analysis-Chart</Link></MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className="web-nav-button" to="/user-list">User</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className="web-nav-button" to="/post-list">Post</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className="web-nav-button" to="/comment-list">Comment</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className="web-nav-button" to="/data-analysis">Analysis-Chart</Link>
              </Button>
            </Box>
            <LogoutIcon onClick={handlerLogout} />
          </Toolbar>
        </Container>
      </AppBar>
    )
  }
}

export default withRouter(Header);