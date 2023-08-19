import axios from "axios"

const apiService = () => {
    return axios.create({
        baseURL: "https://socioztron.co.in",
        headers: {
            "Accept": 'applicaton/json',
            "x-access-token":localStorage.getItem("socioztron-user-token")
        }
    })
}

export default apiService