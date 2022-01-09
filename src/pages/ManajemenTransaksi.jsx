import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Badge, Button,Card,Label,Input } from 'reactstrap';
import { API_URL } from '../helper';

class ManajemenTransaksi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            transaksi : [],
            openCollapse : false,
            inDate : '',
            filterStatus : '',
         }
    }



    componentDidMount(){
        this.getData()
    }

    getData=()=>{
        axios.get(`${API_URL}/userTransactions?`)
        .then((res)=>{
            this.setState({ transaksi : res.data})
        })
    }

    btCari=()=>{
        if(this.filInvoice.value){
            axios.get(`${API_URL}/userTransactions?invoice=${this.filInvoice.value}`)
                .then((res)=>{
                    this.setState({ transaksi : res.data})
                })
                .catch((err)=>{
                    console.log(err)
                })
        }else if (this.state.filterStatus){
            axios.get(`${API_URL}/userTransactions?status=${this.state.filterStatus}`)
                .then((res)=>{
                    this.setState({ transaksi : res.data})
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
    }

    btnFilterStatus = (status) =>{
        return this.setState({filterStatus : status})
    }
    
    btShowAll= async ()=>{
        this.getData()
        this.filInvoice.value=''
        this.setState({filterStatus:''})
     }

    btTerima = (id,confirm) =>{
        axios.patch(`${API_URL}/userTransactions/${id}`,{status:confirm})
        .then((res)=>{
            this.getData()
        })
        .catch((err)=>{
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
                                        return <img src={item.detail.image[0]} width='40%' style={{margin:'auto'}}/>
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
                                <div className='d-flex'>
                                    <p>Total Pembayaran : <br/>
                                        <p className='h3 mx-4' style={{fontWeight:"bold",color:'#ED1B24'}}>IDR {val.totalPayment.toLocaleString('id-ID')}</p>
                                    </p>
                                    <p style={{marginLeft:'auto',fontWeight:'bold'}}>user : {val.username}</p>
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
                                <div style={{display:'flex',justifyContent:'space-around'}}>
                                    <Button color='danger' className='my-2' onClick={()=>this.btTerima(val.id,'Pesanan Dibatalkan')}>Batalkan Pesanan</Button>
                                    <Button color='success' className='my-2' onClick={()=>this.btTerima(val.id,'Pesanan Diterima')}>Terima Pesanan</Button>

                                </div>
                                
                            </div>
                        </div>

                    </div>
                </div>
            )
        })
    }

    render() {
        this.props.nav('./manajemen-transaksi')
        return ( 
            <div className='container-fluid'>
                <p className='h3 my-4' style={{fontWeight:'bold'}}>Halaman Transaksi Anda</p>
                <div className='row'>
                    <div className='col-md-3'>
                    <Card className='p-3'>
                        <div className='d-flex'>
                            <p className='h5' style={{fontWeight:'700'}}>Filter</p>
                            <span className="material-icons mx-1" style={{color:'#ED1B24'}}>sort</span>
                        </div>
                        <div className='my-2'>
                        <Label for='nm'>Invoice</Label>
                        <Input id='nm' type='text' placeholder='Search by Invoice' innerRef={(e)=>this.filInvoice=e}/>
                        </div>
                        <div className='my-2'>
                        <Label for='nm'>Status</Label>
                        <div>
                            <Button  className='w-75' onClick={()=>this.btnFilterStatus('Menunggu Konfirmasi')} color='warning' outline>Menunggu Konfirmasi</Button>
                            <Button className='my-2 w-75' onClick={()=>this.btnFilterStatus('Pesanan Diterima')} color='success' outline>Pesanan Diterima</Button>
                            <Button  className='w-75' onClick={()=>this.btnFilterStatus('Pesanan Dibatalkan')} color='danger' outline>Pesanan Dibatalkan</Button>
                        </div>

                        {/* <Input id='nm' type='text' placeholder='Search by Invoice' innerRef={(e)=>this.filStatus=e}/> */}
                        </div>
                        {/* <div className='my-2'>
                        <Label for='nm'>Date</Label>
                        <Input id='nm' type='date' placeholder='Search by Invoice' onChange={(e)=>this.setState({inDate:e.target.value})}/>
                        </div> */}
                        <Button className='my-3' color='primary' onClick={this.btCari}>Cari</Button>
                        <Button color='primary' outline onClick={this.btShowAll}>Tampilkan Semua</Button>
                        </Card>
                    </div>
                    <div className='col-md-9'>
                        {this.printTransaksi()}
                    </div>

                </div>
            </div>
         );
    }
}

const mapToProps =(state)=>{
    return{
        iduser : state.userReducer.id
    }
}

export default connect(mapToProps) (ManajemenTransaksi);