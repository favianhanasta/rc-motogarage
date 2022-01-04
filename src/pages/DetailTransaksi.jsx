import axios from 'axios';
import React, { useDebugValue } from 'react';
import { connect } from 'react-redux';
import { Badge, Collapse } from 'reactstrap';
import { API_URL } from '../helper';

class DetailTransaksi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            transaksi : [],
            openCollapse : false,
         }
    }



    componentDidMount(){
        axios.get(`${API_URL}/userTransactions?iduser=${this.props.iduser}`)
        .then((res)=>{
            this.setState({ transaksi : res.data})
        })
    }

    printTransaksi = () =>{
        return this.state.transaksi.map((val,id)=>{
            return(
                <div className='container p-4 shadow mb-4' style={{borderRadius:20}}>
                    <div className='row p-2' >
                        <div className='col-3 ' >
                            <div className='d-flex justify-content-end align-items-center'>
                            <img src={val.detail[0].image} width='40%' style={{marginLeft:'auto'}}/>
                            </div>
                        </div>
                        <div className='col-9 row' >
                            <div className='col-6'>
                            <p style={{fontWeight:'bold',color:'#ED1B24'}}>
                                {val.invoice} <Badge className='mx-4' color='warning' >{val.status}</Badge>
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
                                        <p className='h3 mx-4' style={{fontWeight:"bold"}}>IDR {val.totalPayment.toLocaleString('id-ID')}</p>
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
                            </div>
                        </div>

                    </div>
                </div>
            )
        })
    }

    render() {
        return ( 
            <div className='container'>
                <p className='h3 my-4' style={{fontWeight:'bold'}}>Halaman Transaksi Anda</p>
                {
                    this.state.transaksi ?
                    this.printTransaksi()
                    :
                    null
                }
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