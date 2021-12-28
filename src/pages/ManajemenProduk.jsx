import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import ModalAddProduct from '../components/ModalAddProduct';

class ManajemenProduk extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalOpenAdd : false
         }
    }


    
    printProductList = ()=>{
        return this.props.product.map((value,index)=>{
            return (
                <tr className='text-center' style={{alignItems:"center"}}>
                    <td style={{color:'red'}}>{index+1}</td>
                    <td style={{width:'15%'}}><img src={value.image[0]} alt="Product" width='100%' /></td>
                    <td>{value.nama}</td>
                    <td>{value.brand}</td>
                    <td>{value.kategori}</td>
                    <td> IDR {(value.harga).toLocaleString('id-ID')}</td>
                    <td style={{width:'10%'}}>
                        <Button type="button" className="m-2" style={{width:100}}>
                            Detail
                        </Button>
                        <Button type="button" color="danger" className="m-2" style={{width:100}}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    modalAddToggle = ()=>{
        this.setState({modalOpenAdd : !this.state.modalOpenAdd})
    }

    

    render() { 
        return ( 
            <div>
                <ModalAddProduct
                    modalOpenAdd = {this.state.modalOpenAdd}
                    modalAddToggle = {this.modalAddToggle}
                />
                <div className='text-center my-4'>
                <h1>
                    Manejemen Produk
                </h1>
                <p className='lead'>Admin Page</p>
                </div>
                <div className='container d-flex justify-content-end py-2' >
                    <Button color='primary' onClick={()=>this.setState({modalOpenAdd : !this.state.modalOpenAdd})}> Add Product</Button>
                </div>
                <div className='container'>
                <Table bordered hover>
                    <thead>
                        <tr style={{fontWeight:'bold'}} className='text-center'>
                            <td>No</td>
                            <td>Gambar Product</td>
                            <td>Nama</td>
                            <td>Brand</td>
                            <td>Kategori</td>
                            <td>Harga</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printProductList()}
                    </tbody>
                </Table>
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

export default connect(mapToProps) (ManajemenProduk);