import  axiosBase from 'axios'


const axios = axiosBase.create({
    baseURL: import.meta.env.VITE_PUBLIC_URL,
})

export default axios