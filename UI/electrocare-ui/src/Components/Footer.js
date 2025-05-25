import { Facebook, Twitter, Instagram} from 'lucide-react';
import logo from '../electrocare.png';
import { Container } from 'react-bootstrap';
const Footer = () => {
  return (
    
    <footer className="bg-dark text-light">
      <Container>
        <div className='row justify-content-between'>
          <div className='col-12 col-md-3 row justify-content-start mb-md-0 mb-3'>
            <img src={logo} alt="logo" width="100px" className='col-12 col-md-6' />
            <p className="mb-4 col-12 text-md-start text-center">
              Your trusted partner for all electrical services. Professional, reliable and available 24/7.
            </p>
            <div className='mb-2 text-md-start text-center'>
              <a href="/" className='text-light me-4'>
                <Facebook size={20} />
              </a>
              <a href="/" className='text-light me-4'>
                <Twitter size={20} />
              </a>
              <a href="/" className='text-light me-4'>
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div className='col-12 col-md-3 align-self-center mb-md-0 mb-3'>
            <h3 style={{color:'white'}} className="display-6 mb-4 text-md-start text-center">Services</h3>
            <div className='row'>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Electrical Repairs</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Installations</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Maintenance</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Emergency Services</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Home Automation</a>
            </div>
          </div>

          <div className='col-12 col-md-3 align-self-center mb-md-0 mb-3'>
            <h3 style={{color:'white'}} className="display-6 mb-4 text-md-start text-center">Quick Links</h3>
            <div className='row'>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">About Us</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">FAQ</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Become Partner</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Career</a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-2">Terms & Policies</a>
            </div>
          </div>
          
          <div className='col-12 col-md-3 align-self-center'>
            <h3 style={{color:'white'}} className="display-6 mb-4 text-md-start text-center">Contact Us</h3>
            <div className='row'>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-4">
                <span className="bi bi-geo-alt-fill"> 196/8, Gokulakrishnan street, AVK Nagar, Salem -636004 , Tamilnadu , India</span>
              </a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-4">
                <span className="bi bi-telephone-outbound-fill"> +91 95973 34782</span>
              </a>
              <a href="/" className="text-decoration-none text-light text-md-start text-center mb-4">
                <span className="bi bi-envelope-fill"> reachus@zealoustechcorp.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className='row justify-content-between text-md-start text-center'>
          <p className='col-12 col-md-6'>&copy; {new Date().getFullYear()} Zealous Electrocare. All rights reserved.</p>
          <div className='col-12 col-md-6'>
            <a href="/" className="text-decoration-none text-light me-4">Terms of Service</a>
            <a href="/" className="text-decoration-none text-light">Privacy Policy</a>
          </div>
        </div>
        </Container>
      </footer>
  )
}
export default Footer;