import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../electrocare.png'

export const Header = () =>{
    return(
        <>
            <Navbar expand="lg" className="bg-body-light">
                <Container>
                    <Navbar.Brand href="#home">
                        <img alt="logo" src={logo} width="100px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="electrocare" />
                    <Navbar.Collapse id="electrocare">
                    <Nav className="ms-auto">
                        <Nav.Item className='me-2'>
                            <a href={`/services`} className='btn btn-outline-success rounded-5'>Services</a>
                        </Nav.Item>
                        <Nav.Item className='me-2'>
                            <a href="/" className='btn btn-outline-success rounded-5'>Login/ Register</a>
                        </Nav.Item>
                        <Nav.Item className='me-2'>
                            <a href={`/bookings`} className='btn btn-outline-success rounded-5'>View Bookings</a>
                        </Nav.Item>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}