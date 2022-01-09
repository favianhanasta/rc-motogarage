import axios from 'axios';
import React from 'react';
import { Button, FormGroup, Input, InputGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import logo from '../assets/rc.png';
import { API_URL } from '../helper';

 class ManajemenArtikel extends React.Component {
     constructor(props) {
         super(props);
         this.state = { 
             modalOpen:false,
          }
     }

     componentDidMount(){
        this.props.nav('/manajemen-artikel')
     }

     btnSubmit = () =>{
        let data = {
            judul : this.inJudul.value,
            image : this.inImage.value,
            sumber : this.inSumber.value,
            penulis : this.inPenulis.value,
            date : this.inWaktu.value,
            berita : this.inBerita.value,
        }
        axios.post(`${API_URL}/artikel`,data)
        .then((res)=>{
            this.inJudul.value=''
            this.inImage.value=''
            this.inSumber.value=''
            this.inPenulis.value=''
            this.inWaktu.value=''
            this.inBerita.value=''
            this.setState({modalOpen:true})
        })
        .catch((err)=>{
            console.log(err)
        })
     }

     render() {
         return ( 
             <div className='container my-4 shadow p-4' style={{borderRadius:20}}>
                 <Modal isOpen={this.state.modalOpen} toggle={()=>this.setState({modalOpen:false})}>
                     <ModalHeader toggle={()=>this.setState({modalOpen:false})}></ModalHeader>
                     <ModalBody>
                         <h5>Artikel Berhasil Ditambahkan</h5>
                     </ModalBody>
                 </Modal>
                 <div className='d-flex my-2'>
                    <p className='h2 my-4 text-center mx-3' style={{fontWeight:'bold'}}>
                        Manajemen Artikel
                    </p>
                    <img src={logo} width='10%' style={{marginLeft:'auto'}}/>
                    
                 </div>
                 <div style={{width:'75%',margin:'auto'}}>
                 <FormGroup>
                    <Label for='judul'>Judul Berita</Label>
                    <Input id='judul' type='text' innerRef={(e)=>this.inJudul=e} />
                 </FormGroup>
                 <FormGroup>
                    <Label for='image'>Gambar Berita</Label>
                    <Input id='image' type='text' innerRef={(e)=>this.inImage=e} />
                 </FormGroup>
                 <FormGroup>
                    <Label for='sumber'>Sumber Berita</Label>
                    <Input id='sumber' type='text' innerRef={(e)=>this.inSumber=e} />
                 </FormGroup>
                 <FormGroup>
                    <Label for='penulis'>Penulis Berita</Label>
                    <Input id='penulis' type='text' innerRef={(e)=>this.inPenulis=e}/>
                 </FormGroup>
                 <FormGroup>
                    <Label for='date'>Waktu Berita</Label>
                    <Input id='date' type='text' innerRef={(e)=>this.inWaktu=e} />
                 </FormGroup>
                 <FormGroup>
                    <Label for='berita'>Deskripsi Berita</Label>
                    <Input id='berita' type='textarea' style={{height:350 }} innerRef={(e)=>this.inBerita=e} />
                 </FormGroup>
                 <Button type='button' onClick={this.btnSubmit}>Submit</Button>

                 </div>
                 </div>
          );
     }
 }
  
 export default ManajemenArtikel;