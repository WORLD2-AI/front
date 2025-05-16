import { axiosInstance } from "../utils/baseaxios";
function allChars() {
  return axiosInstance.get("/rolesreder/api/characters");
}
function visibleChars(id) {
  return axiosInstance.get(
    `/rolesreder/api/visible-characters/${id}`
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
