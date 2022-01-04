import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Badge, Button, Collapse, Input, Modal, ModalHeader } from 'reactstrap';
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
         }
    }

    
    componentDidMount(){
        axios.get(`${API_URL}/products${window.location.search}`)
        .then((res)=>{
            this.setState({detail:res.data[0]})
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
        if(this.props.idUser){
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
                this.props.updateCart(this.props.cart,this.props.idUser)
            }else{
                this.setState({alertOpen:true})
            }
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
        console.log('sd',(this.props.idUser))
        return ( 
            <div className='container' style={{paddingTop:'5%'}}>
                <div className='row py-4'>
                    <div className='col-md-4' >
                    {
                        this.state.detail.id &&
                        <>
                            <div>
                            <img className="bg-white rounded" src={this.state.detail.image[this.state.selectedIdImg]} width="100%" />
                            <div className='d-flex my-2 justify-content-center'>
                                {
                                    this.state.detail.image.map((item,i)=>{
                                        return(
                                            <div className='m-2 shadow' onClick={()=>this.setState({selectedIdImg : i})}
                                            style={{width:'20%', borderRadius:'20%',padding:'1%',cursor:'pointer',backgroundColor:this.state.selectedIdImg==i? '#ED1B24' : 'white'}}
                                            >
                                                <img src={item}  style={{width:'100%',borderRadius:'20%'}}/>
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
                        <h2 style={{fontWeight:'600'}}>{this.state.detail.nama}</h2>
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
                    <div className='d-flex justify-content-center my-4'>
                        <Alert className='alert-heading' color='danger' isOpen={this.state.alertOpen} toggle={()=>this.setState({alertOpen:false})}>
                            <p className='lead'>Oops, Pilih ukuran terlebih dahulu!</p>
                        </Alert>
                    </div>
                    </div>
                    </div>    
            </div>
         );
    }
}

const mapToprops =(state)=>{
    return {
        cart : state.userReducer.cart,
        idUser  : state.userReducer.id
    }
}

export default  connect(mapToprops,{updateCart}) (ProductDetail);