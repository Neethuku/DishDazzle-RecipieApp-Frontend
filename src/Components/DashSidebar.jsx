import React, { useContext, useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { currentUserContext } from '../Context API/ContexShare';
import { RiLogoutCircleRFill } from "react-icons/ri";
import { RiRestaurant2Fill } from "react-icons/ri";
import { FaDeleteLeft } from "react-icons/fa6";
import { deleteAccountAPI } from '../../Services/allAPI';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiPieChartFill } from "react-icons/ri";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";




function DashSidebar() {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(currentUserContext)
  const [show, setShow] = useState(false);
  const [tab,setTab] = useState('')
  const location = useLocation()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  const handleLogOut = () => {
    sessionStorage.removeItem('userDetails')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    setCurrentUser(null)
    navigate('/sign-in')
  }

  const handleDeleteAccount = async () => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const reqBody = {
        userId: currentUser._id
      }
      try {
        const result = await deleteAccountAPI(reqBody, reqHeader)
        if (result.status === 200) {
          sessionStorage.removeItem('userDetails')
          handleClose()
          setCurrentUser(null)
          navigate('/sign-up')
        }
      } catch (error) {

      }
    }
  }
  return (
    <div className="sidebar">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"> Are you sure you want to delete your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All your posts, comments, and likes will be permanently deleted
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" className='deleteBtn' onClick={handleDeleteAccount}>Delete</Button>
        </Modal.Footer>
      </Modal>


      <Nav defaultActiveKey="/home" className="flex-column mt-4">
       
          {!currentUser?.isAdmin?
          (
            <Nav.Link
          className='navbtn'
          onClick={handleShow}>
          <FaDeleteLeft size={20} className='me-2' />Delete<span style={{ marginLeft: '5px' }}>Account</span>
        </Nav.Link>
          ): 
         
          <Nav.Link as={Link} to={'/dashboard?tab=profile'} className='navbtn' active={tab === 'profile' || !tab}>
          <FaUser size={20} className='me-2' />Admin Profile
        </Nav.Link>
        
    
        }
          {currentUser?.isAdmin?
          (
            <>
              <Nav.Link as={Link} to={'/dashboard?tab=dash'} className='navbtn' active={tab === 'dash' || !tab}>
          <RiPieChartFill size={20} className='me-2' />Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to={'/dashboard?tab=users'} className='navbtn' active={tab === 'users' || !tab}>
          <PiUsersThreeFill size={20} className='me-2' />Users
        </Nav.Link>
        <Nav.Link as={Link} to={'/dashboard?tab=posts'} className='navbtn' active={tab === 'posts' || !tab}>
          <IoDocumentText size={20} className='me-2' />Posts
        </Nav.Link>
        <Nav.Link as={Link} to={'/dashboard?tab=comments'} className='navbtn' active={tab === 'comments' || !tab}>
          <BiSolidCommentDetail size={20} className='me-2' />Comments
        </Nav.Link>
       
        
    </>
          ):null
          }

        <Nav.Link onClick={handleLogOut} className='navbtn'><RiLogoutCircleRFill size={20} className='me-2' />
          Logout</Nav.Link>
      </Nav>
    
    </div>
  );
}

export default DashSidebar;