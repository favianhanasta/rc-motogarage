import React, { useState } from 'react';
import { FormGroup, Modal, ModalBody, ModalHeader, Label, Input, Button, Row, Col } from 'reactstrap';

const ModalAddProduct =(props)=>{

    const[inStock,setInStock]=useState([])

    const addStock = () =>{
        let newStock = {
            id : null,
            type : '',
            qty : null,
        }
        setInStock(inStock.concat([newStock]))
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
        let arr = inStock
        arr.splice(idx,1)
        setInStock(arr)
    }
    
    return (
        <Modal toggle={()=>props.modalAddToggle()} isOpen={props.modalOpenAdd}>
            <ModalHeader toggle={()=>props.modalAddToggle()}>Form Add Product</ModalHeader> 
            <ModalBody>
                <FormGroup>
                    <Label for='nama'>Nama</Label>
                    <Input id='nama' placeholder='Nama Produk' type='text'/>
                </FormGroup>
                <FormGroup>
                    <Label for='brand'>Brand</Label>
                    <Input id='brand' placeholder='Brand' type='text'/>
                </FormGroup>
                <FormGroup>
                    <Label for='kategori'>Kategori</Label>
                    <Input id='kategori' placeholder='Kategori Produk' type='text'/>
                </FormGroup>
                <FormGroup>
                    <Label for='harga'>Harga</Label>
                    <Input id='harga' placeholder='Harga Produk' type='number'/>
                </FormGroup>
                <FormGroup>
                    <Label for='deskripsi'>Deskripsi</Label>
                    <Input id='deskripsi' placeholder='Deskripsi Produk' type='textarea'/>
                </FormGroup>
                <FormGroup className='d-flex row'>
                    <Label className='col-3'>Stock</Label>
                        <div className='col-3 d-flex justify-content-end'>
                            <Button onClick={addStock}>Add</Button>
                        </div>
                        {
                            inStock.map((val,idx)=>
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
                        }
                        
                </FormGroup>
            </ModalBody>
        </Modal>
    )
}

export default ModalAddProduct 