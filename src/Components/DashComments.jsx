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
import { deleteCommentAPI, getAllCommentsAPI } from '../../Services/allAPI';
import { currentUserContext } from '../Context API/ContexShare';
import Spinner from 'react-bootstrap/Spinner';


function DashComments() {
  const { currentUser, setCurrentUser } = React.useContext(currentUserContext)
  const [getAllComments, setGetAllComments] = useState('')
  const [totalComments,setTotalComments] = useState('')
  const admin = currentUser.isAdmin
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [])

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
      setIsLoading(true)
      try {
        const result = await getAllCommentsAPI(queryParams, reqHeader)
        setGetAllComments(result.data.allComments)
        setTotalComments(result.data.totalComments)
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false)
      }
    }

  }

  const deleteComment = async (commentId) => {
    const token = sessionStorage.getItem('token');
    if (token && commentId) {
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        try {
            const result = await deleteCommentAPI({ commentId }, reqHeader)
            if (result.status === 200) {
              fetchComments()
                console.log('deleted successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }
}


  return (
    <div className="container">
    <div className='d-flex justify-content-between align-items-center mt-5' style={{ width: '80%', margin: '0 auto' }}>
      <h2 style={{ color: '#965641' }}>All Comments</h2>
    </div>
    {
      isLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="secondary" />
        </div>
      ):(
        <TableContainer className='mt-5' component={Paper} sx={{ width: '80%', margin: '0 auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell style={{ fontWeight: 'bold' }} >Comments</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>UserId</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>PostId</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
              <TableBody>
                {getAllComments && getAllComments.length > 0 ?(
                  getAllComments.map((comment,index) => (
                    <TableRow>
                    <TableCell >{index+1}</TableCell>
                    <TableCell >{comment.content}</TableCell>
                    <TableCell > {comment.userId}</TableCell>
                    <TableCell > {comment.postId}</TableCell>
                    <TableCell >
                      <Button style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 2px  #807e7d'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                        onClick={()=>deleteComment(comment._id)}
                      ><MdOutlineDelete style={{ color: '#f44336' }} size={26} />
                      </Button>
                    </TableCell>
                  </TableRow>
                  ))
                ):( 
                  <TableRow>
                  <TableCell colSpan={5}>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
                      <p>No comments yet</p>
                    </div>
                  </TableCell>
                </TableRow>
              
  
                )}
              
              </TableBody>
             
        </Table>
      </TableContainer>
      )
    }

  </div>
  )
}

export default DashComments