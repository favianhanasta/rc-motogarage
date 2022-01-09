import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import FooterComp from './components/Footer';
import NavbarComponent from './components/Navbar_comp';
import AuthPage from './pages/AuthPage';
import CartPage from './pages/CartPage';
import DetailArtikel from './pages/DetailArtikel';
import DetailTransaksi from './pages/DetailTransaksi';
import LandingPage from './pages/LandingPage';
import ManajemenArtikel from './pages/ManajemenArtikel';
import ManajemenProduk from './pages/ManajemenProduk';
import ManajemenTransaksi from './pages/ManajemenTransaksi';
import ProductPage from './pages/Product';
import ProductByCategory from './pages/ProductByCategory';
import ProductDetail from './pages/ProductDetail';
import { loginAction} from './redux/action';
import { productAction } from './redux/action';
import { productKategori } from './redux/action';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      loading : true,
      path : '/'
     }
  }

  componentDidMount(){
    this.keeplogin();
    this.props.productAction();
    this.props.productKategori()
    
  }

  keeplogin = async ()=>{
  try {
      let local = JSON.parse(localStorage.getItem('data'))
      if(local){
        let res = await this.props.loginAction(local.email,local.password)
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

  nav =(location)=>{
    this.setState({path : location})
  }
  

  render() { 
    console.log('nav',this.state.path)
    return ( 
      <>
      <NavbarComponent loading={this.state.loading} nav={this.nav} path={this.state.path}/>
      <Routes>
        <Route path="/" element={<LandingPage nav={this.nav}/>}/>
        <Route path="/auth-page" element={<AuthPage nav={this.nav}/>}/>
        <Route path="/produk" element={<ProductPage nav={this.nav}/>}/>
        <Route path="/produk-detail" element={<ProductDetail nav={this.nav}/>}/>
        <Route path="/detail-artikel" element={<DetailArtikel nav={this.nav}/>}/>
        <Route path="/produk-kategori" element={<ProductByCategory nav={this.nav}/>}/>
        {
          this.props.role == 'user' ?
          <>
          <Route path="/cart-page" element={<CartPage nav={this.nav}/>}/>
          <Route path="/detailTransaksi-page" element={<DetailTransaksi keeplogin={this.keeplogin} nav={this.nav}/>}/>
          </>
          :
          this.props.role == 'admin' ?
          <>
          <Route path="/manajemen-produk" element={<ManajemenProduk nav={this.nav}/>}/>
          <Route path="/manajemen-transaksi" element={<ManajemenTransaksi nav={this.nav}/>}/>
          <Route path="/manajemen-artikel" element={<ManajemenArtikel nav={this.nav}/>}/>
          </>
          :
          <>
          </>
        }
        
      </Routes>
      <FooterComp/>
      </>
     );
  }
}

const mapTopProps =(state)=>{
  return{
    role: state.userReducer.role
  }
}
 
export default  connect(mapTopProps,{loginAction,productAction,productKategori})(App);

