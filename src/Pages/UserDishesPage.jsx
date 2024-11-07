import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { Button, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from "react-icons/ai";
import { deleteUserRecipeAPI, getuserRecipeAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';



function UserDishesPage() {
  const [allProjects, setAllProjects] = useState([])
  const [displayLimit,setDisplayLimit] = useState(4)

  const getuserRecipe = async () => {
    const token = sessionStorage.getItem("token")
    console.log(token);
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      const result = await getuserRecipeAPI(reqHeader)
      if (result.status === 200) {
        setAllProjects(result.data)
      } else {
        console.log(result);
      }
    }
  }

  useEffect(() => {
    getuserRecipe()
  }, [])
  console.log(allProjects);

  const handledeleteRecipe = async (pid) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await deleteUserRecipeAPI(pid, reqHeader)
        if (result.status === 200) {
          getuserRecipe()
        }
      } catch (error) {
        alert(result.response.data)
      }
    }

  }



  return (
    <div className="container">
      <div className='d-flex justify-content-between align-items-center mt-5' style={{ width: '80%', margin: '0 auto' }}>
        <h2 style={{ color: '#965641' }}>My Recipes</h2>
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
              <TableCell style={{ fontWeight: 'bold' }} >Dish Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Edit</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
          </TableHead>
          {
            allProjects.length > 0 ? allProjects.slice(0,displayLimit).map((recipe, index) => (
              <TableBody>
                <TableRow>
                  <TableCell >{index + 1}</TableCell>
                  <TableCell><Link to={`/view/${recipe._id}`}><img style={{ width: '100px', height: '100px', objectFit: 'cover' }} src={`${SERVER_URL}/uploads/${recipe?.postImage}`} alt="" /></Link></TableCell>
                  <TableCell >{recipe.title}</TableCell>
                  <TableCell >  {new Date(recipe.updatedAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}</TableCell>
                  <TableCell >
                    <Link to={`/update-post/${recipe._id}`}>
                      <Button
                        style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 2px  #807e7d'}
                        onBlur={(e) => e.target.style.boxShadow = 'none'}
                      ><BiSolidEditAlt style={{ color: '#007bff' }} size={26} />
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell >
                    <Button style={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
                      onFocus={(e) => e.target.style.boxShadow = '0 0 2px  #807e7d'}
                      onBlur={(e) => e.target.style.boxShadow = 'none'}
                      onClick={() => handledeleteRecipe(recipe?._id)}
                    ><MdOutlineDelete style={{ color: '#f44336' }} size={26} />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            )) :
              <p className='m-4'>No recipies are uploaded yet!!</p>
          }

        </Table>
      </TableContainer>
      {allProjects.length>displayLimit &&(
        <div className="d-flex justify-content-center mt-3">
          <button
          style={{color:'#965641',backgroundColor:'white',border:'none'}}
          onClick={()=>setDisplayLimit(displayLimit+4)}
          >
           <u> view more</u>
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDishesPage;
