import { axiosInstance } from "./baseaxios.js";
function allChars() {
  return axiosInstance
    .get("/roles/api/all-characters")
}
function visibleChars(name){
  return axiosInstance
    .get(`/roles/api/visible-characters-in-radius/${name}`)
}
export default {
  allChars,
  visibleChars,
};
