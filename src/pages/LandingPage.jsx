import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import lp_3 from '../assets/lp_3-01-01.png'
import carousel from '../assets/carousel_product.png'
import kate1 from '../assets/kate1-01.png'
import kate2 from '../assets/kate2-01.png'
import kate3 from '../assets/kate3-01.png'
import kate4 from '../assets/kate4-01.png'
import { productKategori } from '../redux/action';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductByCategory from './ProductByCategory';
import axios from 'axios';
import { API_URL } from '../helper';
import homeimg from '../assets/home.jpg'
import { Button } from 'reactstrap';


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artikel:[], 
            images : [
                {url:'https://github.com/favianhanasta/rc-motogarage/blob/main/src/assets/lp_1.png?raw=true'},
                {url:'https://github.com/favianhanasta/rc-motogarage/blob/main/src/assets/lp_2.png?raw=true'},
                {url:'https://github.com/favianhanasta/rc-motogarage/blob/main/src/assets/lp_4.png?raw=true'},
                {url:'https://lelogama.go-jek.com/cache/19/09/1909a04fe9d3b2b3ed9e8a39ab70c75d.webp'},
            ],
            kategori : [
                {
                    img : kate1,
                    judul :'Jacket',
                    filter : 'jacket'
                },
                {
                    img : kate2,
                    judul :'Helm',
                    filter :'helm'
                },
                {
                    img : kate3,
                    judul :'Gloves',
                    filter : 'gloves'
                },
                {
                    img : kate4,
                    judul :'Boots',
                    filter : 'boots'
                }
            ]
         }
    }

    componentDidMount(){
        this.props.nav('/')
        axios.get(`${API_URL}/artikel`)
        .then((res)=>{
            this.setState({artikel:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }


    printKategori = () =>{
        return this.state.kategori.map((val,idx)=>{
            return(
                <Link to= {`/produk-kategori?kategori=${val.filter}`} style={{textDecoration:"none", color:"black"}}>
                <div className='text-center mx-1 my-2 p-3' style={{backgroundColor:'#EDEDED',cursor:'pointer'}}>
                    <img src={val.img} width='100%' className='zoom' />
                    <p className='my-2 h4' style={{color:'#171717'}}>{val.judul}</p>
                </div>
                </Link>

            )
        })
    }

    printArtikel = () =>{
        return this.state.artikel.map((val,idx)=>{
            return(
                <div className='col-md-6'>
                <Link to={`/detail-artikel?id=${val.id}`} style={{textDecoration:"none", color:"white"}}>
                    <div className="row my-4 zoom mx-2" style={{backgroundColor:'#363636',borderRadius:20,padding:'2%',height:230}}>
                        <div className='col-md-4'>
                            <img src={val.image} style={{width:'100%',borderRadius:10}}/>
                        </div>
                        <div className='col-md-8' style={{height:140}}>
                            <p className='h4' style={{color:'#EDEDED',fontWeight:'400'}}>{val.judul}</p>
                            <p style={{color:'#b2bec3'}}>by {val.penulis}</p>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <p style={{color:'#DA0037'}}>Klik untuk detail topik</p>
                        </div>
                    </div>
                </Link>
                </div>
            )
        })
    }

    

    render() { 
        console.log(this.state.artikel)
        return ( 
            <div>
                <div>
                    <img src={homeimg} alt='home' style={{width:'100%'}}/>
                </div>
                <div style={{backgroundColor:'#070909',paddingTop:'5%'}}>
                <SimpleImageSlider
                    width={'80%'}
                    height={600}
                    images={this.state.images}
                    autoPlay={true} 
                    slideDuration={1}
                    style={{margin:'auto'}}   
                    />
                </div>
                <div className='container-fluid p-4' style={{paddingTop:'5%',backgroundColor:'#070909'}}>
                    <div className='my-4'>
                        <p className='h1 text-center my-3' style={{color:"#EDEDED",marginTop:'2%'}}>PRODUK</p>
                    </div>
                    <div className='d-md-flex'>
                        {this.printKategori()}
                    </div>
                </div>
                <div  style={{height:50,backgroundColor:'#070909'}}></div>
                <div className='container-fluid p-4' style={{backgroundColor:"#171717",paddingTop:'5%'}}>
                    <h1 className='text-center' style={{color:'white'}}>TOPIK & ARTIKEL</h1>
                    {
                        this.props.role == 'admin' ?
                        <div className='d-flex justify-content-end container-fluid'>
                            <Link to='/manajemen-artikel'>
                                <Button>Tambah Artikel</Button>
                            </Link>
                        </div>
                        : <></>

                    }
                    <div className='row p-4'>
                        {this.printArtikel()}  
                    </div>
                </div>
                <div className='container text-center'>
                    <img src={lp_3} style={{width:'70%'}}/>
                </div>
            </div>
         );
    }
}

const mapToProps =(state)=>{
    return {
        role : state.userReducer.role
    }
}
 
export default connect(mapToProps,{productKategori}) (LandingPage);