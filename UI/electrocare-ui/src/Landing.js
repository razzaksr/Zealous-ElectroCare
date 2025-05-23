import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from './electrocare.png'
import Footer from './Footer'
export const Landing = () =>{
    return(
        <>
            <Navbar expand="lg" className="bg-body-light">
                <Container>
                    <Navbar.Brand href="#home">
                        <img src={logo} width="100px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="electrocare" />
                    <Navbar.Collapse id="electrocare">
                    <Nav className="ms-auto">
                        <Nav.Link>
                            <a className='btn btn-outline-success rounded-5'>Services</a>
                        </Nav.Link>
                        <Nav.Link>
                            <a className='btn btn-outline-success rounded-5'>Login/ Register</a>
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Footer/>
        </>
    )
}