import axios from "axios";
import reactDom from "react-dom";
import { API_URL } from "../../helper";

export const productAction = (search=null)=>{
    return async (dispatch) =>{
        try{
            let res;
            if(search){
                console.log("input",search)
                if(search.name){
                    if(search.price_min > 0 && search.price_max > 0){
                        res = await axios.get(`${API_URL}/products?price_min=${search.price_min}&price_max=${search.price_max}&name=${search.name}`)
                    }else{
                        res = await axios.get(`${API_URL}/products?name=${search.name}`)
                    }
                }else{
                    res = await axios.get(`${API_URL}/products?price_min=${search.price_min}&price_max=${search.price_max}`)  
                }
            }else{
                res = await axios.get(`${API_URL}/products`)
            }
            dispatch({
                type : "GET_PRODUCTS",
                payload : res.data.dataProducts
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export const sortAction = (sort=null) =>{
    return async (dispatch) =>{
        try {
            let res=await axios.get((`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`))
            dispatch({
                type:"GET_PRODUCTS",
                payload: res.data.dataProducts
            })
        }catch(error){
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


