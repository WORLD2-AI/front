import { axiosInstance } from "./baseaxios.js";
function register(userData) {
  return axiosInstance
    .post("/characters/api/register_role", userData)
}
function getAllRoles(){
  return axiosInstance
    .get("/characters/api/characters")
  }
function getUserRoles(){
  return axiosInstance
    .get("/characters/api/user/characters")
  }
  function delteteRoles(rolesId){
    return axiosInstance
    .delete("/characters/api/character/"+rolesId)
  }
  function getTimeLine({characterId,...params}){
    console.log(characterId);
    return axiosInstance
      .get(`/characters/api/character/${characterId}/schedule`,{params})
  }
  function locationQuery(site){
    return axiosInstance
      .get("/characters/api/check_location",{params:{x:site[0],y:site[1]}})
  }
  export default {
  register,
  getUserRoles,
  getAllRoles,
  delteteRoles,
  getTimeLine,
  locationQuery
};
