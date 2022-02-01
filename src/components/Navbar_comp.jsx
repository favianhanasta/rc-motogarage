import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, Spinner, Badge } from 'reactstrap';
import logo from '../assets/rc.png';
import rc_logo from '../assets/rc_logo.png';
import { connect } from 'react-redux';
import { logoutAction } from '../redux/action';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            expand : false,
            toggle : false,
            navbar : false,
            nav : ''
         }     
    }

    componentDidMount(){
        window.addEventListener('scroll', this.changeBackground)
    }
    
    changeBackground = () =>{
        if(window.scrollY >= 80){
            this.setState({navbar:true})
        }else{
            this.setState({navbar:false})
        }
    }

    render() {
        
        return (
            <nav className={ this.props.path == '/'?  this.state.navbar ? 'navbar active home container-fluid ' : 'navbar home container-fluid' : 'navbar container-fluid '} >
                <NavbarBrand style={{marginLeft:'10%'}} onClick={()=>this.props.nav('/')}>
                    <Link to="/">
                        { this.props.path == '/'? <img src={logo} width='100px'/> : <img src={rc_logo} width='30%'/> }
                    </Link>
                </NavbarBrand>
                <Nav>
                <NavItem >
                    <Link  to='/produk' style={{textDecoration:'none'}}>
                    <NavLink style={{color:'white'}} onClick={()=>this.props.nav('/produk')}>
                        Products
                    </NavLink>
                    </Link>
                </NavItem>
                    {
                        this.props.role=='user'?
                        <NavItem >
                            <Link  to='/cart-page' style={{textDecoration:'none'}}>
                            <NavLink href='' style={{color:'white'}} onClick={()=>this.props.nav('/cart-page')}>
                                Cart {
                                    this.props.cart.length > 0 &&
                                    <Badge color='danger'>{this.props.cart.length}</Badge>
                                }
                            </NavLink>
                            </Link>
                        </NavItem>:null

                    }
                    {
                        this.props.loading?
                        <Spinner animation="border"style={{marginLeft:"auto", marginRight:10}}>
                            Loading..
                        </Spinner>
                        :
                        this.props.username ?
                        <NavItem className="align-items-center">
                            <UncontrolledDropdown>
                            <DropdownToggle className='mx-2 d-flex align-items-center' caret nav outline style={{color:'White'}}>Hello, <span className='mx-2' style={{color:'#ED1B24',fontWeight:"bold"}}> {this.props.username}</span></DropdownToggle>
                            {
                                this.props.role=='user' ?
                                <DropdownMenu end>
                                    <Link to='/detailTransaksi-page' style={{textDecoration:'none'}}>
                                        <DropdownItem style={{color:'black'}} onClick={()=>this.props.nav('/detailTransaksi-page')}>
                                            Transaksi Saya
                                        </DropdownItem>
                                    </Link>
                                    <Link to=''style={{textDecoration:'none'}}>
                                        <DropdownItem onClick={()=>{
                                                localStorage.removeItem("data");
                                                this.props.logoutAction()
                                                window.location.assign("/")}}>
                                            Keluar
                                        </DropdownItem>
                                    </Link>
                                </DropdownMenu>
                                :
                                <DropdownMenu end>
                                    <Link to='/manajemen-transaksi' style={{textDecoration:'none'}}>
                                        <DropdownItem onClick={()=>this.props.nav('/manajemen-transaksi')}>
                                            Manajemen Transaksi
                                        </DropdownItem>
                                    </Link>
                                    <Link to='/manajemen-produk' style={{textDecoration:'none'}}>
                                        <DropdownItem onClick={()=>this.props.nav('/manajemen-produk')}>
                                            Manajemen Produk
                                        </DropdownItem>
                                    </Link>
                                    <Link to='/manajemen-artikel' style={{textDecoration:'none'}}>
                                        <DropdownItem onClick={()=>this.props.nav('/manajemen-artikel')}>
                                            Manajemen Artikel
                                        </DropdownItem>
                                    </Link>
                                    <Link to='/' style={{textDecoration:'none'}}>
                                        <DropdownItem onClick={()=>{
                                                localStorage.removeItem("data");
                                                this.props.logoutAction()
                                                window.location.assign("/")}}>
                                            Keluar
                                        </DropdownItem>
                                    </Link>
                                </DropdownMenu>

                            }
                            </UncontrolledDropdown>
                        </NavItem>
                        :
                        <NavItem>
                            <Link to='/auth-page'>
                                <Button color='danger' type="button" outline className='px-4' onClick={()=>this.props.nav('/auth-page')}>Login</Button>
                            </Link>
                        </NavItem>
                    }
                </Nav>
            </nav>
         );
    }
}

const mapToProps =(state)=>{
    return {
        username : state.userReducer.username,
        role : state.userReducer.role,
        cart : state.userReducer.cart,
    }
}

export default connect(mapToProps,{logoutAction})(NavbarComponent);