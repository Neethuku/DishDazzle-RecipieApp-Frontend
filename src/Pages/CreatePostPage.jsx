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
import { addRecipeAPI } from '../../Services/allAPI';
import { currentUserContext } from '../Context API/ContexShare';


function CreatePostPage() {
  const { currentUser, setCurrentUser } = React.useContext(currentUserContext)
  console.log('cuser',currentUser);

  const [postData, setPostData] = useState({
    postImage: "", title: "", category: "", ingredients: "", steps: "",username:"",profile:""
  })
  useEffect(() => {
    if (currentUser) {
      setPostData(prevData => ({
        ...prevData,
        username: currentUser.username || "",
        profile: currentUser.profile || ""
      }));
    }
  }, [currentUser]);
  const [preview, setPreview] = useState("")
  const [fileStatus, setFileStatus] = useState(false)
  const [alertStatus,setAlertStatus] = useState(false)
  console.log(postData);
  

  useEffect(() => {
    if (postData.postImage) {
      if (postData.postImage.type == "image/png" || postData.postImage.type == "image/jpg" || postData.postImage.type == "image/jpeg") {
        console.log('create url');
        setPreview(URL.createObjectURL(postData.postImage))
        console.log(preview);
        setFileStatus(false)
      } else {
        console.log('Please upload file with following extensions (png,jpg,jpeg) only');
        setFileStatus(true)
        setPostData({ ...postData, postImage: "" })
        setPreview("")
      }
    }
  }, [postData.postImage])


  const handleCancel = () => {
    setPreview("")
    setPostData({title:"",postImage:"",category:"",ingredients:"",steps:"", username: currentUser?.username || "", profile: currentUser?.profile || ""})
  }

  const handleAddRecipe = async() => {
    const {postImage,title,category,ingredients,steps} = postData
    if(!title || !postImage || !category || !ingredients || !steps){
      toast.error("please fill the form completely")
      return;
    }else{
      //api call-req body
      const reqBody = new FormData()
      reqBody.append("postImage",postImage)
      reqBody.append("title",title)
      reqBody.append("category",category)
      reqBody.append("ingredients",ingredients)
      reqBody.append("steps",steps)
      reqBody.append("username",postData.username)
      reqBody.append("profile",postData.profile)

      const token = sessionStorage.getItem("token")
      console.log("Token:", token);
      if(token){
        const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
        }
        console.log("Token:", token);
        try {
          const result = await addRecipeAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status === 200){
            console.log(result.data);
            toast.success("Your recipe has been added successfully!")
            setPostData({title:"",postImage:"",category:"",ingredients:"",steps:""})
            setPreview("")
            window.scrollTo(0, 0); 
          }else{
            toast.warning(result.response.data || "Failed to add recipe")
          }
        } catch (error) {
          console.log(error.response);
          console.log(error.message);
          
        }
      }else{
        console.log("Please log in to add a recipe.");
         
      }
    }
  }
  return (
    <Container fluid className="min-h-100 d-flex align-items-center justify-content-center mt-5">
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={8} md={6} lg={6} className="d-flex justify-content-center">
          <div
            style={{ minHeight: '400px', width: '100%', maxWidth: '600px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
            className="border rounded p-4">
            <h2 className='mb-4' style={{ textAlign: 'center', fontVariant: 'small-caps', fontFamily: 'Trirong', fontWeight: 'bold', color: '#965641' }}>Add a New Recipe</h2>
            <Form className="h-100">
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  size="lg"
                  style={{ display: 'none' }}
                  id="customFileInput"
                  onChange={e => setPostData({...postData,postImage: e.target.files[0] })}
                />
                <label htmlFor="customFileInput" className="btn upload-btn d-flex align-items-center" style={{ fontSize: '15px' }}>
                  <GoUpload className="me-2" /> Upload file
                </label>
              </Form.Group>
              {fileStatus && <p style={{ color: 'red', fontSize: '13px' }}>* Please upload file with following extensions (png,jpg,jpeg) only</p>}
              {preview&&
                     <div className="image-preview mb-3" style={{ width: '100%', textAlign: 'center' }}>
                     <img
                       src={preview}
                       alt="Selected File"
                       style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '3px' }}
                     />
                   </div>
              }
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
                    onChange={e => setPostData({ ...postData, category: e.target.value })}>
                    <option></option>
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
              onClick={handleAddRecipe}
              >Upload
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

export default CreatePostPage;