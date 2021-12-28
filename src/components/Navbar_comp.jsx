import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, Spinner } from 'reactstrap';
import logo from '../assets/rc_logo.png';
import { connect } from 'react-redux';

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            expand : false,
            toggle : false,
         }
    }
    render() { 
        return (
            <div style={{backgroundColor:'black'}}>
            <Navbar expand='md' className='container-fluid pr-0 align-items-center' dark>
                <NavbarBrand>
                    <Link to="/">
                    <img src={logo} width='150px'/>
                    </Link>
                </NavbarBrand>
                <Nav>
                    {
                        this.props.role=='user'?
                        <NavItem >
                            <NavLink href='' style={{color:'white'}}>
                                Cart
                            </NavLink>
                        </NavItem>:null

                    }
                    <NavItem >
                        <NavLink href='' style={{color:'white'}}>
                            Products
                        </NavLink>
                    </NavItem>
                    {
                        this.props.loading?
                        <Spinner animation="border"style={{marginLeft:"auto", marginRight:10}}>
                            Loading..
                        </Spinner>
                        :
                        this.props.username ?
                        <NavItem className="align-items-center" style={{color:'red'}}>
                            <UncontrolledDropdown>
                            <DropdownToggle className='mx-2 d-flex align-items-center' caret nav outline style={{color:'white'}}>Hello, <a style={{color:'#ED1B24'}}>{this.props.username}</a></DropdownToggle>
                            {
                                this.props.role=='user' ?
                                <DropdownMenu end >
                                    <Link to='' style={{textDecoration:'none'}}>
                                        <DropdownItem >
                                            Transaksi Saya
                                        </DropdownItem>
                                    </Link>
                                    <Link to='' style={{textDecoration:'none'}}>
                                        <DropdownItem >
                                            Keluar
                                        </DropdownItem>
                                    </Link>
                                </DropdownMenu>
                                :
                                <DropdownMenu end >
                                    <Link to='' style={{textDecoration:'none'}}>
                                        <DropdownItem >
                                            Manajemen Transaksi
                                        </DropdownItem>
                                    </Link>
                                    <Link to='/manajemen-produk' style={{textDecoration:'none'}}>
                                        <DropdownItem >
                                            Manajemen Produk
                                        </DropdownItem>
                                    </Link>
                                    <Link to='' style={{textDecoration:'none'}}>
                                        <DropdownItem>
                                            Manajemen Artikel
                                        </DropdownItem>
                                    </Link>
                                    <Link to='' style={{textDecoration:'none'}}>
                                        <DropdownItem>
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
                                <Button color='danger' type="button" outline className='px-4'>Login</Button>
                            </Link>
                        </NavItem>
                    }
                </Nav>
            </Navbar>
            </div> 
         );
    }
}

const mapToProps =(state)=>{
    return {
        username : state.userReducer.username,
        role : state.userReducer.role,
    }
}

export default connect(mapToProps)(NavbarComponent);