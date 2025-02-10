import React, { useEffect, useState } from 'react'
import PostCard from '../Components/PostCard'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { allRecipeAPI } from '../../Services/allAPI';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


function ViewCategory() {
  const [allRecipe,setAllRecipe] = useState()
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    getAllRecipe()
    window.scrollTo(0, 0); 
  }, []);
  const {category} = useParams()
  const searchTerm = category
  
  const getAllRecipe = async() => {
    setIsLoading(true)
    try {
      const result = await allRecipeAPI(searchTerm)
      console.log(result);
      
      if(result.status === 200){
        setAllRecipe(result.data)
      }else{
        console.log(result);
        
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setIsLoading(false)
    }

  }
  return (
    <>
    <Container className='d-flex align-items-center justify-content-center mt-5'>
      {
        isLoading?(
          <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="border" variant="secondary" />
          </div>
        ):(
          <Row className="justify-content-center">
          {allRecipe?.length>0? allRecipe.map((recipe,index)=>(
            <Col key={index} xs={12} sm={6} md={4} className='d-flex flex-column align-items-center mb-5' >
            <PostCard recipe={recipe}/>
            </Col>
          )):
          <p>Nothing to display</p>
        }
        </Row>
        )
      }
    </Container>
     
    </>
  )
}

export default ViewCategory