const INITIAL_STATE = {
    id:null,
    username : "",
    email :"",
    role :"",
    status:"",
    cart:[],
}

export const userReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            console.log('data',action.payload)
            return {
                ...state,
                id: action.payload.idusers,
                username: action.payload.username,
                email: action.payload.email,
                role:action.payload.role,
                status:action.payload.status,
            }
        case "UPDATE_CART":
            return {
                ...state, cart : action.payload
            }
        case "LOGOUT":
            return{
                INITIAL_STATE
            }
        default :
            return state
    }
}