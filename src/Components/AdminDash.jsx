import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { PiUsersThree } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LiaCommentsSolid } from "react-icons/lia";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { currentUserContext } from '../Context API/ContexShare';
import { getAllCommentsAPI, getAllPostsAPI, getAllUsersAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';
import profileImage from '../assets/profileimage.jpg'



function AdminDash() {
  const { currentUser, setCurrentUser } = React.useContext(currentUserContext)
  const [getAllUsers, setGetAllUsers] = useState('')
  const [totalUsers, setTotalUsers] = useState('')
  const [getAllPosts, setGetAllPosts] = useState('')
  const [totalPosts, setTotalPosts] = useState('')
  const [getAllComments, setGetAllComments] = useState('')
  const [totalComments, setTotalComments] = useState('')
  const admin = currentUser.isAdmin
  console.log(getAllPosts);

  useEffect(() => {
    fetchUsers()
    fetchPosts()
    fetchComments()
  }, [])



  const fetchUsers = async () => {
    const token = sessionStorage.getItem('token')
    const limit = 4;
    if (admin && token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const queryParams = new URLSearchParams({
        admin: true,
        limit: limit
      })
      try {
        const result = await getAllUsersAPI(queryParams, reqHeader)
        setGetAllUsers(result.data.allUsers)
        setTotalUsers(result.data.totalUsers)
      } catch (error) {
        console.log(error);

      }
    }

  }


  const fetchPosts = async () => {
    const token = sessionStorage.getItem('token')
    const limit = 3;
    if (admin && token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const queryParams = new URLSearchParams({
        admin: true,
        limit: limit
      })
      try {
        const result = await getAllPostsAPI(queryParams, reqHeader)
        setGetAllPosts(result.data.allPosts)
        setTotalPosts(result.data.totalPosts)
      } catch (error) {
        console.log(error);

      }
    }

  }


  const fetchComments = async () => {
    const token = sessionStorage.getItem('token')
    const limit = 5;
    if (admin && token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const queryParams = new URLSearchParams({
        admin: true,
        limit: limit
      })
      try {
        const result = await getAllCommentsAPI(queryParams, reqHeader)
        setGetAllComments(result.data.allComments)
        setTotalComments(result.data.totalComments)
      } catch (error) {
        console.log(error);

      }
    }

  }
  return (
    <div className="container">
      <div className="row w-100 d-flex align-items-center justify-content-between mt-5">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <Card className="shadow-sm mx-auto" style={{ width: '80%', height: '130px', backgroundColor: '#965641', color: 'white' }}>
            <Card.Body className='d-flex align-items-center justify-content-center'>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title style={{ fontSize: '26px', fontWeight: 'bold' }}>{totalUsers}</Card.Title>
                <Card.Text>Total Users</Card.Text>
              </div>
              <div>
                <PiUsersThree size={50} style={{ marginLeft: '20px' }} />

              </div>

            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <Card className="shadow-sm mx-auto" style={{ width: '80%', height: '130px', backgroundColor: '#965641', color: 'white' }}>
            <Card.Body className="d-flex  align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title style={{ fontSize: '26px', fontWeight: 'bold' }}>{totalPosts}</Card.Title>
                <Card.Text>Total Posts</Card.Text>
              </div>
              <div>
                <IoDocumentTextOutline size={50} style={{ marginLeft: '20px' }} />

              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <Card className="shadow-sm mx-auto" style={{ width: '80%', height: '130px', backgroundColor: '#965641', color: 'white' }}>
            <Card.Body className='d-flex align-items-center justify-content-center'>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title style={{ fontSize: '26px', fontWeight: 'bold' }}>{totalComments}</Card.Title>
                <Card.Text>Total Comments</Card.Text>
              </div>
              <div>
                <LiaCommentsSolid size={50} style={{ marginLeft: '20px' }} />

              </div>

            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row w-100 d-flex align-items-center justify-content-between mt-5 ms-4">
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5>All Users</h5>
            <Link to={'/dashboard?tab=users'}>
              <button
                variant="outline-primary"
                size="sm"
                style={{ marginRight: '80px' }}
                className='viewAll-btn'>
                View All
              </button>
            </Link>

          </div>
          <TableContainer sx={{ width: '80%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Profile</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Username</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getAllUsers && getAllUsers.length > 0 ? (
                  getAllUsers.map((user, index) => (
                    <TableRow key={user._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <img
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '50%'
                          }}
                          src={user?.profile ? `${SERVER_URL}/uploads/${user.profile}` : profileImage}
                          alt=""
                        />
                      </TableCell>            <TableCell>{user.username}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>No users yet</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5>All Posts</h5>
            <Link to={'/dashboard?tab=posts'}>
              <button
                variant="outline-primary"
                size="sm"
                style={{ marginRight: '80px' }}
                className='viewAll-btn'>View All</button>
            </Link>
          </div>
          <TableContainer sx={{ width: '80%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Image</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getAllPosts && getAllPosts.length > 0 ? (
                  getAllPosts.map((post, index) => (
                    <TableRow key={post._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={`/view/${post._id}`}>
                          <img style={{ width: '80px', height: '80px', objectFit: 'cover' }} src={`${SERVER_URL}/uploads/${post?.postImage}`} alt="" />
                        </Link>
                      </TableCell>
                      <TableCell>{post.title}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>No users yet</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5>All Comments</h5>
            <Link to={'/dashboard?tab=comments'}>
              <button
                variant="outline-primary"
                size="sm"
                style={{ marginRight: '80px' }}
                className='viewAll-btn'>View All</button>
            </Link>
          </div>
          <TableContainer sx={{ width: '80%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>comment</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>userId</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getAllComments && getAllComments.length > 0 ? (
                  getAllComments.map((comment, index) => (
                    <TableRow key={comment._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{comment.content}</TableCell>
                      <TableCell>{comment.userId}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>No users yet</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

    </div>
  );
}

export default AdminDash;
