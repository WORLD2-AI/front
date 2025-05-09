import { axiosInstance } from "./baseaxios.js";
function allChars() {
  return axiosInstance.get("/rolesreder/api/all-characters");
}
function visibleChars(id) {
  return axiosInstance.get(
    `/rolesreder/api/visible-characters/${id}?radius=20`
  );
}
function dialogues(data) {
  data.character_id = data.character_id.toString();
  return axiosInstance.post(`/roles/ai-deepseek-movement`, { ...data });
}
export default {
  allChars,
  visibleChars,
  dialogues,
};
