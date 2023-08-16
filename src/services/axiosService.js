import axios from "axios"

const apiService =  () => {
    return axios.create({
        baseURL: "http://16.171.172.213:80",
        headers: {
            "Accept": 'applicaton/json',
            "x-access-token":localStorage.getItem("socioztron-user-token")
        }
    })
}

export default apiService