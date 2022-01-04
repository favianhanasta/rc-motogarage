import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardImg,CardText, CardBody, CardTitle, Button, CardFooter, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import carousel from '../assets/carousel_product.png'
import { productAction } from '../redux/action';

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            product:[],
            page:1,
         }
    }

    printProduct = () =>{
        let {page} = this.state
        return this.props.product.slice(page>1? (page-1)*6:page-1,page*6).map((val,idx)=>{
            return (
                <div className='col-md-4 mb-4'>
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
        for(let i=0;i< Math.ceil(this.props.product.length/6);i++){
            btn.push(<Button className='mx-2' color='danger'
            disabled={this.state.page=== i + 1 ? true : false} 
            onClick={()=>this.setState({page: i+1})}
            style={{borderRadius:'50%',width:40,height:40,backgorundColor:'#ED1B24'}}
            >{i+1}</Button>)
        }
        return btn;
    }

    btCari =()=>{
        let hrgMin = parseInt(this.hrgMin.value)
        let hrgMax = parseInt(this.hrgMax.value)
        this.props.productAction(this.filBrand.value,hrgMin,hrgMax)
        this.setState({page:1})
    }

    btShowAll = ()=>{
        this.props.productAction()
        this.hrgMax.value=null
        this.hrgMin.value=null
        this.filBrand.value=''
    }

    render() {
        return ( 
            <div className='container'>
                <div className='container rounded align-items-center d-flex shadow my-4' style={{backgroundImage: `url(${carousel})`,height:300,backgroundRepeat:'no-repeat'}}>
                    <p className='h1 m-auto' style={{fontWeight:'bold',color:'black',color:'white',paddingRight:'20%'}}>PRODUCTS</p>
                </div>
                <div className= 'row' style={{marginTop:'5%'}} >
                    <div className='col-md-3'>
                        <Card className='p-3'>
                        <div className='d-flex'>
                            <p className='h5' style={{fontWeight:'700'}}>Filter</p>
                            <span className="material-icons mx-1" style={{color:'#ED1B24'}}>sort</span>
                        </div>
                        <div className='my-2'>
                        <Label for='nm'>Brand</Label>
                        <Input id='nm' type='text' placeholder='Search by brand' innerRef={(e)=>this.filBrand=e}/>
                        </div>
                        <Label for='hrg'>Harga</Label>
                        <div className='d-flex'>
                            <InputGroup>
                            <Input id='hrg' placeholder='Minimum' className='mx-1' innerRef={(e)=>this.hrgMin=e}/>
                            <Input placeholder='Maximum' innerRef={(e)=>this.hrgMax=e}/>
                            </InputGroup>
                        </div>
                        <Button className='my-3' color='danger' outline onClick={this.btCari}>Cari</Button>
                        <Button color='primary' outline onClick={this.btShowAll}>Tampilkan Semua</Button>
                        </Card>
                    </div>
                    <div className='col-md-9' style={{height:1130}}>
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

const mapToProps =(state)=>{
    return{
        product : state.productReducer.product
    }
}
 
export default connect(mapToProps,{productAction})(ProductPage);

