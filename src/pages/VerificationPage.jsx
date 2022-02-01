import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { API_URL } from '../helper';
import { verifyAction } from '../redux/action';


const VerificationPage = (props)=>{

    const [redirect, setRedirect ] = useState(false);
    const dispatch = useDispatch();

    const verify = async ()=>{
        try{
            let res = await dispatch(verifyAction())
            if(res.success){
                setRedirect(true);
            }
        }
        catch (error){
            console.log(error);
        }
    }
    console.log(redirect)

    useEffect(()=>{
        props.nav('/verification')
    },[])
    
    return(
        <>
            {
                redirect?
                <Navigate to='/'/>:null
            }
        <div  className='container' style={{height:'100vh'}}>
            <h1 className='text-center' style={{marginTop:'3%',marginBottom:'3%',fontWeight:'bold'}}>Verifikasi Akun</h1>
            <div className='row'>
                <div className='col-md-6 d-flex justify-content-end'>
                    <img src="https://media.sproutsocial.com/uploads/2018/05/Instagram-Verification.png" alt="" width='85%' />

                </div>
                <div className='lead col-md-6' style={{fontWeight:'bold'}}>
                    <p className='my-4'>Selamat bergabung,<br/>Silahkan verifikasi akun anda dengan klik tombol dibawah ini!</p>
                    <Button type='button' onClick={verify} style={{backgroundColor:'#EB1B25',border:'none',width:150,marginTop:'15%'}}>Verifikasi</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default VerificationPage;