import React from 'react';
import fb from '../assets/fb.png'
import ig from '../assets/ig.png'
import bl from '../assets/buka.png'
import tkp from '../assets/tkp.png'

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div  style={{padding:'3%',background:'black',marginTop:'4%'}}>
                <div className='container-fluid row' style={{margin:'auto'}}>
                    <div className='col-4 d-flex justify-content-end'>
                        <div>
                        <h5 style={{fontWeight:'bold',color:'white'}}>Social Media</h5>
                        <div className='text-center'>
                            <img src={fb} style={{width:'60%'}} />
                            <img src={ig} style={{width:'30%'}} />  
                        </div>
                        </div>
                        <div className='text-center'>
                        <h5 style={{fontWeight:'bold',color:'white'}}>MarketPlace</h5>
                        <div className='text-center'>
                            <img src={bl} style={{width:'50%'}} />
                        </div>
                        <div className='text-center'>
                            <img src={tkp} style={{width:'40%'}} />
                        </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div>
                            <h5 style={{fontWeight:'bold',color:'white'}}>Toko Kami</h5>
                            <p style={{color:'white'}}>RC Motogarage Jakarta <br/><p style={{color:'#969696'}}>Jl. H. Nawi Raya No.45B, RT.6/RW.10, Gandaria Utara, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12420</p></p>
                        </div>
                    </div>
                    <div className='col-4'>
                    <div style={{color:'white'}}>
                        <h5 style={{fontWeight:'bold'}}>Kontak Kami</h5>
                        <div className='d-flex'>
                            <p>WhatsApp <br/> <p style={{color:'#969696'}}>081386727078</p></p>
                            <p className='mx-3'>Line <br/> <p style={{color:'#969696'}}>@rc_motogarage</p></p>
                            <p>Kantor kami <br/> <p style={{color:'#969696'}}>RC Serpong Ruko Medrisio 3, Jl. Boulevard iL Lago No.21, Cihuni, Pagedangan, Tangerang Regency, Banten 15332</p></p>
                        </div>
                        </div>
                    </div>

                </div>
            </div>
         );
    }
}
 
export default FooterComp;