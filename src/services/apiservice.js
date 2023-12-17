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
        `api/v1/participant/all`
    );
}
const getlistUsersPaginate = (page, limit) => {
    return axios.get(
        `api/v1/participant?page=${page}&limit=${limit}`
    );
}
const putUpdateUser = (id, username, role, image) => {
    //submit data
    const form = new FormData();
    form.append("id", id);
    form.append("username", username);
    form.append("role", role);
    form.append("userImage", image);
    //
    return axios.put(
        "api/v1/participant",
        form
    );
}
const deleteUser = (id) => {

    return axios.delete(
        `api/v1/participant`, {
        data: {
            id: id
        }
    }
    )
}
const postLogin = (email, password) => {
    //submit data
    const data = {
        email: email,
        password: password
    }
    //
    return axios.post(
        "api/v1/login",
        data
    );
}
export { postCreateUser, getlistUsers, putUpdateUser, deleteUser, getlistUsersPaginate, postLogin } 