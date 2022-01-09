import axios from "axios";
import reactDom from "react-dom";
import { API_URL } from "../../helper";

export const productAction = (nama,min,max)=>{
    return async (dispatch) =>{
        try{
            let res;
            if(nama && min && max){
                res= await axios.get(`${API_URL}/products?harga_gte=${min}&harga_lte=${max}&brand=${nama}`)                
            }
            else if(min&&max){
                res = await axios.get(`${API_URL}/products?harga_gte=${min}&harga_lte=${max}`)
            }else if(nama){
                res=await axios.get(`${API_URL}/products?brand=${nama}`)
            }
            else{
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

export const productKategori = (kat) =>{
    return async (dispatch) =>{
        try{
            dispatch ({
                type : 'GET_KATEGORI',
                payload : kat
            })
            return {success : true}
        }
        catch (err){
            console.log(err)
        }
    }
}
