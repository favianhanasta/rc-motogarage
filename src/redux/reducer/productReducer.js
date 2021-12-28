const INITIAL_STATE = {
    product : []
}

export const productReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "GET_PRODUCTS":
            console.log("prd",action.payload)
            return {
                ...state,product: action.payload
            }
        default :
            return state
    }
}