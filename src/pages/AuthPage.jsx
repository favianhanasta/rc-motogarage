import axios from 'axios';
import React from 'react';
import { Button, Form, FormGroup, Input, Label, InputGroupText, InputGroup, Toast, ToastHeader, ToastBody } from 'reactstrap';
import logo from "../assets/rc_logo.png"
import { API_URL } from '../helper';
import {loginAction} from '../redux/action'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

class AuthPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            head : 'Login',
            confPass : '',
            passShow :'show',
            passType :'password',
            passShowConf :'show',
            passTypeConf :'password',
            toastHeader : '',
            toastBody:'',
            toastIcon:'',
            toastOpen:false,
        }
    }

    // componentDidMount(){
    //     this.props.nav('/auth-page')
    // }

    btShowPassConf =()=>{
        if(this.state.passTypeConf=='password'){
            this.setState({
                passShowConf:'hide',
                passTypeConf:'text',
            })
        }else {
            this.setState({
                passShowConf :'show',
                passTypeConf :'password'
            })
        }
    }
    btShowPass =()=>{
        if(this.state.passType=='password'){
            this.setState({
                passShow:'hide',
                passType:'text',
            })
        }else {
            this.setState({
                passShow :'show',
                passType :'password'
            })
        }
    }

    onBtnDaftar = () =>{
        let inUsername = this.usernameRegis.value;
        let inEmail = this.emailRegis.value;
        let inPassword = this.passwordRegis.value;
        if(inUsername !== "" && inEmail !== "" && inPassword !== ""){
            if(inPassword === this.state.confPass && inEmail.includes('@')){
                axios.post(`${API_URL}/users/registrasi`,{
                    username : inUsername,
                    email  : inEmail,
                    password : inPassword
                }).then((res)=>{
                    this.setState({
                        toastOpen:true,
                        toastHeader : 'Notification',
                        toastIcon:'success',
                        toastBody:'Selamat Registrasi berhasil !',
                        head :'Login',
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }else {
                this.setState({
                    toastOpen:true,
                    toastHeader : 'Notification',
                    toastIcon:'warning',
                    toastBody:'Cek kembali email atau password anda',
                })
            }
        }else {
            this.setState({
                toastOpen:true,
                toastHeader : 'Notification',
                toastIcon:'warning',
                toastBody:'Cek kembali input form anda',
            })
        }
    }

    onBtnLogin = async () =>{
        // try{
        this.props.loginAction(this.emailLogin.value,this.passwordLogin.value)
        //     if(res.failed){
        //         this.setState({notifFail:'Cek Kembali email dan password anda'})
        //         console.log(this.state.notifFail)
        //     }else if(res.success){
        //         this.setState({notifFail:''})
        //     }
        // }
        // catch (error){
        //     console.log(error)
        // }

    }

    render() {
        if(this.props.iduser>0){
            return <Navigate to='/'/>
        } 
        this.props.nav('/auth-page')
        return ( 
            <div style={{width:'75%', margin:'auto'}}>
                <div className='d-flex justify-content-end'>
                    <Toast isOpen={this.state.toastOpen} style={{position:'fixed '}}>
                        <ToastHeader toggle={()=>this.setState({toastOpen:false})} icon={this.state.toastIcon}> {this.state.toastHeader} </ToastHeader>
                        <ToastBody> {this.state.toastBody} </ToastBody>
                    </Toast>
                </div>
                <div className='d-md-flex mx-auto shadow row' style={{borderRadius:20,position:'relative',marginTop:'5%'}}>
                <div className='col-md-7' style={{padding:0,borderRadius:20,backgroundColor:'yellow'}}>
                    <img src='https://images.unsplash.com/photo-1627407811811-56b02ac2493f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80' width='100%' style={{borderRadius:20}}/>
                </div>
                <div className='col-md-5' style={{backgroundColor:'white',borderRadius:10}}>
                    <div style={{margin:'auto',alignSelf:'auto',padding:'5%'}}>
                    {
                        this.state.head === 'Login' ?
                        <Form>
                        <h1 className='my-3' style={{color:'red'}}>{this.state.head}</h1>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input id="email" placeholder='email' innerRef={(e)=>this.emailLogin=e}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <InputGroup>
                            <Input id="password" placeholder='Password' innerRef={(e)=>this.passwordLogin=e} type={this.state.passType}/>
                            <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPass}>
                                    {this.state.passShow}
                            </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <p style={{color:'red',fontSize:12,marginTop:0}}>{this.state.notifFail}</p>
                            <Button color='danger' type='button' onClick={this.onBtnLogin} style={{borderColor:'black'}}>Login</Button>
                        </FormGroup>
                        <FormGroup>
                            <p className='text-muted'>Belum mempunyai akun? <a style={{color:'red',cursor:'pointer'}} onClick={()=>this.setState({head:'Register'})}>Daftar Sekarang</a></p>
                        </FormGroup>
                        </Form>
                        :
                        <Form>
                        <h1 className='my-3' style={{color:'red'}}>{this.state.head}</h1>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input id="username" placeholder='Username' innerRef={(e)=>this.usernameRegis=e}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                            <Input id="email" placeholder='email' innerRef={(e)=>this.emailRegis=e}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <InputGroup>
                            <Input id="password" placeholder='Password' innerRef={(e)=>this.passwordRegis=e} type={this.state.passType}/>
                            <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPass}>
                                    {this.state.passShow}
                            </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="conf-password">
                                Konfirmasi Password
                            </Label>
                            <InputGroup>
                            <Input id="conf-password" placeholder='Password' onChange={(e)=>this.setState({confPass:e.target.value})} type={this.state.passTypeConf}/>
                            <InputGroupText style={{ cursor: "pointer" }} onClick={this.btShowPassConf}>
                                    {this.state.passShowConf}
                            </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button color='danger' type='button' onClick={this.onBtnDaftar} >Daftar</Button>
                        </FormGroup>
                        <FormGroup>
                            <p><a style={{color:'red',cursor:'pointer'}} onClick={()=>this.setState({head:'Login'})}>Login Page</a></p>
                        </FormGroup>
                    </Form>
                    }
                    </div>
                </div>
                </div>
            </div>
         );
    }
}

const mapToProps =(state)=>{
    return {
        iduser : state.userReducer.idusers
    }
}
 
export default connect(mapToProps,{loginAction})(AuthPage);