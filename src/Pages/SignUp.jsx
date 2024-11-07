import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from '../../Services/allAPI';
import GAuth from '../Components/GAuth';

function SignUp() {
  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })
  const [emailValid,setEmailValid] = useState(true)
  const [passwordValid,setPasswordValid] = useState(true)
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    const email = e.target.value
    setUserData({...userData,email})
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(regex.test(email)){
      setEmailValid(true)
    }else{
      setEmailValid(false)
    }
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setUserData({...userData,password})
    if(password.length >= 5){
      setPasswordValid(true)
    }else{
      setPasswordValid(false)
    }
  }

  
  const handleSignUp = async (e) => {
    e.preventDefault()
    const {username,email,password} = userData
    if(!username || !email || !password){
      toast.warning('Please fill the form completely')
    }else{
      try {
        const result = await registerAPI(userData)
        if(result.status === 200){
          console.log(result);
          toast.success( 'Account created successfully')
          setUserData({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/sign-in')
          },2000)
        }else{
          toast.warning(result.response.data)
        }
      } catch (err) {
        console.log(err);
        
      }
    }
  }



  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={8} md={6} lg={4} className="d-flex justify-content-center">
          <div
            style={{ height: '430px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
            className="border  rounded p-4 "
          >
            <Form className="h-100">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: 'bold', fontSize: '14px',marginBottom:'0' }}>Username</Form.Label>
                <Form.Control
                 className='inputtags'
                 type="text" 
                 placeholder="username"
                 value={userData.username}
                 onChange={e => setUserData({...userData,username:e.target.value})}
                 />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontWeight: 'bold', fontSize: '14px',marginBottom:'0' }}>Email</Form.Label>
                <Form.Control
                 className='inputtags' 
                 type="email"
                 placeholder="name@example.com"
                 value={userData.email}
                 onChange={handleEmailChange}
                 />
                {!emailValid  && <p style={{ color: 'red', fontSize: '13px' }}>Please enter a valid email </p>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label style={{ fontWeight: 'bold', fontSize: '14px',marginBottom:'0' }}>Password</Form.Label>
                <Form.Control
                className='inputtags' 
                type="password" 
                placeholder="Password"
                value={userData.password}
                onChange={handlePasswordChange}
                />
                {!passwordValid &&  <p style={{ color: 'red', fontSize: '13px' }}>Password must be in 5 character</p>}
              </Form.Group>
              <Button
              style={{ backgroundColor: '#965641', border: 'none' }}
              className="button-style signin-button w-100 mb-3 button-style"
              variant="primary"
              onClick={handleSignUp}
              disabled={!emailValid || !passwordValid}
              >Sign Up
              </Button>
             <GAuth/>
              <span>Have an account? <Link className='text-decoration-none' to={'/sign-in'}>Sign In</Link></span>
            </Form>
          </div>
        </Col>
      </Row>
      <ToastContainer
      autoClose={2000}
      hideProgressBar={true}
      position="top-center"
      />
    </Container>
  );
}

export default SignUp;