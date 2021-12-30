import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormGroup, Modal, ModalBody, ModalHeader, Label, Input, Button, Row, Col, ModalFooter } from 'reactstrap';
import { API_URL } from '../helper';
import {productAction} from '../redux/action'

const ModalAddProduct =(props)=>{
    const[inStock,setInStock]=useState([])
    const[inImage,setInImage]=useState([])
    const[inNama,setInNama]=useState('')
    const[inBrand,setInBrand]=useState('')
    const[inKategori,setInKategori]=useState('')
    const[inDeskripsi,setInDeskripsi]=useState('')
    const[inHarga,setInHarga]=useState(null)
    const addStock = () =>{
        let newStock = {
            id : null,
            type : '',
            qty : null,
        }
        setInStock(inStock.concat([newStock]))
    }

    const addImage = () =>{
        let newImage='';
        setInImage(inImage.concat([newImage]))
    }

    let dispatch = useDispatch()

    const inImageUrl = (e,idx)=>{
        let temp = [...inImage]
        temp[idx]=e.target.value
        setInImage(temp)
    }


    const stockType = (e,idx) =>{
        const value = e.target.value
        let temp = [...inStock]
        temp[idx].type=value
        setInStock(temp)
    }
    const stockQty = (e,idx) =>{
        const value = e.target.value
        let temp = [...inStock]
        temp[idx].qty= parseInt(value)
        setInStock(temp)
    }

    const deleteStock = (idx)=>{
        let arr=[...inStock]
        arr.splice(idx,1)
        console.log('gg',arr)
        setInStock(arr)
    }

    const deleteImg = (idx)=>{
        let arr=[...inImage]
        arr.splice(idx,1)
        console.log('gg',arr)
        setInImage(arr)
    }

    console.log('arr',inHarga)

    const printStock = () =>{
        return inStock.map((val,idx)=>{
            return(
                <Row className='my-3'>
                <Col>
                    <Input className='mx-3 my-1' placeholder={`type-${idx+1}`} type='text' onChange={(e)=>stockType(e,idx)}/>
                </Col>
                <Col>
                    <Input className='mx-3 my-1' placeholder={`qty-${idx+1}`} type='number' onChange={(e)=>stockQty(e,idx)}/>
                </Col>
                <Col>
                    <Button className='mx-3 my-1' color='danger' onClick={()=>deleteStock(idx)}>Delete</Button>
                </Col>
                </Row> 
            )
        })
    }

    const printImage = () =>{
        return inImage.map((val,idx)=>{
            return(
                <Row className='my-3'>
                <Col>
                    <Input className='mx-3 my-1' placeholder={`image-${idx+1}`} type='text' onChange={(e)=>inImageUrl(e,idx)} />
                </Col>
                <Col>
                    <Button className='mx-3 my-1' color='danger' onClick={()=>deleteImg(idx)}>Delete</Button>
                </Col>
                </Row> 
            )
        })
    }

    const btnSave = ()=>{
        axios.post(`${API_URL}/products`,{
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
            setInStock([])
            setInImage([])
            dispatch(productAction())
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    console.log('nm',inStock)
    return (
        <Modal toggle={()=>props.modalAddToggle()} isOpen={props.modalOpenAdd}>
            <ModalHeader toggle={()=>props.modalAddToggle()}>Form Add Product</ModalHeader> 
            <ModalBody>
                <FormGroup>
                    <Label for='nama'>Nama</Label>
                    <Input id='nama' placeholder='Nama Produk' type='text' onChange={(e)=>setInNama(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='brand'>Brand</Label>
                    <Input id='brand' placeholder='Brand' type='text' onChange={(e)=>setInBrand(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='kategori'>Kategori</Label>
                    <Input id='kategori' placeholder='Kategori Produk' type='text' onChange={(e)=>setInKategori(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='harga'>Harga</Label>
                    <Input id='harga' placeholder='Harga Produk' type='number' onChange={(e)=>setInHarga(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label for='deskripsi'>Deskripsi</Label>
                    <Input id='deskripsi' placeholder='Deskripsi Produk' type='textarea' onChange={(e)=>setInDeskripsi(e.target.value)}/>
                </FormGroup>
                <FormGroup className='d-flex row'>
                    <Label className='col-3'>Stock</Label>
                        <div className='col-3 d-flex justify-content-end'>
                            <Button onClick={addStock}>Add</Button>
                        </div>
                        {printStock()}   
                </FormGroup>
                <FormGroup className='d-flex row'>
                    <Label className='col-3'>Image</Label>
                        <div className='col-3 d-flex justify-content-end'>
                            <Button onClick={addImage}>Add</Button>
                        </div>
                        {printImage()}   
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color='success' onClick={btnSave}>Save</Button>
                <Button color='danger' onClick={()=>props.modalAddToggle()}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalAddProduct; 