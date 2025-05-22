import { defineStore } from 'pinia'
export default defineStore('user', {
  state: () => ({
    focusId:"初始化的仓库",
    initialFocusInfo:{
      id:'',
      name:'',
      user_id:''
    },
    initialFocuUserId:'',
    initialFocusId:'',
  }),
  getters: {
   
  },
  actions: {
    changeInitialFocusInfo (info) {
      this.initialFocusInfo=info
    },
    restoreFocusId () {
      this.focusId = this.initialFocusInfo.id
    },
    changeFocusId(id){
      this.focusId = id
    }
  }
})