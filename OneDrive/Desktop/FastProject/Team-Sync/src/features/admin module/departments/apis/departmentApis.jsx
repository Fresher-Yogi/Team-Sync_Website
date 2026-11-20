import { axiosInstance } from "../../../../config/axiosInstance"

export let getAllDepartmentsApi = async()=>{
    try {
        let res = await axiosInstance.get('/departments')
        // console.log(res.data.data);
        return res.data.data;
    } catch (error) {
        console.log(error)
    }
} 