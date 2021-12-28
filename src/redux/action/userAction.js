import axios from "axios"
import { API_URL } from "../../helper"

export const loginAction = (email,password) =>{
    return async (dispatch) =>{
        try{
            let res = await axios.get(`${API_URL}/users?email=${email}&password=${password}`)
            if(res.data.length>0){
                localStorage.setItem("data", JSON.stringify(res.data[0]))
                dispatch({
                    type : "LOGIN_SUCCESS",
                    payload : res.data[0]
                })
                return {success : true}
            }else{
                return {failed : true}
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}