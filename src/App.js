import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NavbarComponent from './components/Navbar_comp';
import AuthPage from './pages/AuthPage';
import LandingPage from './pages/LandingPage';
import ManajemenProduk from './pages/ManajemenProduk';
import ProductPage from './pages/Product';
import { loginAction } from './redux/action';
import { productAction } from './redux/action';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading : true,
     }
  }

  componentDidMount(){
    this.keeplogin();
    this.props.productAction();
  }

  keeplogin = async ()=>{
  try {
      let local = JSON.parse(localStorage.getItem('data'))
      if(local){
        let res = await this.props.loginAction(local.email,local.password)
        console.log('lcl',res.success)
        if(res.success){
          this.setState({loading:false})
        }
      }else{
        this.setState({loading:false})
      }
  }
    catch (error){
      console.log(error)
    }
  }
  

  render() { 
    return ( 
      <>
      <NavbarComponent
      loading={this.state.loading}/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth-page" element={<AuthPage/>}/>
        <Route path="/manajemen-produk" element={<ManajemenProduk/>}/>
        <Route path="/produk" element={<ProductPage/>}/>
      </Routes>
      </>
     );
  }
}

const mapTopProps =(state)=>{
  return{
    role: state.userReducer.role
  }
}
 
export default  connect(mapTopProps,{loginAction,productAction})(App);

