const INITIAL_STATE = {
    id:null,
    username : "",
    email :"",
    role :"",
    status:"",
    cart:[]
}

export const userReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            console.log('data',action.payload)
            return {
                ...state,
                ...action.payload,
            }
        default :
            return state
    }
}