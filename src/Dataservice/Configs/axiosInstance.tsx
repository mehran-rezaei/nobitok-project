// import dependencies
import axios from "axios";
import Cookies from "js-cookie";

// create a new instance of axios
const axiosInstance = axios.create({
  baseURL: "https://appointmentapi.etokco.ir/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "*",
  },
});

// add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  // add the token to the request headers
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Accept-Language"] = Cookies.get("lng") || "fa";
  // console.log(Cookies.get("lng"));

  return config;
});

// add a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if the response headers contain the x-pagination header
    const paginationHeaderValue = response.headers["x-pagination"];

    if (!!paginationHeaderValue && paginationHeaderValue !== "null") {
      // Parse the pagination information as JSON
      const paginationInfo = JSON.parse(paginationHeaderValue);

      // Access the pagination properties
      const currentPage = paginationInfo.CurrentPage;
      const totalPages = paginationInfo.TotalPages;
      const pageSize = paginationInfo.PageSize;
      const totalCount = paginationInfo.TotalCount;
      const hasPrevious = paginationInfo.HasPrevious;
      const hasNext = paginationInfo.HasNext;
      Cookies.set("currentPage", currentPage);

      Cookies.set("totalPages", totalPages);
      Cookies.set("pageSize", pageSize);
      Cookies.set("totalCount", totalCount);
      Cookies.set("hasPrevious", hasPrevious);
      Cookies.set("hasNext", hasNext);
    } else {
      // const currentPage = "0";
      // const totalPages = "0";
      // const pageSize = "10";
      // const totalCount = "0";
      // const hasPrevious = "false";
      // const hasNext = "false";
      // Cookies.set("currentPage", currentPage);
      // Cookies.set("totalPages", totalPages);
      // Cookies.set("pageSize", pageSize);
      // Cookies.set("totalCount", totalCount);
      // Cookies.set("hasPrevious", hasPrevious);
      // Cookies.set("hasNext", hasNext);
    }
    return response;
  },
  (error) => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "/login";
    } else if (error.response && error.response.status === 401) {
      const refreshToken = Cookies.get("refreshToken");
      console.log(refreshToken);
      axios
        .post(
          `https://appointmentapi.etokco.ir/Account/RefreshTokenForUser?RefreshToken=${refreshToken}`
        )
        .then((Response) => {
          Cookies.set("token", Response.data.token);
          Cookies.set("refreshToken", Response.data.refreshToken);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            Cookies.remove("username");
            window.location.href = "/login";
          }
        });
    }
  }
);

// export the axios instance
export default axiosInstance;
