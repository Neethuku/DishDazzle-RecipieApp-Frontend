import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdOutlineDelete } from "react-icons/md";
import { Button } from 'react-bootstrap';
import { deleteUserRecipeAPI, getAllPostsAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';
import { currentUserContext } from '../Context API/ContexShare';
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';



function DashPosts() {
  const { currentUser, setCurrentUser } = React.useContext(currentUserContext)
  const [getAllPosts, setGetAllPosts] = useState('')
  const [totalPosts,setTotalPosts] = useState('')
  const admin = currentUser.isAdmin
  const [displayLimit,setDisplayLimit] = useState(10)

  useEffect(() => {
    fetchPosts()
  }, [])
   
  const fetchPosts = async () => {
    const token = sessionStorage.getItem('token')
    if (admin && token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const queryParams = new URLSearchParams({
        admin: true,
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

  const handledeleteRecipe = async (pid) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await deleteUserRecipeAPI(pid, reqHeader)
        fetchPosts()
       console.log(result);
       
      } catch (error) {
console.log(error);

      }
    }

  }
  return (
    <div className="container">
    <div className='d-flex justify-content-between align-items-center mt-5' style={{ width: '80%', margin: '0 auto' }}>
      <h2 style={{ color: '#965641' }}>All Posts</h2>
      <Link style={{ textDecoration: 'none' }} to="/createpost">
        <Button className='post-button' style={{ backgroundColor: '#965641', border: 'none', display: 'flex', alignItems: 'center' }} variant="primary">
          <AiOutlinePlus size={20} style={{ marginRight: '6px' }} />Create a Post
        </Button>
      </Link>

    </div>

    <TableContainer className='mt-5' component={Paper} sx={{ width: '80%', margin: '0 auto' }}>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>

            <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
            <TableCell></TableCell>
            <TableCell style={{ fontWeight: 'bold' }} >Title</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} >Category</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>UserId</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>PostId</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
          </TableRow>
        </TableHead>
       
            <TableBody>
              {getAllPosts && getAllPosts.length > 0 ? (
                getAllPosts.slice(0,displayLimit).map((post,index) => (
                  <TableRow key={post._id}>
                  <TableCell >{index+1}</TableCell>
                  <TableCell>
                  <Link to={`/view/${post._id}`}>
                    <img style={{ width: '100px', height: '100px', objectFit: 'cover' }} src={`${SERVER_URL}/uploads/${post?.postImage}`} alt="" />
                    </Link>
                    </TableCell>
                  <TableCell >{post.title}</TableCell>
                  <TableCell > {post.category}</TableCell>
                  <TableCell > {post.userId}</TableCell>
                  <TableCell > {post._id}</TableCell>
                  <TableCell >
                    <Button style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 2px  #807e7d'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                      onClick={()=>handledeleteRecipe(post?._id)}
                    ><MdOutlineDelete style={{ color: '#f44336' }} size={26} />
                    </Button>
                  </TableCell>
                </TableRow>
                ))
              ):(
                <TableRow>
                <TableCell colSpan={7}>
                  <div className="d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
                    <p>No posts yet</p>
                  </div>
                </TableCell>
              </TableRow>
              )}
             
          
            </TableBody>
           
      </Table>
    </TableContainer>
    {getAllPosts.length>displayLimit &&(
      <div className="d-flex justify-content-center mt-3">
          <button
          style={{color:'#965641',backgroundColor:'white',border:'none'}}
          onClick={()=>setDisplayLimit(displayLimit+10)}
          >
           <u> view more</u>
          </button>
        </div>
    )}
  </div>
  )
}

export default DashPosts