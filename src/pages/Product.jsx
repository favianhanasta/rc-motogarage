import React from 'react';
import { connect } from 'react-redux';
import { Card, CardImg,CardText, CardBody, CardTitle, Button, CardFooter } from 'reactstrap';
import carousel from '../assets/carousel_product.png'

class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            product:[]
         }
    }

    printProduct = () =>{
        return this.props.product.map((val,idx)=>{
            return (
                <div className='my-3 col-md-3'>
                    <Card className='shadow px-2'>
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
                            <CardText className='d-flex justify-content-end'><p style={{cursor:'pointer'}}>View Detail</p></CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        })
    }

    render() { 
        return ( 
            <div className='container'>
                <div className='my-3 container rounded align-items-center d-flex shadow' style={{backgroundImage: `url(${carousel})`,height:300,backgroundRepeat:'no-repeat'}}>
                    <p className='h1 m-auto' style={{fontWeight:'bold',color:'black',color:'white',paddingRight:'20%'}}>PRODUCTS</p>
                </div>
                    <div className= 'row' >
                        {this.printProduct()}
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
 
export default connect(mapToProps)(ProductPage);