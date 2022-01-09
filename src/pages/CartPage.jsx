import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import logo from '../assets/rc.png';
import { API_URL } from '../helper';
import { updateCart } from '../redux/action';
import cart from '../assets/cart.png'

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            metodePayment : '',
            metodePaymentUrl:'',
            modalMetode:'',
         }
    }

    printProduk =()=>{
        return this.props.cart.map((val,idx)=>{
            return (
                <div className='row p-2 m-2 rounded bg-light'>
                    <div className='col-3 d-flex justify-content-end'>
                        <img src={val.image} width='100%' height='100%'  style={{borderRadius:'10%'}}/>
                    </div>
                    <div className='col-9 row'>
                        <div className='col-9' >
                        <p style={{fontWeight:'bold'}} className='lead'>{val.nama}</p>
                        <div className='d-flex'>
                            <p >Size : <a style={{color:'#ED1B24'}}>{val.type}</a></p>
                            <p className='mx-4' >Kategori : <a style={{color:'#ED1B24'}}>{val.detail.kategori}</a></p>
                        </div>
                        <p style={{fontWeight:'bold',fontSize:25}}>IDR {val.harga.toLocaleString('id-ID')} <a style={{fontWeight:'100',color:'grey',fontSize:20}}>X</a> {val.qty} </p>
                        </div>
                        <div className='col-3 my-2' >
                            <Button color='danger' outline style={{border:'none'}} onClick={()=>this.btnBatalCart(idx)} >Batalkan</Button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    totalPayment =()=>{
        let x  = 0;
        this.props.cart.forEach((val,idx)=>{
            x += val.harga*val.qty
        })
        return x
    }

    printTotalPayment =()=>{
        return this.props.cart.map((val,idx)=>{
            return (
                <div className='d-flex' >
                    <p>{val.nama} ({val.detail.kategori})</p>
                    <p style={{marginLeft:'auto',fontWeight:'bold'}}>IDR {(val.harga*val.qty).toLocaleString('id-ID')}</p>
                </div>
                
            )
        })
    }

    btnBayar = () =>{
        let d = new Date();
        if(this.state.metodePayment){
            axios.post(`${API_URL}/userTransactions`,{
                iduser : this.props.iduser,
                username  : this.props.username,
                totalPayment : this.totalPayment()+200000+(this.totalPayment()*1/100),
                detail : [...this.props.cart],
                invoice : `INV${d.getTime()}`,
                date : d.toLocaleString(),
                status : 'Menunggu Konfirmasi',
                metodeBayar : this.state.metodePayment
            })
            .then((res)=>{
                this.props.updateCart([],this.props.iduser)
            })
            .catch((err)=>{
                console.log(err)
            })

        }else{
            this.setState({modalMetode:true})
        }
    }

    btnBatalCart = (id) =>{
        let temp = [...this.props.cart]
        temp.splice(id,1)
        this.props.updateCart(temp,this.props.iduser)

    }

    render() {
        this.props.nav('/cart-page')
        return (
            <div className='container' style={{marginTop:'4%'}}>
                <Modal isOpen={this.state.modalMetode} toggle={()=>this.setState({modalMetode:false})} centered>
                    <ModalHeader toggle={()=>this.setState({modalMetode:false})}>Attention </ModalHeader>
                    <ModalBody><p className='lead'>Pilih Metode Pembayaran terlebih dahulu</p></ModalBody>
                </Modal>
                {
                    this.props.cart.length?
                    <>
                    <div className='d-flex align-items-center'>
                    <h2 style={{fontWeight:'bold'}} >Shopping Cart</h2>
                    <img src={logo} width='10%' style={{marginLeft:'auto'}}/>
                    </div>
                    <div className='row my-3'>
                    <div className='col-7 p-2'  style={{borderRadius:20}}>
                        {this.printProduk()}
                    </div> 
                    <div className='col-5 '>
                        <div className='container p-3 shadow' style={{borderRadius:20,backgroundColor:'white'}}>
                        <div>
                            <p className='text-center h4'>Detail Pembayaran</p>
                            {this.printTotalPayment()}
                        </div>
                        <div style={{fontWeight:'bold'}} className='d-flex'>
                            <p>Total Harga Item</p>
                            <p style={{marginLeft:'auto'}}>IDR {(this.totalPayment()).toLocaleString('id-ID')}</p>
                        </div>
                        <div style={{fontWeight:'bold'}} className='d-flex'>
                            <p>Asuransi</p>
                            <p style={{marginLeft:'auto'}}>IDR {(this.totalPayment()*1/100).toLocaleString('id-ID')}</p>
                        </div>
                        <div style={{fontWeight:'bold'}} className='d-flex'>
                            <p>Biaya Pengiriman</p>
                            <p style={{marginLeft:'auto'}}>IDR {(200000).toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                            <p>Pilih Metode Pembayaran</p>
                            <div style={{display:'flex',justifyContent:'space-evenly',alignItems:"center"}}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png" width='20%' height='20%' alt="" style={{cursor:'pointer'}} onClick={()=>this.setState({metodePayment:'gopay',metodePaymentUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png'})}/>
                                    <img src="https://statik.tempo.co/data/2019/04/23/id_836405/836405_720.jpg" width='20%' height='20%' alt="" style={{cursor:'pointer'}} onClick={()=>this.setState({metodePayment:'bca',metodePaymentUrl:"https://statik.tempo.co/data/2019/04/23/id_836405/836405_720.jpg"})}/>
                                    <img src="https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_white_bg.png" width='20%' height='20%' alt="" style={{cursor:'pointer'}} onClick={()=>this.setState({metodePayment:'mandiri',metodePaymentUrl:'https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_white_bg.png'})}/>
                            </div>
                            <p style={{fontWeight:'bold'}}>Pembayaran melalui : <a style={{color:'#ED1B24'}}>{this.state.metodePayment.toUpperCase()}</a></p>
                        </div>
                        <div className='d-flex'>
                            <p className='h5' style={{fontWeight:'bold'}}>Total Pembayaran</p>
                            <p className='h4' style={{marginLeft:'auto',color:'#ED1B24'}}>IDR {(this.totalPayment()+200000+(this.totalPayment()*1/100)).toLocaleString('id-ID')}</p>
                        </div>
                        <div >
                            <Button style={{width:'100%',backgroundColor:'#ED1B24',fontWeight:'bold',border:'none',borderRadius:10}} onClick={this.btnBayar} >Bayar</Button>
                        </div>
                        </div>
                    </div>
                    </div>
                    </>
                    :
                    <div>
                        <div className='container p-4 justify-content-center w-75 text-center' style={{borderRadius:50}}>
                                <img src={cart} width='50%' style={{marginBottom:'3%'}}/>
                                <h2>Keranjang belanjaan anda kosong </h2>
                                <h2>Ayooo berbelanja  </h2>
                                <div className='row'>
                                    <div className='col-6'>
                                        <Link to='/produk'>
                                            <Button style={{width:'100%',backgroundColor:'#ED1B24',fontWeight:'bold',border:'none',borderRadius:10,marginTop:'2%'}}>Ke Halaman Produk</Button>
                                        </Link>
                                    </div>
                                    <div className='col-6'>
                                        <Link to='/detailTransaksi-page'>
                                            <Button style={{width:'100%',backgroundColor:'black',fontWeight:'bold',border:'none',borderRadius:10,marginTop:'2%'}}>Ke Transaksi Anda</Button>
                                        </Link>
                                    </div>
                                </div>    
                        </div>
                    </div>
                    
                }
            </div>
         );
    }
}

const mapToProps =(state)=>{
    return {
        iduser : state.userReducer.id,
        username : state.userReducer.username,
        cart : state.userReducer.cart,
    }
}

export default connect(mapToProps,{updateCart})(CartPage);