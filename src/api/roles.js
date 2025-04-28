import { axiosInstance } from "./baseaxios.js";
function allChars() {
  return axiosInstance
    .get("/roles/api/all-chars")
}
function visibleChars(){
  return axiosInstance
    .get("/roles/api/visible-chars")
}
export default {
  allChars,
  visibleChars,
};
