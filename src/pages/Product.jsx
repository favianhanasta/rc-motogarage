import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardImg,CardText, CardBody, CardTitle, Button, CardFooter, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import carousel from '../assets/carousel_product.png'
import { productAction,sortAction } from '../redux/action';

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
                    <Link to= {`/produk-detail?idproduct=${val.idproduct}`} style={{textDecoration:"none", color:"black"}}>
                    <Card className='shadow px-2'  style={{background : 'white',border:'none',borderRadius:20}}>
                        <div style={{height:250, justifyContent:'center',display:'flex'}}>
                        <CardImg className='zoom' alt='cardimg' top  src={val.images[0].url} style={{width:"70%",alignSelf:'center',marginTop:'10%',marginBottom:'10%',display:'inline-block',borderRadius:20}}/>
                        </div>
                        <CardBody>
                            <div style={{height:75}}>
                            <CardTitle style={{fontSize:20}} >{val.name}</CardTitle>
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
            btn.push(<Button className='mx-2' 
            disabled={this.state.page=== i + 1 ? true : false} 
            onClick={()=>this.setState({page: i+1})}
            style={{borderRadius:'50%',width:40,height:40,backgroundColor:'#DA0037',border:'none'}}
            >{i+1}</Button>)
        }
        return btn;
    }

    btCari =()=>{
        this.props.productAction({
            name : this.filBrand.value,
            price_min : this.hrgMin.value,
            price_max : this.hrgMax.value
        })
        this.setState({page:1})
    }

    btShowAll = ()=>{
        this.props.productAction()
        this.hrgMax.value=null
        this.hrgMin.value=null
        this.filBrand.value=''
    }

    handleSort =(e)=>{
        this.props.sortAction({
            field : e.target.value.split('-')[0],
            sortType : e.target.value.split('-')[1]
        })
    }

    render() {
        this.props.nav('/produk')
        return ( 
            <div>
                <div className='container rounded align-items-center d-flex shadow my-4' style={{backgroundImage: `url(${carousel})`,height:300,backgroundRepeat:'no-repeat',width:"100%"}}>
                    <p className='h1 m-auto' style={{fontWeight:'bold',color:'black',color:'white',paddingRight:'20%'}}>PRODUCTS</p>
                </div>
                <div className='container'>
                <div className= 'row' style={{marginTop:'5%'}} >
                    <div className='col-md-3'>
                        <Card className='p-3'>
                        <div className='d-flex'>
                            <p className='h5' style={{fontWeight:'700'}}>Filter</p>
                            <span className="material-icons mx-1" style={{color:'#ED1B24'}}>sort</span>
                        </div>
                        <div className='my-2'>
                        <Label for='nm'>Name</Label>
                        <Input id='nm' type='text' placeholder='Search by Product Name' innerRef={(e)=>this.filBrand=e}/>
                        </div>
                        <Label for='hrg'>Harga</Label>
                        <div className='d-flex'>
                            <InputGroup>
                            <Input id='hrg' placeholder='Minimum' className='mx-1' innerRef={(e)=>this.hrgMin=e} type='number'/>
                            <Input placeholder='Maximum' innerRef={(e)=>this.hrgMax=e} type='number'/>
                            </InputGroup>
                        </div>
                        <Label for='id'>Sort</Label>
                        <Input id="sort" type="select" style={{width:"150px"}}  onChange={this.handleSort}>  
                            <option value="harga-asc">Harga Asc</option>
                            <option value="harga-desc">Harga Desc</option>
                            <option value="name-asc">A-Z</option>
                            <option value="name-desc">Z-A</option>
                            <option value="idproduct-asc">Reset</option>
                        </Input>
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
            </div>
         );
    }
}

const mapToProps =(state)=>{
    return{
        product : state.productReducer.product
    }
}
 
export default connect(mapToProps,{productAction,sortAction})(ProductPage);

