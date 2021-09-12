import { createStore } from "vuex";
 
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

//create store
const store = createStore({
    state(){
        return{
            isLoading:false,
            loginApiStatus: "",
            logOut:false,
            registerProfile:{
                name:'',
                email:'',
                password:'',
                roleId:''
            }
        }
    },
    getters,
    mutations,
    actions
});
export default store;
