import { defineStore } from 'pinia'
export default defineStore('user', {
  state: () => ({
    focusId:"初始化的仓库",
    initialFocusId:''
  }),
  getters: {
   
  },
  actions: {
    changeInitialFocusId (id) {
      this.initialFocusId=id
    },
    restoreFocusId () {
      this.focusId = this.initialFocusId
    },
    changeFocusId(id){
      this.focusId = id
    }
  }
})