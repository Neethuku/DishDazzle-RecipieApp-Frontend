import React, { useEffect, useState } from 'react';
import PostCard from '../Components/PostCard';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { allRecipeAPI } from '../../Services/allAPI';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'; 


function SearchPage() {
    const location = useLocation();
    const [allRecipe, setAllRecipe] = useState([]);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');

        getAllRecipe(searchTermFromUrl);
        window.scrollTo(0, 0);
    }, [location.search]);

    const getAllRecipe = async (searchTermFromUrl) => {
      setLoading(true); 
      
        try {
            const result = await allRecipeAPI(searchTermFromUrl);
            console.log(result);
            setLoading(false);
            if (result.status === 200) {
                setAllRecipe(result.data);
                
            } else {
                console.log(result);
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    return (
      <Container className='d-flex align-items-center justify-content-center mt-5'>
      <Row className="justify-content-center">
          {loading ? ( 
              <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
          ) : allRecipe.length > 0 ? (
              allRecipe.map((recipe, index) => (
                  <Col key={index} xs={12} sm={6} md={4} className='d-flex flex-column align-items-center mb-5'>
                      <PostCard recipe={recipe} />
                  </Col>
              ))
          ) : (
              <p>Nothing to display</p>
          )}
      </Row>
  </Container>
    );
}

export default SearchPage;
