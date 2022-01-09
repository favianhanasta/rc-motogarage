import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardImg,CardText, CardBody, CardTitle, Button, CardFooter, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import carousel from '../assets/carousel_product.png'
import { API_URL } from '../helper';

class ProductByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            product:[],
            page:1,
         }
    }

    componentDidMount(){
        axios.get(`${API_URL}/products${window.location.search}`)
        .then((res)=>{
            console.log('jj',res.data)
            this.setState({product:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    printProduct = () =>{
        let {page} = this.state
        return this.state.product.slice(page>1? (page-1)*8:page-1,page*8).map((val,idx)=>{
            return (
                <div className='col-md-3 mb-4'>
                    <Link to= {`/produk-detail?id=${val.id}`} style={{textDecoration:"none", color:"black"}}>
                    <Card className='shadow px-2' >
                        <div style={{height:250, justifyContent:'center',display:'flex'}}>
                        <CardImg alt='cardimg' top  src={val.image[0]} style={{width:"70%",alignSelf:'center',marginTop:'10%',marginBottom:'10%',display:'inline-block'}}/>
                        </div>
                        <CardBody>
                            <div style={{height:100}}>
                            <CardTitle className='h5'>{val.nama}</CardTitle>
                            </div>
                            <CardTitle className="h5" style={{fontWeight:'bold'}}>IDR {val.harga.toLocaleString('id-ID')}</CardTitle>
                            <CardText>
                            <div>
                            <p>Available Size</p>
                            <div className='d-flex'>
                            {
                                val.stock.map((val,idx)=>{
                                    return(
                                        <p style={{marginRight:'10%',color:'red',fontSize:15,marginTop:-10}}>{val.type}</p>
                                        )
                                    })
                                }
                            </div>
                            </div>
                            </CardText>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            )
        })
    }

    printBtPagination = () =>{
        let btn=[]
        for(let i=0;i< Math.ceil(this.state.product.length/8);i++){
            btn.push(<Button className='mx-2' color='danger'
            disabled={this.state.page=== i + 1 ? true : false} 
            onClick={()=>this.setState({page: i+1})}
            style={{borderRadius:'50%',width:40,height:40,backgorundColor:'#ED1B24'}}
            >{i+1}</Button>)
        }
        return btn;
    }

    

    btShowAll = ()=>{
        window.location.assign('/produk')
    }

    render() {
        let judul = window.location.search
        const arr = judul.split("=")
        this.props.nav('/produk-kategori') 
        return ( 
            <div className='container'>
                <div className='container rounded align-items-center d-flex shadow my-4' style={{backgroundImage: `url(${carousel})`,height:300,backgroundRepeat:'no-repeat'}}>
                    <p className='h1 m-auto' style={{fontWeight:'bold',color:'black',color:'white',paddingRight:'20%'}}>{arr[1].toUpperCase()} COLLECTION</p>
                </div>
                <div className= 'row' style={{marginTop:'1%'}} >
                    <div className='col-md-12 my-4 d-flex justify-content-end'>
                        <Button color='primary' outline onClick={this.btShowAll}>Tampilkan Semua Produk</Button>   
                    </div>
                    <div className='col-md-12' style={{height:1130}}>
                        <div className='row'>
                            {this.printProduct()}
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center my-3'>
                    {this.printBtPagination()}
                </div>
            </div>
         );
    }
}

const mapToprops =(state)=>{
    return {
        kategori : state.productReducer.kategori
    }
}
 
export default connect(mapToprops)(ProductByCategory);

