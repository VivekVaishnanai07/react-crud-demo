import { Component } from "react";
import { Redirect, Route } from "react-router";

class PublicRoute extends Component {
    render() {
        const { component: Component, restricted, ...rest } = this.props
        const isLogin = localStorage.getItem('isLogin')
        const Login = () => {
            if (isLogin === "true") {
                return true;
            }

            return false;
        }
        return (
            <>
                <Route {...rest} render={props => (
                    Login && restricted ? <Component {...props} />
                        : <Redirect to={'/'} />
                )} />
            </>
        )
    }
}

export default PublicRoute;