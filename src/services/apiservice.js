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
        password: password,
    }
    //
    return axios.post(
        "api/v1/login",
        data
    );
}
const postRegister = (email, password, username) => {
    const data = {
        email: email,
        password: password,
        username: username
    }
    return axios.post(
        "api/v1/register",
        data
    )
}
const getQuizByUser = () => {
    return axios.get(
        `api/v1/quiz-by-participant`
    );
}
const getQquizByQuizId = (id) => {
    return axios.get(
        `api/v1/questions-by-quiz?quizId=${id}`
    );
}
const postSubmitQuiz = (data) => {
    return axios.post(
        `api/v1/quiz-submit`,
        {
            ...data
        }
    );
}
const postCreateQuiz = (name, description, difficulty, quizImage) => {
    //submit data
    const form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("difficulty", difficulty);
    form.append("quizImage", quizImage);
    //
    return axios.post(
        "api/v1/quiz",
        form
    );
};
const getAllQuiz = () => {
    return axios.get(
        `api/v1/quiz/all`
    );
}
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}
const deleteQuizById = (id) => {
    return axios.delete(
        `api/v1/quiz/${id}`, {
        data: {
            id: id
        }
    }
    )
}
const putUpdateQuiz = (id, name, description, difficulty, quizImage) => {
    //submit data
    const form = new FormData();
    form.append("id", id);
    form.append("name", name);
    form.append("description", description);
    form.append("difficulty", difficulty);
    form.append("quizImage", quizImage);
    //
    return axios.put(
        "api/v1/quiz",
        form
    );
}
const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const form = new FormData();
    form.append("quiz_id", quiz_id);
    form.append("description", description);
    form.append("questionImage", questionImage);
    return axios.post("api/v1/question",
        form
    )
}
const postCreateNewAnswerForQuestion = (question_id, description, correct_answer) => {
    return axios.post("api/v1/answer",
        { description, correct_answer, question_id }
    )
}
const assignQuizToUser = (quizId, userId) => {
    return axios.post(`api/v1/quiz-assign-to-user`
        , { quizId, userId })
}
const postUpSertQA = (data) => {
    return axios.post(`api/v1/quiz-upsert-qa`
        , data)
}
const postUserLogOut = (email,refresh_token) => {
    return axios.post(`api/v1/logout`,
        {email,refresh_token})
}
export {
    assignQuizToUser, postUpSertQA,postUserLogOut,
    putUpdateQuiz, getQuizWithQA, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion,
    deleteQuizById, getAllQuiz, postCreateQuiz, postSubmitQuiz, getQquizByQuizId, getQuizByUser,
    postRegister, postCreateUser, getlistUsers, putUpdateUser, deleteUser,
    getlistUsersPaginate, postLogin
} 