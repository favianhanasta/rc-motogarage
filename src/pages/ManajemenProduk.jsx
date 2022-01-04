import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import ModalAddProduct from '../components/ModalAddProduct';
import ModalDetail from '../components/ModalDetail';
import { API_URL } from '../helper';
import { productAction } from '../redux/action';

class ManajemenProduk extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalOpenAdd : false,
            openDetail : false,
            detailProduk : {}
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
                        <Button type="button" className="m-2" style={{width:100}} onClick={()=>this.detailToggle(value)}>
                            Detail
                        </Button>
                        <Button type="button" color="danger" className="m-2" style={{width:100}} onClick={()=>this.btDelete(index)} >
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

    detailToggle = (val) =>{
        this.setState({
            detailProduk : val,
            openDetail : !this.state.openDetail,
        })
    }
    
    btCancel = ()=>{
        this.setState({
            openDetail : !this.state.openDetail,
        })
    }

    btDelete = (index) =>{
        let id =  this.props.product[index].id;
        axios.delete(`${API_URL}/products/${id}`)
        .then((res)=>{
            this.props.productAction()
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    
    render() { 
        console.log('id',this.state.detailProduk)
        return ( 
            <div>
                <ModalAddProduct
                    modalOpenAdd = {this.state.modalOpenAdd}
                    modalAddToggle = {this.modalAddToggle}
                />
                <ModalDetail
                    detailToggle = {this.detailToggle}
                    openDetail={this.state.openDetail}
                    detailProduk={this.state.detailProduk}
                    btCancel={this.btCancel}
                />
                <div className='text-center my-4'>
                <h1>
                    Manajemen Produk
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

export default connect(mapToProps,{productAction}) (ManajemenProduk);