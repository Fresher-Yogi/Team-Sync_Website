import { axiosInstance } from "../../../config/axiosInstance";

export let logOutApi = async()=>{
    try {
        let res = await axiosInstance.post('/auth/logout');
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

