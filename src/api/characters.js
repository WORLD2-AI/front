import { axiosInstance } from "./baseaxios.js";
function register(userData) {
  return axiosInstance
    .post("/characters/api/register", userData)
}
function getRoles(){
  return axiosInstance
    .get("/characters/api/characters")
}
export default {
  register,
  getRoles,
};
