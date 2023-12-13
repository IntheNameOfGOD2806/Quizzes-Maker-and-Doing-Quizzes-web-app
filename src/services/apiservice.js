import axios from "../utils/axiosCustomize";
const postCreateUser = (email, password, username, role, image) => {
    //submit data
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
    form.append("username", username);
    form.append("role", role);
    form.append("userImage", image);
    //
    return axios.post(
        "api/v1/participant",
        form
    );
}
const getlistUsers = () => {
    return axios.get(
        "api/v1/participant/all"
    );
}


export { postCreateUser,getlistUsers } 