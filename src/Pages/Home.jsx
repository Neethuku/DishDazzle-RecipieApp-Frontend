import { Button } from '@mui/material'
import Card from 'react-bootstrap/Card';
import { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import chefImage from '../assets/chef1-removebg-preview_enhanced.png'
import {  homeRecipeAPI, recentRecipeAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';
import { currentUserContext } from '../Context API/ContexShare';


function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false);
  const [allRecipe,setAllRecipe] = useState()
  const [recentRecipe,setRecentRecipe] = useState()
  console.log(allRecipe);
  const [hoveredCard, setHoveredCard] = useState(null); 
  const {currentUser,setCurrentUser} = useContext(currentUserContext)


  useEffect ( () => {
    getHomeRecipe()
    getRecentRecipe()
  },[])

  const getHomeRecipe = async() => {
    const result = await homeRecipeAPI()
    if(result.status === 200){
      setAllRecipe(result.data)
    }else{
      console.log(result);
      
    }
  }

  const getRecentRecipe = async() => {
    const result = await recentRecipeAPI()
    if(result.status === 200){
      setRecentRecipe(result.data)
    }
  }

  const handleExplore = () => {
    navigate('/postpage')
  }

  const handleCategory = (category) => {
    console.log(category);
    if(category){
      navigate(`/view-categories/${category}`)
      
    }
    
  }
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
     <div style={{marginTop:'100px'}} className="row w-100 ">
  <div className="col-sm-1 col-sm-1 col-md-1"></div>
  <div className="col-12 col-sm-5  col-md-5 d-flex flex-column justify-content-center text-center text-md-start text-sm-start">
    <h1 className='newfont' style={{ fontWeight: 'bold' }}>Cook Like a Pro With Easy and Tasty Recipes</h1>
    <p style={{ lineHeight: '30px' }}>Let’s cook, share, and savor the magic of homemade goodness together. Share your favorite recipes and connect with a community of food lovers. Let’s make cooking a shared experience!</p>
    <div className="d-flex justify-content-center d-sm-block "> 
      <Button onClick={handleExplore}
        style={{ width: '145px',backgroundColor:'#965641', color: 'white',border:'none'}}
        variant="outlined"
        size="medium"
      >
        {currentUser ? "Explore Now" : "Get Started"}
      </Button>
    </div>

  </div>
  <div className="col-12 col-sm-5 col-md-5 d-flex justify-content-center align-items-center">
    <img width={'430px'}  className='img-fluid' src={chefImage} alt="Chef Image" />
  </div>
  <div className="col-12 col-md-1"></div>
</div>

      <div style={{marginTop:'180px'}}>
        <h4 className='newfont' style={{ textAlign: 'center', fontWeight: 'bold'}}>Simple Recipies Made for real, Actual, Everyday Life</h4>
      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
        {allRecipe?.length>0?allRecipe.map((recipe)=>(
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
        <Link to={`/view/${recipe._id}`}>
        <Card
              style={{
                width: '18rem',
                transform: hoveredCard === recipe._id ? 'scale(1.05)' : 'scale(1)', 
                transition: 'transform 0.5s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard(recipe._id)} 
              onMouseLeave={() => setHoveredCard(null)} 
            >

           <Card.Img variant="top" src={`${SERVER_URL}/uploads/${recipe?.postImage}`}
            style={{
              width: '100%', 
              height: '300px', 
              objectFit: 'cover' 
            }}
           />
           <Card.Body>
             <Button  style={{ color: '#965641', borderColor: '#965641' }} variant="outlined" size="medium">View More</Button>
           </Card.Body>
         </Card>
         </Link>
          </div>
           )):
           <p></p>
           }
       
        </div>
      </div>
      <div style={{ width: '100%' }} className='mt-5'>
        <div
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/14883840/pexels-photo-14883840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '500px',
            opacity: '0.6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', 
            textAlign: 'center',
            color: '#f2f2f2', 
            fontSize: '35px',
            fontWeight: 'bold', 
            fontFamily: "Playwrite CU",

          }}
        >
          Let every dish you make tell a story of flavor and creativity
        </div>
      </div>
      <div className='mt-5'>
        <h4 style={{ textAlign: 'center', fontWeight: 'bold',color:'#965641' }}>Recent Post</h4>
      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
         {
          recentRecipe?.length>0?recentRecipe.map((recipe)=>(
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
           <Link to={`/view/${recipe._id}`}>
            <Card style={{
                width: '18rem',
                transform: hoveredCard === recipe._id ? 'scale(1.05)' : 'scale(1)', 
                transition: 'transform 0.5s ease',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setHoveredCard(recipe._id)} 
              onMouseLeave={() => setHoveredCard(null)}>
              <Card.Img
               variant="top" 
               style={{
                width: '100%', 
                height: '300px', 
                objectFit: 'cover' 
              }}
               src={`${SERVER_URL}/uploads/${recipe?.postImage}`} />
              <Card.Body>
              <Button  style={{ color: '#965641', borderColor: '#965641' }} variant="outlined" size="medium">View More</Button>
              </Card.Body>
            </Card>
            </Link>
          </div>
          )):null
         }
        </div>
      </div>
      <div className="d-flex justify-content-center">
  <Link to="/postpage">
  <Button style={{textTransform:'lowercase',color: '#965641'}}>
  <u>View All Posts</u>
  </Button>
  </Link>
</div>
      <hr />
      <div className='mt-5'>
        <h4 style={{ textAlign: 'center', fontWeight: 'bold',color:'#965641' }}>Cook with passion, eat with joy</h4>
      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem', border: 'none' }}>
              <Card.Body style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-burger" style={{ fontSize: '3rem', color: '#ff6347' }}></i> {/* Font Awesome icon */}
              </Card.Body>
              <Card.Body>
                <Card.Text style={{ textAlign: 'center' }}>
                  "Let's 'ketchup' on the joy of burgers."
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem', border: 'none' }}>
              <Card.Body style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-cake-candles" style={{ fontSize: '3rem', color: '#ff6347' }}></i> {/* Font Awesome icon */}
              </Card.Body>
              <Card.Body>
                <Card.Text style={{ textAlign: 'center' }}>
                  "A classic dessert with a modern twist."

                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem', border: 'none' }}>
              <Card.Body style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-mug-saucer" style={{ fontSize: '3rem', color: '#ff6347' }}></i> {/* Font Awesome icon */}
              </Card.Body>
              <Card.Body>
                <Card.Text style={{ textAlign: 'center' }}>
                  "Life needs a little sugar and a lot of tea."
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
            <Card style={{ width: '18rem', border: 'none' }}>
              <Card.Body style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-pizza-slice" style={{ fontSize: '3rem', color: '#ff6347' }}></i> {/* Font Awesome icon */}
              </Card.Body>
              <Card.Body>
                <Card.Text style={{ textAlign: 'center' }}>
                  "Pizza: the endless circle of happiness."
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
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
          style={{  width: '250px',  
            height: '250px',
            objectFit: 'cover' }}
            src="https://images.pexels.com/photos/5474676/pexels-photo-5474676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Non-veg')} 
          />
          <h6 className="mt-3 newfont">Non-veg</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
          style={{  width: '250px',  
            height: '250px',
            objectFit: 'cover' }}
            src="https://images.pexels.com/photos/20752198/pexels-photo-20752198/free-photo-of-juice-and-lemons.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Drinks')} 
          />
          <h6 className="mt-3 newfont">Drinks</h6>
        </Col>
        <Col xs={12} sm={6} md={3} className="mb-3 d-flex flex-column align-items-center">
        <Image 
          style={{  width: '250px',  
            height: '250px',
            objectFit: 'cover' }}
            src="https://images.pexels.com/photos/19396434/pexels-photo-19396434/free-photo-of-cranberry-jam-and-a-slices-of-wholemeal-bread.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            roundedCircle 
            className="img-fluid category-card" 
            onClick={()=>handleCategory('Snacks')} 
          />
          <h6 className="mt-3 newfont">Snacks</h6>
        </Col>
      </Row>
    </Container>
    <div className="d-flex justify-content-center">
  <Link to="/categories">
  <Button style={{textTransform:'lowercase',color: '#965641'}}>
  <u>View All Categories</u>
  </Button>
  </Link>
</div>
    </>


  )
}

export default Home