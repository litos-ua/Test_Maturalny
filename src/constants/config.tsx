// export const configObj ={
//     //axiosUrl: "https://localhost:7283/api/",
//     axiosUrl: "https://192.168.43.91:7283/api/",
//     //axiosUrl: "http://192.168.43.91:5000/api/",
//     adminUserId: 3,
//     devMode: true,
//     baseLanguage: 'ua',
//     pagination:{startPage:1, pageSize:10} // фиксируем стартовую страницу и размер страницы
// }

const axiosUrl =
  import.meta.env.VITE_API_USE_HTTPS === "true"
    ? import.meta.env.VITE_API_HTTPS_URL
    : import.meta.env.VITE_API_HTTP_URL;

export const configObj = {
  axiosUrl,
  adminUserId: 3,
  devMode: true,
  baseLanguage: "ua",
  pagination: {
    startPage: 1,
    pageSize: 10,
  },
};

