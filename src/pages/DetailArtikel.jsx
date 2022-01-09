import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, CardImg, CardText, CardTitle } from 'reactstrap';
import { API_URL } from '../helper';
import artikel from '../assets/artikel.png';

class DetailArtikel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            artikel : [],
            product : [],
        }
    }
    
    componentDidMount(){
        this.getData()
        this.getproduct()
        this.props.nav('./detail-artikel')
    }
    
    getData =()=>{
        axios.get(`${API_URL}/artikel${window.location.search}`)
        .then((res)=>{
            this.setState({artikel : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    getproduct = () =>{
        axios.get(`${API_URL}/products?id_gte=4&id_lte=6`)
        .then((res)=>{
            this.setState({product : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    printProduct = () =>{
        return this.state.product.map((val,idx)=>{
            return (
                <div className='col-md-12 mb-4'>
                    <Link to= {`/produk-detail?id=${val.id}`} style={{textDecoration:"none", color:"black"}}>
                    <Card className='px-2 bg-light zoom'  style={{background : 'white',border:'none',borderRadius:20}}>
                        <div style={{justifyContent:'center',display:'flex'}}>
                        <CardImg alt='cardimg' top  src={val.image[0]} style={{width:"60%",alignSelf:'center',marginTop:'10%',marginBottom:'10%',display:'inline-block',borderRadius:20}}/>
                        </div>
                        <CardBody>
                            <CardTitle className='h5' >{val.nama}</CardTitle>
                            <CardTitle className="h5" style={{fontWeight:'bold'}}>IDR {val.harga.toLocaleString('id-ID')}</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                </div>
            )
        })
    }
    
    printArtikel = ()=>{
        return this.state.artikel.map((val,idx)=>{
            return (
                <div className='container' style={{padding:'2%',borderRadius:20,paddingBottom:'0'}}>
                    <p className='h2' style={{fontWeight:'bold'}}>{val.judul}</p>
                    <div className='row my-4'>
                    <div className=' col-7'>
                        <img src={val.image} width='100%' style={{borderRadius:20}}/>
                        <p style={{color:'gray'}}>{val.sumber}</p>
                    </div>
                    <div className='col-5 d-flex justify-content-end'>
                        <p style={{textAlign:'justify'}}>
                            {val.berita}<a style={{fontWeight:'bold',color:'#ED1B24'}}>{val.penulis},{val.date}. </a>
                        </p>
                    </div>

                    </div>
                </div>
            )
        })
    }
    
    render() {
        console.log(this.state.product)
        return ( 
            <div>
                <div className='row' style={{padding:'3%'}}>
                <div className='col-md-10'>
                <div className='container align-items-center d-flex my-4' style={{backgroundImage: `url(${artikel})`,height:300,backgroundRepeat:'no-repeat',width:"95%"}}>
                    <p className='h1 m-auto' style={{fontWeight:'bold',color:'#5C4A51'}}>TOPIK DAN ARTIKEL</p>
                </div>
                    {this.printArtikel()}
                </div>
                <div className='col-md-2 my-4'>
                    <div className='container p-3 card'>
                        <p className='h3 text-center' style={{fontWeight:'bold'}}>Dapatkan Arai Sekarang!</p>
                        <div className='row'>
                            {this.printProduct()}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

 
export default (DetailArtikel);