import axios from 'axios';
import React, { useDebugValue } from 'react';
import { connect } from 'react-redux';
import { Badge, Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { API_URL } from '../helper';

class DetailTransaksi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            transaksi : [],
            openCollapse : false,
            modalOpen : false,
         }
    }



    componentDidMount(){
        this.getData()
    }

    getData= async ()=>{
        await this.props.keeplogin()
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
        .then((res)=>{
            this.setState({ transaksi : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    btBatal = (idx) =>{
        let i = this.state.transaksi[idx].id
        axios.delete(`${API_URL}/userTransactions/${i}`)
        .then((res)=>{
            this.getData()
            this.setState({modalOpen:false})
        }).catch((err)=>{
            console.log(err)
        })
        

    }

    printTransaksi = () =>{
        return this.state.transaksi.map((val,id)=>{
            return(
                <div className='container p-4 shadow mb-4' style={{borderRadius:20}}>
                    <div className='row p-2' >
                        <div className='col-3' style={{borderRightStyle:'solid',borderWidth:'1px',borderColor:'#bdc3c7'}}>
                        <p className='text-center' style={{fontWeight:'bold'}}>Gambar Item</p>
                        <div className='d-flex align-items-center justify-content-center' style={{flexWrap:'wrap'}}>
                            
                                {
                                    val.detail.map((item,i)=>{
                                        return <img src={item.detail.image} width='40%' style={{margin:'auto'}}/>
                                    })
                                }
                        </div>
                        </div>
                        <div className='col-9 row' style={{marginLeft:5}} >
                            <div className='col-6'>
                            <p style={{fontWeight:'bold'}}>
                                {val.invoice} <Badge className='mx-4' color={val.status.includes('Diterima')?'success': val.status.includes('Dibatalkan')?'danger' : 'warning' }>{val.status}</Badge>
                            </p>
                            <p>{val.date}</p>
                            <p style={{fontWeight:'bold'}}>Item :</p>
                            {
                                val.detail.map((item,i)=>{
                                    return <p>{item.nama}<br/><p className='mx-3' style={{color:'#ED1B24'}}>{item.qty} X IDR {item.harga.toLocaleString('id-ID')}</p></p>
                                    })
                            }
                            </div>
                            <div className='col-6'>
                                <div>
                                    <p>Total Pembayaran : <br/>
                                        <p className='h3 mx-4' style={{fontWeight:"bold",color:'#ED1B24'}}>IDR {val.totalPayment.toLocaleString('id-ID')}</p>
                                    </p>
                                </div>
                                <div>
                                    <p>Pembayaran Melalui: <br/>
                                        <img src={
                                            val.metodeBayar == 'bca' ?
                                            "https://statik.tempo.co/data/2019/04/23/id_836405/836405_720.jpg"
                                            : val.metodeBayar == 'gopay' ?
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                                            : "https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_white_bg.png"
                                        } width='30%'/>
                                    </p>
                                </div>
                                <Button color='danger' className='my-2' onClick={()=>this.setState({modalOpen:true})} >Batalkan Pesanan</Button>
                                <Modal isOpen={this.state.modalOpen} toggle={()=>this.setState({modalOpen:false})} centered>
                                    <ModalHeader toggle={()=>this.setState({modalOpen:false})}></ModalHeader>
                                    <ModalBody>
                                        <p>Anda yakin membatalkan pesanan ? </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color='danger' onClick={()=>this.btBatal(id)}>Ya</Button>
                                         <Button color='warning' onClick={()=>this.setState({modalOpen:false})}>Keluar</Button>
                                     </ModalFooter>
                                </Modal>
                            </div>
                        </div>

                    </div>
                </div>
            )
        })
    }

    render() {
        console.log('iduser',this.props.iduser)
        return ( 
            <div className='container'>
                <p className='h3 my-4' style={{fontWeight:'bold'}}>Halaman Transaksi Anda</p>
                {this.printTransaksi()}
            </div>
         );
    }
}

const mapToProps =(state)=>{
    return{
        iduser : state.userReducer.id
    }
}

export default connect(mapToProps) (DetailTransaksi);