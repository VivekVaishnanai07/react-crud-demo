import { Component } from "react";
import { Redirect, Route } from "react-router";
import { isLogin } from "../privaterouter/utils/FunctionCalls";

class PrivateRoute extends Component {

  render() {

    const { component: Component, ...rest } = this.props

    return (
      <>
        <Route {...rest} render={props => (isLogin() ? <Component {...props} /> : <Redirect to={'/'} />)} />
      </>
    )
  }
}

export default PrivateRoute;