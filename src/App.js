import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SingIn from "./components/auth/SingIn";
import Header from './components/header/Header';
import PostUserList from './components/post/UserPost';
import AddandUpdatePostUser from './components/post/UserPostOperation';
import PrivateRoute from "./components/privaterouter/PrivateRoute";
import User from "./components/user/User";
import UserOperation from './components/user/UserOperation';
import ChartAnalysis from './components/analysis/ChartAnalysis';
import CommentUserList from './components/comment/CommentUserList';
import CommentAddUser from './components/comment/CommentAddUser';
import Footer from './components/footer/Footer';
import GridView from './components/post/GridView';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route path='/' component={SingIn} exact />
        <React.Fragment>
          <Header />
          <PrivateRoute path='/user' component={User} exact />
          <PrivateRoute path='/adduser' component={UserOperation} exact />
          <PrivateRoute path='/update/:userId' component={UserOperation} exact />
          <PrivateRoute path='/postuserlist' component={PostUserList} exact />
          <PrivateRoute path='/postuserlist/GridView' component={GridView} exact />
          <PrivateRoute path='/AddandUpdatePostUser' component={AddandUpdatePostUser} exact />
          <PrivateRoute path='/AddandUpdatePostUser/:postUserId' component={AddandUpdatePostUser} exact />
          <PrivateRoute path='/ChartAnalysis' component={ChartAnalysis} exact />
          <PrivateRoute path='/commentUserlist' component={CommentUserList} exact />
          <PrivateRoute path='/commentAddUser' component={CommentAddUser} exact />
          <Footer />
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
