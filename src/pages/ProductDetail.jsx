import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Badge, Button, Collapse, Input, Modal, ModalHeader,ModalBody,ModalFooter} from 'reactstrap';
import { API_URL } from '../helper';
import { updateCart } from '../redux/action/userAction';


class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            detail : {},
            harga : null,
            selectedType : {},
            qty : 1,
            alertOpen : false,
            selectedIdImg : 0,
            modalOpen:false,
            loginOpen : false,
         }
    }

    
    componentDidMount(){
        
        axios.get(`${API_URL}/products${window.location.search}`)
        .then((res)=>{
            this.setState({detail:res.data.dataProducts[0]})
            this.setState({
                harga: this.state.detail.harga.toLocaleString('id-ID')
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onBtCart = async ()=>{
        let {detail, qty, selectedType} = this.state
        if(this.props.username){
            if(this.state.selectedType.type){
                let data ={
                    nama : detail.nama,
                    harga : detail.harga,
                    qty : qty,
                    detail : detail,
                    image : detail.image[0],
                    type : selectedType.type
                }
                this.props.cart.push(data)
                let res = await this.props.updateCart(this.props.cart,this.props.idUser)
                if(res.success){
                    this.setState({modalOpen:true})
                }
            }else{
                this.setState({alertOpen:true})
            }
        }else {
            this.setState({loginOpen:true});
        }
    }

    onBtIncre =()=>{
        if(this.state.selectedType.type){
            this.setState({alertOpen:false})
            if(this.state.qty < this.state.selectedType.qty){
                this.setState({qty:this.state.qty+=1})
            }
        }else{
            this.setState({alertOpen:true})
        }
    }
    
    onBtDecre =()=>{
        if(this.state.selectedType.type){
            this.setState({alertOpen:false})
            if(this.state.qty > 1){
                this.setState({qty:this.state.qty-=1})
            }
        }else{
            this.setState({alertOpen:true})
        }
    }

    
    
    render() {
        console.log("sd",this.state.detail)
        this.props.nav('/detail-produk')
        return ( 
            <div className='container' style={{paddingTop:'5%'}}>
                <Modal isOpen={this.state.loginOpen} toggle={()=>this.setState({loginOpen:false})} centered>
                    <ModalHeader toggle={()=>this.setState({loginOpen:false})}></ModalHeader>
                    <ModalBody>
                            <p>Login terlebih dahulu untuk menikmati fitur lainnya</p>
                    </ModalBody>
                    <ModalFooter>
                        <Link to='/auth-page'>
                            <Button style={{backgroundColor:'#DA0037',border:'none'}}>Login</Button>
                        </Link>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modalOpen} toggle={()=>this.setState({modalOpen:false})} centered >
                                    <ModalHeader toggle={()=>this.setState({modalOpen:false})}></ModalHeader>
                                    <ModalBody>
                                        <p>Item Berhasil Ditambahkan pada Keranjang </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Link to='/produk'>
                                            <Button color='primary'>Pilih Produk lagi</Button>
                                        </Link>
                                        <Link to='/cart-page'>
                                            <Button >Keranjang Anda</Button>
                                        </Link>
                                     </ModalFooter>
                </Modal>
                    <div className='d-flex justify-content-center'>
                        <Alert className='alert-heading' color='danger' isOpen={this.state.alertOpen} toggle={()=>this.setState({alertOpen:false})}>
                            <p className='lead'>Oops, Pilih ukuran terlebih dahulu!</p>
                        </Alert>
                    </div>
                <div className='row py-4'>
                    <div className='col-md-4' >
                    {
                        this.state.detail.idproduct &&
                        <>
                            <div>
                            <img className="bg-white rounded" src={this.state.detail.images[this.state.selectedIdImg].url} width="100%" />
                            <div className='d-flex my-2 justify-content-center'>
                                {
                                    this.state.detail.images.map((item,i)=>{
                                        return(
                                            <div className='m-2 shadow' onClick={()=>this.setState({selectedIdImg : i})}
                                            style={{width:'20%', borderRadius:'20%',padding:'1%',cursor:'pointer',backgroundColor:this.state.selectedIdImg==i? '#ED1B24' : 'white'}}
                                            >
                                                <img src={item.url}  style={{width:'100%',borderRadius:'20%'}}/>
                                            </div>
                                            )
                                        })  
                                    }
                            </div>
                            </div>
                        </>
                    }
                    </div>
                    <div className='col-md-8'>
                        <h2 style={{fontWeight:'600'}}>{this.state.detail.name}</h2>
                        <h1 style={{color:'#ED1B24'}}>IDR {this.state.harga}</h1>
                        <p style={{width:'80%',textAlign:'justify'}}><a style={{fontWeight:'bold'}}>Deskripsi : </a><br/> {this.state.detail.deskripsi}</p>
                        <div style={{height:150}}>
                        <p style={{fontWeight:'bold'}}>Ukuran yang tersedia</p>
                        <div className='d-flex'>
                            {
                                this.state.detail.stock&&
                                this.state.detail.stock.map((item,i)=>{
                                    return (
                                        <Button className='mx-2' onClick={()=>this.setState({selectedType : item})}
                                        style={{width:50,height:50,color:'#ED1B24',borderColor:'#ED1B24',borderRadius:'50%',marginBottom:'2%',backgroundColor:'white'}}>{item.type}</Button>
                                        )
                                    })
                                }
                        </div>
                        {
                            this.state.selectedType != '' ?
                            <p>
                            Ukuran yang dipilih : <a style={{fontWeight:'bold',color:'#ED1B24'}}>{this.state.selectedType.type}</a><br/>
                            Sisa Stock : <a style={{fontWeight:'bold',color:'#ED1B24'}} >{this.state.selectedType.qty}</a>
                            </p>
                            :null
                        }
                        </div>
                    <div className='my-3'>
                        <p style={{fontWeight : 'bold'}}>Jumlah:</p>
                        <div className='d-flex'>
                            <Button outline onClick={this.onBtDecre}>-</Button>
                            <p className='mx-4 my-1' style={{color:'#ED1B24'}}>{this.state.qty}</p>
                            <Button outline color='success' onClick={this.onBtIncre} >+</Button>
                        </div>
                    </div>
                        <Button className='p-2' style={{width:'100%',backgroundColor:'#ED1B24',fontWeight:'bold',border:'none'}} onClick={this.onBtCart} >Add to Cart</Button>
                    </div>
                    </div>    
            </div>
         );
    }
}

const mapToprops =(state)=>{
    return {
        cart : state.userReducer.cart,
        username  : state.userReducer.username
    }
}

export default  connect(mapToprops,{updateCart}) (ProductDetail);