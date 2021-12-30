import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Button, Input, ModalFooter,Col, Row } from 'reactstrap';
import { API_URL } from '../helper';
import { productAction } from '../redux/action';

const ModalDetail = (props)=>{
    let {nama,brand,kategori,harga,deskripsi} = props.detailProduk
    const[inStock,setInStock]=useState([])
    const[inImage,setInImage]=useState([])
    const[inNama,setInNama]=useState('')
    const[inBrand,setInBrand]=useState('')
    const[inKategori,setInKategori]=useState('')
    const[inDeskripsi,setInDeskripsi]=useState('')
    const[inHarga,setInHarga]=useState(null)
    const[visible,setVisible] = useState (true)

    const dispatch = useDispatch()

    const editImage = (e,idx)=>{
        let temp = [...props.detailProduk.image];
        temp[idx]=e.target.value;
        setInImage(temp)
    }

    const stockType = (e,idx) =>{
        const value = e.target.value
        let temp = [...props.detailProduk.stock]
        temp[idx].type=value
        setInStock(temp)
    }
    
    const stockQty = (e,idx) =>{
        const value = e.target.value
        let temp = [...props.detailProduk.stock]
        temp[idx].qty= parseInt(value)
        setInStock(temp)
    }
    
    console.log('m',inImage)
    
    const printImage = () =>{
        if(props.detailProduk.image){
            return props.detailProduk.image.map((val,idx)=>{
                return (
                    <div className='my-2 d-flex'>
                    <div className='mx-3 my-1'>
                        <Input  placeholder={`type-${idx+1}`} type='text' defaultValue={val} disabled={visible} onChange={(e)=>editImage(e,idx)}/>
                    </div>
                    <div className='my-1'>
                        <Button  color='danger'>Delete</Button>
                    </div>
                    </div> 
                )
            })
        }
    }
    const printStock = ()=>{
        if(props.detailProduk.stock){
            return props.detailProduk.stock.map((val,idx)=>{
                return (
                    <Row className='m2-3'>
                    <Col>
                        <Input className='mx-3 my-1' placeholder={`type-${idx+1}`} type='text' defaultValue={val.type} disabled={visible} onChange={(e)=>stockType(e,idx)}/>
                    </Col>
                    <Col>
                        <Input className='mx-3 my-1' placeholder={`qty-${idx+1}`} type='number' defaultValue={val.qty} disabled={visible} onChange={(e)=>stockQty(e,idx)}/>
                    </Col>
                    <Col>
                        <Button className='mx-3 my-1' color='danger'>Delete</Button>
                    </Col>
                    </Row> 
                )
            })
        }
    }
    
    const btnSave = () =>{
        axios.patch(`${API_URL}/products/${props.detailProduk.id}`,{
            nama : inNama,
            brand : inBrand,
            kategori : inKategori,
            deskripsi : inDeskripsi,
            harga : parseInt(inHarga),
            deskripsi : inDeskripsi,
            stock : inStock,
            image : inImage
        })
        .then((res)=>{
            dispatch(productAction())
            props.btCancel()
            setInStock([])
            setInImage([])
            setVisible(true)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    const btEdit = () =>{
        setVisible(!visible)
        setInNama(nama)
        setInBrand(brand)
        setInDeskripsi(deskripsi)
        setInKategori(kategori)
        setInHarga(harga)
        setInStock(props.detailProduk.stock)
        setInImage(props.detailProduk.image)
    }

    return(
        <Modal toggle={()=>props.btCancel()} isOpen={props.openDetail}>
            <ModalHeader toggle={()=>props.btCancel()}>Detail</ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label for='nama'>Nama</Label>
                    <Input id='nama' placeholder='Nama Produk' type='text' onChange={(e)=>setInNama(e.target.value)} defaultValue={nama} disabled={visible}/>
                </FormGroup>
                <FormGroup>
                    <Label for='brand'>Brand</Label>
                    <Input id='brand' placeholder='Brand' type='text' onChange={(e)=>setInBrand(e.target.value)} defaultValue={brand} disabled={visible}/>
                </FormGroup>
                <FormGroup>
                    <Label for='kategori'>Kategori</Label>
                    <Input id='kategori' placeholder='Kategori Produk' type='text' onChange={(e)=>setInKategori(e.target.value)} defaultValue={kategori} disabled={visible}/>
                </FormGroup>
                <FormGroup>
                    <Label for='harga'>Harga</Label>
                    <Input id='harga' placeholder='Harga Produk' type='number' onChange={(e)=>setInHarga(e.target.value)} defaultValue={harga} disabled={visible}/>
                </FormGroup>
                <FormGroup>
                    <Label for='deskripsi'>Deskripsi</Label>
                    <Input id='deskripsi' placeholder='Deskripsi Produk' type='textarea' onChange={(e)=>setInDeskripsi(e.target.value)} defaultValue={deskripsi} disabled={visible}/>
                </FormGroup>
                <FormGroup className='d-flex row'>
                    <Label className='col-3'>Stock</Label>
                        {printStock()}
                </FormGroup>
                <FormGroup className='d-flex row'>
                    <Label className='col-3'>Image</Label>
                        {printImage()}
                           
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                {
                    visible ?
                    <Button color='primary' onClick={btEdit}>Edit</Button>
                    :
                    <Button color='success' onClick={btnSave}>Save</Button>
                }
                <Button color='danger' 
                onClick={()=>{
                    if(visible){
                        props.btCancel()
                    }else{
                        setVisible(!visible)
                    }
                }}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
    }

export default ModalDetail;