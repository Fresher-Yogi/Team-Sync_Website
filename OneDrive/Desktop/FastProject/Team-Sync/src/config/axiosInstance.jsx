
import axios from "axios";

const BASE_URL = "/api";

export let axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let OriginalReq = error.config;

    if (
      error.response?.status === 401 &&
      !OriginalReq._retry &&
      !OriginalReq.url.includes("/auth/get-accessToken")
    ) {
      OriginalReq._retry = true;

      try {
        await axios.get(`${BASE_URL}/auth/get-accessToken`, {
          withCredentials: true,
        });

        return axiosInstance(OriginalReq);
      } catch (refreshError) {
        if (window.location.pathname !== "/") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);










// import axios from "axios";

// const BASE_URL = "https://team-sync-backend-n78w.onrender.com/api";

// export let axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     let OriginalReq = error.config;

//     // THIS IS BY AI -->  Check karein ki error 401 hai, retry pehle nahi hua, aur yeh khud refresh token ki request NA ho
//     if (
//       error.response?.status === 401 &&
//       !OriginalReq._retry &&
//       !OriginalReq.url.includes("/auth/get-accessToken")
//     ) {
//       OriginalReq._retry = true; // YEH LINE SABSE ZAROORI HAI

//       try {
//         // axiosInstance ki jagah normal axios use karein taaki loop na bane
//         await axios.get(`${BASE_URL}/auth/get-accessToken`, {
//           withCredentials: true,
//         });

//         return axiosInstance(OriginalReq);
//       } catch (refreshError) {
//         if (window.location.pathname !== "/") {
//           window.location.href = "/";
//         }
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

