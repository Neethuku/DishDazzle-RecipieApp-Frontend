import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { GoUpload } from "react-icons/go";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { editRecipieAPI, getRecipieByPidAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';


function UpdatePost() {
  const [postData, setPostData] = useState({
    postImage: "", title: "", category: "", ingredients: "", steps: ""
  })

  const [preview, setPreview] = useState("")
  const [fileStatus, setFileStatus] = useState(false)
  const { pId } = useParams();
  const navigate = useNavigate()

  
  useEffect(() => {
    if (postData.postImage) {
      if (typeof postData.postImage === "string") {
        setPreview(`${SERVER_URL}/uploads/${postData.postImage}`);
        setFileStatus(false);
      } 
      else if (
        postData.postImage.type === "image/png" || 
        postData.postImage.type === "image/jpg" || 
        postData.postImage.type === "image/jpeg"
      ) {
        setPreview(URL.createObjectURL(postData.postImage));
        setFileStatus(false);
      } 
      // If the file type is not supported
      else {
        setPreview("");
        setFileStatus(true);
        toast.error("Unsupported file type! Please upload a file with png, jpg, jpeg extensions.");
      }
    } 
  }, [postData.postImage]);
  



  useEffect(() => {
    fetchRecipe()


  }, [])


  const fetchRecipe = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getRecipieByPidAPI(pId, reqHeader)
        if (result.status === 200) {
          const fetchedData = result.data[0];
          setPostData({
            id: fetchedData._id,
            postImage: fetchedData.postImage,
            title: fetchedData.title,
            category: fetchedData.category,
            ingredients: fetchedData.ingredients,
            steps: fetchedData.steps
          })

        }
      } catch (error) {
        alert(result.response.data)
      }
    }

  }


  const handleUpdate = async (e) => {
    e.preventDefault()
    const { id, title, postImage, category, ingredients, steps } = postData;

    const imageExists = postImage || postData?.postImage; 

    if (!title || !imageExists || !category || !ingredients || !steps) {
      toast.error("Please fill the form completely");
    } else {
      const reqBody = new FormData()
      reqBody.append("postImage", postImage || postData.postImage);
      reqBody.append("title", title)
      reqBody.append("category", category)
      reqBody.append("ingredients", ingredients)
      reqBody.append("steps", steps)
      const token = sessionStorage.getItem("token")
      console.log("Token:", token);
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        console.log("Token:", token);
        try {
          const result = await editRecipieAPI(id, reqBody, reqHeader)
          console.log(result);
          if (result.status === 200) {
            console.log(result.data);
            toast.success("Your recipe has been updated successfully!")
           setTimeout(()=> {
            navigate ('/userdishespage')
           },2000)
            window.scrollTo(0, 0); 
          } else {
            toast.warning("Failed to add recipe")
          }
        } catch (error) {
          console.log(error.response);
          console.log(error.message);

        }
      } else {
        console.log("Please log in to add a recipe.");

      }
    }
  };

const handleCancel = () => {
  fetchRecipe()
}

  return (
    <Container fluid className="min-h-100 d-flex align-items-center justify-content-center mt-5">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={8} md={6} lg={6} className="d-flex justify-content-center">
          <div
            style={{ minHeight: '400px', width: '100%', maxWidth: '600px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
            className="border rounded p-4">
            <h2 className='mb-4' style={{ textAlign: 'center', fontVariant: 'small-caps', fontFamily: 'Trirong', fontWeight: 'bold', color: '#965641' }}>Update Your Recipe</h2>
            <Form className="h-100">
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  size="lg"
                  style={{ display: 'none' }}
                  id="customFileInput"
                  onChange={e => setPostData({ ...postData, postImage: e.target.files[0] })}
                />
                <label htmlFor="customFileInput" className="btn upload-btn d-flex align-items-center" style={{ fontSize: '15px' }}>
                  <GoUpload className="me-2" /> Upload file
                </label>
              </Form.Group>
              {fileStatus && <p style={{ color: 'red', fontSize: '13px' }}>* Please upload file with following extensions (png,jpg,jpeg) only</p>}
              {preview  &&
              // ? (
                <div className="image-preview mb-3" style={{ width: '100%', textAlign: 'center' }}>
                  <img
                    src={preview}
                    alt="Selected File"
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '3px' }}
                  />
                </div>
             
              }

              {/* } */}
              <Form.Group className="mb-3">
                <Form.Control
                  className='inputtags'
                  type="text"
                  placeholder="Title"
                  value={postData.title}
                  onChange={e => setPostData({ ...postData, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <FloatingLabel label="Choose category">
                  <Form.Select aria-label="Floating label select example"
                    className='inputtags'
                    value={postData.category}
                    onChange={e => setPostData({ ...postData, category: e.target.value })}

                  >
                    <option>{postData.category}</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-veg">Non-veg</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Meals">Meals</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Fast-Food">Fast-Food</option>
                    <option value="Indian-Curries">Indian-Curries</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  className='inputtags'
                  type="text"
                  placeholder="Ingredients"
                  value={postData.ingredients}
                  onChange={e => setPostData({ ...postData, ingredients: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingTextarea2" label="Preparation Steps">
                  <Form.Control
                    className='inputtags'
                    as="textarea"
                    placeholder="Enter your preparation steps here"
                    style={{ height: '200px', resize: 'none' }}
                    value={postData.steps}
                    onChange={e => setPostData({ ...postData, steps: e.target.value })}
                  />
                </FloatingLabel>
              </Form.Group>
              <Button
                style={{ backgroundColor: '#965641', border: 'none' }} className="button-style signin-button w-100 mb-4" variant="primary"
                onClick={handleUpdate}
              >Update
              </Button>
              <Button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', color: '#965641' }}
                className="button-style google-button w-100 mb-4" variant="primary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        position="top-center"
      />
    </Container>
  )
}

export default UpdatePost