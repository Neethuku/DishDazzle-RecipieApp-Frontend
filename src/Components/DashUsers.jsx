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
import { currentUserContext } from '../Context API/ContexShare';
import { deleteAccountAPI, getAllUsersAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';
import { FaXmark } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import profileImage from '../assets/profileimage.jpg'




function DashUsers() {
  const { currentUser, setCurrentUser } = React.useContext(currentUserContext)
  const [getAllUsers, setGetAllUsers] = useState('')
  const [totalUsers, setTotalUsers] = useState('')
  const admin = currentUser.isAdmin
  const [displayLimit, setDisplayLimit] = useState(10)

  console.log(getAllUsers);


  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
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
        const result = await getAllUsersAPI(queryParams, reqHeader)
        setGetAllUsers(result.data.allUsers)
        setTotalUsers(result.data.totalUsers)
      } catch (error) {
        console.log(error);

      }
    }

  }

  const handleDeleteUsersAccount = async (userId) => {
    console.log(userId);

    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const reqBody = {
        userId
      }
      try {
        const result = await deleteAccountAPI(reqBody, reqHeader)
        if (result.status === 200) {
          fetchUsers()
          console.log('user deleted');

        }
      } catch (error) {
        console.log(error);

      }
    }
  }
  return (
    <div className="container">
      <div className='d-flex justify-content-center align-items-center mt-5' style={{ width: '80%', margin: '0 auto' }}>
        <h2 style={{ color: '#965641' }}>All Users</h2>


      </div>

      <TableContainer className='mt-5' component={Paper} sx={{ width: '80%', margin: '0 auto' }}>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell style={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell></TableCell>
              <TableCell style={{ fontWeight: 'bold' }} >Dish Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>UserId</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Admin</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {getAllUsers && getAllUsers.length > 0 ? (
              getAllUsers.slice(0, displayLimit).map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell >{index + 1}</TableCell>
                  <TableCell>
                    <img
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        borderRadius: '50%'
                      }}
                      src={user?.profile ? `${SERVER_URL}/uploads/${user.profile}` : profileImage}
                      alt=""
                    />
                  </TableCell>

                  <TableCell > {user.username}</TableCell>
                  <TableCell >{user._id}</TableCell>
                  <TableCell >
                    {user.isAdmin ? (
                      <Button
                        style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 2px  #807e7d'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                      ><IoCheckmarkCircle style={{ color: '#12b955' }} size={26} />
                      </Button>
                    ) : (
                      <Button
                        style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 2px  #807e7d'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                      ><FaXmark style={{ color: '#007bff' }} size={26} />
                      </Button>
                    )}

                  </TableCell>
                  <TableCell >
                    <Button style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 2px  #807e7d'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                      onClick={() => handleDeleteUsersAccount(user?._id)}
                    ><MdOutlineDelete style={{ color: '#f44336' }} size={26} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="d-flex align-items-center justify-content-center" style={{ height: '50px' }}>
                    <p>No users yet</p>
                  </div>
                </TableCell>
              </TableRow>

            )

            }


          </TableBody>

        </Table>
      </TableContainer>
      {getAllUsers.length > displayLimit && (
        <div className="d-flex justify-content-center mt-3">
          <button
            style={{ color: '#965641', backgroundColor: 'white', border: 'none' }}
            onClick={() => setDisplayLimit(displayLimit + 10)}
          >
            <u> view more</u>
          </button>
        </div>
      )}

    </div>
  )
}

export default DashUsers