export const isLogin = () => {
    if (localStorage.getItem("isLogin")) {
        return true;
    }

    return false;
}

export const logout = () => {
    localStorage.removeItem("isLogin");
}

export const login = () => {
    localStorage.setItem("isLogin", "true");
}