import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../action/authAction';
const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        image: "",
        role: "",
        email: '',
    },
    isAuthenticated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            const DT = action.payload.DT;
            return {
                ...state,
                account: {
                    access_token: DT?.access_token,
                    refresh_token: DT?.refresh_token,
                    username: DT?.username,
                    image: DT?.image,
                    role: DT?.role
                    , email: DT?.email
                },
                isAuthenticated: true
            };
        case USER_LOGOUT:
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
};
export default userReducer;