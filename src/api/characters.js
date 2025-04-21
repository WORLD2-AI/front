import { axiosInstance } from "./baseaxios.js";
function register(userData) {
  return axiosInstance
    .post("/characters/api/register_role", userData)
}
function getRoles(){
  return axiosInstance
    .get("/characters/api/characters")
}
function delteteRoles(rolesId){
  return axiosInstance
    .delete("/characters/api/character/"+rolesId)
}
export default {
  register,
  getRoles,
  delteteRoles
};
