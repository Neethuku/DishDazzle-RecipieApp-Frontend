import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInAPI } from '../../Services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { currentUserContext } from '../Context API/ContexShare';
import GAuth from '../Components/GAuth';
import { tokenAuthenticationContext } from '../Context API/TokenAuth'


function SignIn() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthenticationContext)
  const [userData,setUserData] = useState({
    email:"",password:""
  })
  const [emailValid,setEmailValid] = useState(true)
  const [passwordValid,setPasswordValid] = useState(true)
  const [signinSuccess,setsignInSuccess] = useState(false)
  const {currentUser,setCurrentUser} = useContext(currentUserContext)
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

  const handleSignIn = async(e) => {
    e.preventDefault()
    const {email,password} = userData
    if(!email || !password){
      toast.error('Please fill the form completely')
    }else{
      try {
        const result = await signInAPI({email,password})
      console.log(result);
      if(result.status === 200){
        console.log(result);     
        sessionStorage.setItem("username",result.data.userDetails.username)
        sessionStorage.setItem("token",result.data.token)
        sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
        setCurrentUser(result.data.userDetails)
        setIsAuthorized(true)
        setUserData({email:"",password:""})
        setsignInSuccess(true)
        if (result.data.userDetails.isAdmin) {
          navigate('/dashboard?tab=profile');
        } else {
          setTimeout(()=>{
            navigate('/')
          },1000)
        }

       
      }else{
        toast.error(result.response.data)
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
          style={{ height: '380px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
          className="border  rounded p-4 "
        >
          <Form className="h-100">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontWeight: 'bold', fontSize: '14px',marginBottom:'0' }}>Email</Form.Label>
              <Form.Control 
              className='inputtags' 
              type="email" 
              placeholder="name@example.com"
              onChange={handleEmailChange}
              />
              {!emailValid && <p style={{ color: 'red', fontSize: '13px' }}>Please enter a valid email </p>}
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput2">
              <Form.Label style={{ fontWeight: 'bold', fontSize: '14px',marginBottom:'0' }}>Password</Form.Label>
              <Form.Control 
              className='inputtags' 
              type="password" 
              placeholder="Password"
              onChange={handlePasswordChange}
              />
              {!passwordValid && <p style={{ color: 'red', fontSize: '13px' }}>Password must be in 5 character</p>}
            </Form.Group>
            {signinSuccess? <Button 
            variant="primary"
            style={{ backgroundColor: '#965641', border: 'none' }} 
            className="button-style signin-button w-100 mb-4 button-style" 
            disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{marginRight:"7px"}}
        />
        Sign In...
      </Button>: <Button 
            style={{ backgroundColor: '#965641', border: 'none' }} 
            className="button-style signin-button w-100 mb-4 button-style" 
            variant="primary"
            disabled={!emailValid || !passwordValid}
            onClick={handleSignIn}
            >Sign In
            </Button>}

           <GAuth/>
            <span>Have an account? <Link className='text-decoration-none' to={'/sign-up'}>Sign Up</Link></span>
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

export default SignIn;