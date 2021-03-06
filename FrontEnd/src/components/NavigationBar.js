import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

import React from 'react'

const NavigationBar = () => {
    return (
        <Navbar bg="white" expand="lg" style = {{width:"100%", WebkitBoxShadow:"0px 1px 1px #a3aaaf",MozBoxShadow:"0px 1px 1px #a3aaaf",boxShadow:"0px 1px 1px #a3aaaf"}}>
            <Container style={{paddingLeft:120}}>
                <Navbar.Brand href="#home">QA Webname</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
}

export default NavigationBar
