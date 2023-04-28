import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        ContentType: "application/json",
        timeout: 10000,
    },
});

export const axiosApiRequest = async ({ method, url, data }) => {
    try {
     const res = await instance({
            url: url,
            method: method,
            withCredentials: true,
            data: data
        })
        return res.data;
    } catch (err) {
        console.error(err);
        return err?.response?.data
    }
}