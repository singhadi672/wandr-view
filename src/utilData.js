import axios from "axios";

export async function axiosCall(method, url, data) {
  if (method === "GET" || "get") {
    return await axios({ method: method, url: url });
  }
  return await axios({ method: method, url: url, data: data });
}

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

export function setupAuthExceptionHandler(setLogin, navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        localStorage?.clear();
        setLogin(false);
        navigate("../login");
      }
      return Promise.reject(error);
    }
  );
}
