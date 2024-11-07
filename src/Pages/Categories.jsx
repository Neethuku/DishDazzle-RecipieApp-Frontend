import React from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { Link, useNavigate } from 'react-router-dom';
import  { useEffect } from 'react'


function Categories() {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const navigate = useNavigate()



  const handleCategory = (category) => {
    console.log(category);
    if(category){
      navigate(`/view-categories/${category}`)
      
    }
    
  }
  return (
    <>
    <h3 id='category' style={{ color: '#965641' }} className='text-center mt-5'>All Categories</h3>
    <Container className='d-flex align-items-center justify-content-center mt-5'>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/20844843/pexels-photo-20844843/free-photo-of-salad-with-avocado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card"
            onClick={()=>handleCategory('Veg')} 
          />
          <h6 className="mt-3 newfont">Veg</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/5474676/pexels-photo-5474676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Non-veg')} 
          />
          <h6 className="mt-3 newfont">Non-veg</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/20752198/pexels-photo-20752198/free-photo-of-juice-and-lemons.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Drinks')} 
          />
          <h6 className="mt-3 newfont">Drinks</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/19396434/pexels-photo-19396434/free-photo-of-cranberry-jam-and-a-slices-of-wholemeal-bread.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Snacks')} 
          />
          <h6 className="mt-3 newfont">Snacks</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Desserts')} 
          />
          <h6 className="mt-3 newfont">Desserts</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/20891782/pexels-photo-20891782/free-photo-of-brown-bowl-of-rice.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Meals')} 
          />
          <h6 className="mt-3 newfont">Meals</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Breakfast')} 
          />
          <h6 className="mt-3 newfont">Breakfast</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/14135222/pexels-photo-14135222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Chinese')} 
          />
          <h6 className="mt-3 newfont">Chinese</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Fast-Food')} 
          />
          <h6 className="mt-3 newfont">Fast Food</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Seafood')} 
          />
          <h6 className="mt-3 newfont">Seafood</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
            src="https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Indian-Curries')} 
          />
          <h6 className="mt-3 newfont">Indian Curries</h6>
        </Col>
      </Row>
    </Container>
    </>
  )
}


export default Categories