import axios from "axios";
import reactDom from "react-dom";
import { API_URL } from "../../helper";

export const productAction = (nama,min,max)=>{
    return async (dispatch) =>{
        try{
            let res;
            if(nama){
                res=await axios.get(`${API_URL}/products?nama=${nama}`)
            }else if(min,max){
                res = await axios.get(`${API_URL}/products?harga_gte=${min}&harga_lte=${max}`)
            }else{
                res= await axios.get(`${API_URL}/products`)
            }
            dispatch({
                type : "GET_PRODUCTS",
                payload : res.data
            })
        }
        catch (error){
            console.log(error)
        }
    }
}