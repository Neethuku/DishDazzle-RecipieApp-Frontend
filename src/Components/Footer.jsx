import React from 'react'
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <>
          <div style={{minHeight: '100px',marginTop:'150px'}} className="row w-100 ">
            <div className="col-1"></div>
            <div className="col-4">
            <div><i class="fa-solid fa-utensils"></i><br/></div>
            <Link style={{ color: 'black', textDecoration: 'none' ,fontSize:'25px',letterSpacing:'3px'}} to={'/'}>
              <span><i className="fa-solid fa-d fa-bounce fa-sm"></i></span>ish <span><i className="fa-solid fa-d fa-bounce fa-sm"></i></span>elight
            </Link>
            </div>
            <div style={{ lineHeight: '1.9'}} className="col-2 d-flex flex-column">
              <h6>About</h6>
              <a  style={{textDecoration:'none', color:'black', fontSize:'14px'}}  href="https://react.dev/" target='_blank'>React</a>
              <a  style={{textDecoration:'none', color:'black', fontSize:'14px'}}  href="https://react-bootstrap.netlify.app/" target='_blank'>React Bootstrap</a>
              <a  style={{textDecoration:'none', color:'black', fontSize:'14px'}}  href="https://mui.com/material-ui/" target='_blank'>Material UI</a>
            </div>
            <div style={{ lineHeight: '1.9'}}  className="col-2 d-flex flex-column">
              <h6>Follow Us</h6>
              <a  style={{textDecoration:'none', color:'black', fontSize:'14px'}}  href='https://www.instagram.com/' target='_blank'>Instagram</a>
              <a  style={{textDecoration:'none', color:'black', fontSize:'14px'}}  href='https://www.youtube.com/'target='_blank'>Youtube</a>
              <a  style={{textDecoration:'none', color:'black', fontSize:'14px'}}  href='https://www.github.com/'target='_blank'>Github</a>
              <a  style={{textDecoration:'none', color:'black', fontSize:'14px'}}  href='https://in.linkedin.com/'target='_blank'>LinkedIn</a>
            </div>
            <div style={{ lineHeight: '1.9'}}  className="col-2 d-flex flex-column">
              <h6>Links</h6>
              <Link  style={{textDecoration:'none', color:'black', fontSize:'14px'}} >Home</Link>
              <Link  style={{textDecoration:'none', color:'black', fontSize:'14px'}} >Login</Link>
              <Link  style={{textDecoration:'none', color:'black', fontSize:'14px'}} >Register</Link>
              <Link  style={{textDecoration:'none', color:'black', fontSize:'14px'}} >About</Link>
            </div>
            <div className="col-1"></div>
          </div>
          <hr />
      <div style={{  minHeight: '100px' }} className='row w-100 mb-5'>
        <div className="col-3"></div>
        <div style={{ display: 'flex',flexDirection:'column', alignItems: 'center', justifyContent: 'center' }} className="col-6">
        
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center', gap:'20px'}}>
          <a href='https://www.instagram.com/' target='_blank'><i style={{color:'black'}} class="fa-brands fa-instagram"></i></a>
          <a href='https://www.youtube.com/'target='_blank'><i style={{color:'black'}} class="fa-brands fa-youtube"></i></a>
          <a href='https://www.github.com/'target='_blank'><i style={{color:'black'}} class="fa-brands fa-github"></i></a>
          <a href='https://in.linkedin.com/'target='_blank'><i style={{color:'black'}} class="fa-brands fa-linkedin-in"></i></a>
          </div>
          <p>&copy;Copyright All rights reserved</p>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  )
}

export default Footer