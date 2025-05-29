import { axiosInstance } from "../utils/baseaxios";
function mapMarker(site) {
  return axiosInstance.post(`/characters/api/save_location`, site);
}
function renderSite() {
  return axiosInstance.get(`/characters/api/sector_arena_pairs`);
}

// Export API for registered users
export default {
  mapMarker,
  renderSite
};
