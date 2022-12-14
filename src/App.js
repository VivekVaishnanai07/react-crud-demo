import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SingIn from "./components/auth/SingIn";
import Header from './components/header/Header';
import PostList from './components/post/PostList';
import PostOperation from './components/post/PostOperation';
import PrivateRoute from "./components/privaterouter/PrivateRoute";
import UserList from "./components/user/UserList";
import UserOperation from './components/user/UserOperation';
import DataAnalysis from './components/analysis/DataAnalysis';
import CommentList from './components/comment/CommentList';
import AddComment from './components/comment/AddComment';
import Footer from './components/footer/Footer';
import PostGrid from './components/post/PostGrid';
import PostDetails from './components/post/PostDetails';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route path='/' component={SingIn} exact />
        <React.Fragment>
          <Header />
          <PrivateRoute path='/user-list' component={UserList} exact />
          <PrivateRoute path='/add-user' component={UserOperation} exact />
          <PrivateRoute path='/edit-user/:userId' component={UserOperation} exact />
          <PrivateRoute path='/post-list' component={PostList} exact />
          <PrivateRoute path='/post-grid' component={PostGrid} exact />
          <PrivateRoute path='/post-details/:postId' component={PostDetails} exact />
          <PrivateRoute path='/add-post' component={PostOperation} exact />
          <PrivateRoute path='/edit-post/:postId' component={PostOperation} exact />
          <PrivateRoute path='/data-analysis' component={DataAnalysis} exact />
          <PrivateRoute path='/comment-list' component={CommentList} exact />
          <PrivateRoute path='/add-comment' component={AddComment} exact />
          <Footer />
        </React.Fragment>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
