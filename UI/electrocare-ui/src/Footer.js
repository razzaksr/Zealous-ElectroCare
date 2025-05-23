import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from './electrocare.png';
import { Container } from 'react-bootstrap';
const Footer = () => {
  return (
    
    <footer className="bg-dark text-light">
      <Container>
        <div className='row justify-content-between'>
          <div className='col-12 col-md-3 row justify-content-start'>
            <img src={logo} width="100px" className='col-6' />
            <p className="mb-4 col-12">
              Your trusted partner for all electrical services. Professional, reliable and available 24/7.
            </p>
            <div className='mb-2'>
              <a href="#" className='text-light me-4'>
                <Facebook size={20} />
              </a>
              <a href="#" className='text-light me-4'>
                <Twitter size={20} />
              </a>
              <a href="#" className='text-light me-4'>
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div className='col-12 col-md-3 align-self-center'>
            <h3 style={{color:'white'}} className="display-6 mb-4">Services</h3>
            <div className='row'>
              <a className="text-decoration-none text-light mb-2">Electrical Repairs</a>
              <a className="text-decoration-none text-light mb-2">Installations</a>
              <a className="text-decoration-none text-light mb-2">Maintenance</a>
              <a className="text-decoration-none text-light mb-2">Emergency Services</a>
              <a className="text-decoration-none text-light mb-2">Home Automation</a>
            </div>
          </div>

          <div className='col-12 col-md-3 align-self-center'>
            <h3 style={{color:'white'}} className="display-6 mb-4">Quick Links</h3>
            <div className='row'>
              <a className="text-decoration-none text-light mb-2">About Us</a>
              <a className="text-decoration-none text-light mb-2">FAQ</a>
              <a className="text-decoration-none text-light mb-2">Become Partner</a>
              <a className="text-decoration-none text-light mb-2">Career</a>
              <a className="text-decoration-none text-light mb-2">Terms & Policies</a>
            </div>
          </div>
          
          <div className='col-12 col-md-3 align-self-center'>
            <h3 style={{color:'white'}} className="display-6 mb-4">Contact Us</h3>
            <div className='row'>
              <a className="text-decoration-none text-light mb-4">
                <span className="bi bi-geo-alt-fill"> 196/8, Gokulakrishnan street, AVK Nagar, Salem -636004 , Tamilnadu , India</span>
              </a>
              <a className="text-decoration-none text-light mb-4">
                <span className="bi bi-telephone-outbound-fill"> +91 95973 34782</span>
              </a>
              <a className="text-decoration-none text-light mb-4">
                <span className="bi bi-envelope-fill"> reachus@zealoustechcorp.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className='row justify-content-between'>
          <p className='col'>&copy; {new Date().getFullYear()} Zealous Electrocare. All rights reserved.</p>
          <div className='col'>
            <a className="text-decoration-none text-light me-4">Terms of Service</a>
            <a className="text-decoration-none text-light">Privacy Policy</a>
          </div>
        </div>
        </Container>
      </footer>
  )
}
export default Footer;