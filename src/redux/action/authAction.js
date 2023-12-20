

 export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
 export const USER_LOGOUT = "USER_LOGOUT";

export const userLoginSucces = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data
    }

}
export const userLogout = () => {
    return {
        type: USER_LOGOUT
    }
}