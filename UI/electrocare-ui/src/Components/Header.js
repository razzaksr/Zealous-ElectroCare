import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../electrocare.png'

export const Header = () =>{
    return(
        <>
            <Navbar expand="lg" className="bg-body-light">
                <Container>
                    <Navbar.Brand href="/">
                        <img alt="logo" src={logo} width="100px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="electrocare" />
                    <Navbar.Collapse id="electrocare">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Item className='mb-2 mb-md-0 me-2'>
                            <a href={`/services`} className='btn btn-outline-success rounded-5'>Services</a>
                        </Nav.Item>
                        {(localStorage.getItem('logged'))?
                            <>
                                <Nav.Item className='mb-2 mb-md-0 me-2'>
                                    <a href={`/bookings`} className='btn btn-outline-success rounded-5'>View Bookings</a>
                                </Nav.Item>
                                <Nav.Item className='mb-2 mb-md-0 me-2'>
                                    <button onClick={()=>{
                                        localStorage.removeItem("logged")
                                        localStorage.removeItem("username")
                                        window.location.assign("/")
                                    }} className='btn btn-outline-success rounded-5'>Logout</button>
                                </Nav.Item>
                                <Nav.Item className='mb-2 mb-md-0 me-2 text-success'>
                                    <h5>Welcome back, {localStorage.getItem('username')}</h5>
                                </Nav.Item>
                            </>:
                            <>
                                <Nav.Item className='mb-2 mb-md-0 me-2'>
                                    <a href="/login" className='btn btn-outline-success rounded-5'>Login/ Register</a>
                                </Nav.Item>
                            </>
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}