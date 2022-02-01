import axios from "axios"
import { API_URL } from "../../helper"

export const loginAction=(email,password)=>{
    // (disoatch,getState) getState = digunakan untuk mengambil data reducer secara langsung
    return async (dispatch)=>{
        try{
            let response = await axios.post(`${API_URL}/users/login`,{email,password})
            if(response.data.success){
                localStorage.setItem("data", response.data.dataLogin.token)
                dispatch({
                    type:"LOGIN_SUCCESS",
                    payload: response.data.dataLogin
                })
                return{success: response.data.success}
            }
        }catch(error){
            console.log(error)
        }
    }
}

export const keepLoginAction=()=>{
    return async (dispatch)=>{
        try{
            let token=localStorage.getItem("data");
            if(token){
                let res = await axios.get(`${API_URL}/users/keepLogin`,{
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                if(res.data.success){
                    localStorage.setItem("data", res.data.dataLogin.token)
                    dispatch({
                        type:'LOGIN_SUCCESS',
                        payload: res.data.dataLogin
                    })
                    return{success:res.data.success}
                }
            }
        }
        catch (error){
            console.log(error)
        }
    }
}


export const updateCart = (data,id)=>{
    return async (dispatch) =>{
        try{
            let res=await axios.patch(`${API_URL}/users/${id}`,{cart:data})
            dispatch({
                type : 'UPDATE_CART',
                payload  : res.data.cart
            })
            return {success : true}
        }
        catch (error){
            console.log(error)
        }
    }
}

export const verifyAction = () =>{
    return async (dispatch) =>{
        try{
            let token = window.location.pathname.split('/')[2];
            console.log(token);
            
            let res = await axios.get(API_URL+`/users/verification`, {
                    headers : {
                        'Authorization' : `Bearer ${token}`
                    }
            })
            if(res.data.success){
                localStorage.setItem("data",res.data.dataVerify.token);
                dispatch({
                    type : "LOGIN_SUCCESS",
                    payload : res.data.dataVerify
                })
                return{success : true}
            }
        }
        catch (error){
            console.log(error)
        }
    }
}

export const logoutAction=()=>{
    return{
        type:"LOGOUT"
    }
}
