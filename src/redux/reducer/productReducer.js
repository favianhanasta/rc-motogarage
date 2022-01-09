const INITIAL_STATE = {
    product : [],
}

export const productReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "GET_PRODUCTS":
            console.log("prd",action.payload)
            return {
                ...state,product: action.payload
            }
        case "GET_KATEGORI":
            console.log('kat',action.payload)
            return {
                ...state,kategori : action.payload
            }
        default :
            return state
    }
}