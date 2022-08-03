import axios from "axios";



const api = axios.create({
    baseURL: 'https://dummyapi.io/data/v1',
    headers: {
        "content-type": "application/json; charset=UTF-8",
        "app-id": "627392069acddf4d5d7796f9"
    }
})

api.interceptors.request.use(
    request => {
        return request;
    }
)



export default api;