import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Row } from 'react-bootstrap';
import { GoHeart } from "react-icons/go";
import { BiCommentAdd } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { getLikesAPI, getRecipieByPidAPI, likeAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';
import { FaHeart } from "react-icons/fa";
import AddComment from '../Components/AddComment';
import { commentButtonStatusContext, totalCommentContext } from '../Context API/ContexShare';
import CommentSection from '../Components/CommentSection';
import userprofile from '../assets/profileimage.jpg'
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner'; 


function ViewPage() {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const [postData, setPostData] = useState({
    postImage: "", title: "", category: "", ingredients: "", steps: "",username:"",profile:""
  })
  const { pId } = useParams()
  const [Liked, setLiked] = useState(false)
  const [TotalLikes, setTotalLikes] = useState(0)
  const {commentButtonStatus, setCommentButtonStatus} = useContext(commentButtonStatusContext)
  const {totalComment,setTotalComment} = useContext(totalCommentContext)

  useEffect(() => {
    fetchRecipe()
    getLikes(pId)

  }, [pId])
console.log('pdata',postData);


  const fetchRecipe = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getRecipieByPidAPI(pId, reqHeader)
        setLoading(false);
        if (result.status === 200) {
          const fetchedData = result.data[0];
          setPostData({
            id: fetchedData._id,
            postImage: fetchedData.postImage,
            title: fetchedData.title,
            category: fetchedData.category,
            ingredients: fetchedData.ingredients,
            steps: fetchedData.steps,
            username: fetchedData.username,
            profile:fetchedData.profile
          })

        }
      } catch (error) {
        alert(error)
      }
    }

  }


  const handleLiked = async (pId) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await likeAPI(pId, reqHeader)
        if (result.status === 200) {
          setLiked(false)
          getLikes(pId)
        } else {
          if (result.status === 201) {
            setLiked(true)
            getLikes(pId)
          }
        }
      } catch (error) {
        console.log(error);

      }
    }
  }


  const getLikes = async (pId) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await getLikesAPI(pId, reqHeader)
        if (result.status === 200) {
          setLiked(result.data.isLiked)
          setTotalLikes(result.data.totalLikes)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <Container className='d-flex align-items-center justify-content-center mt-5'>
        <Row className="justify-content-center">
        {loading ? ( // Show loading spinner if loading is true
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
          <Col xs={12} sm={12} md={12} className='d-flex flex-column align-items-center mb-5' >
            <Card sx={{
              maxWidth: 500,
              boxShadow: 'none',
              border: 'none',
              minWidth: 550
            }}>
              <h2 className='text-center newfont fw-bold'>{postData.title}</h2>
              <CardHeader
                className='mt-4'
                style={{ color: '#965641' }}
                avatar={
                  <Avatar 
                    sx={{ bgcolor: '#965641' }} 
                    aria-label="recipe"
                    src={postData?.profile ? `${SERVER_URL}/uploads/${postData.profile}` : userprofile} 
                  />
                }
                title ={postData?.username}
                subheader={moment(postData.createdAt).format("MMMM D, YYYY")}
              />
              <CardMedia
                style={{ borderRadius: '2px' }}
                component="img"
                height="400"
                image={`${SERVER_URL}/uploads/${postData.postImage}`}
                alt="Paella dish"
              />
              <CardContent>
                <Typography style={{textAlign:'justify'}}><span className='fw-bold' >Ingredients : </span>{postData.ingredients}</Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                  style={{textAlign:'justify'}}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                  className='mt-3'>
                    <span className='fw-bold' >Steps : </span>
                   {postData.steps}
                </Typography>
                <hr style={{ color: '#965641', height: '1px' }} />
                <div className='d-flex justify-content-between'>
                  <button
                    className='postBtn'
                    variant="text"
                    onClick={()=>setCommentButtonStatus(true)}
                    >
                    <BiCommentAdd
                      style={{ marginRight: '5px' }} size={21} />                  
                    {totalComment}
                    </button>
                  {Liked ? (
                    <button
                      className='postBtn'
                      variant="text"
                      onClick={() => handleLiked(postData.id)}
                    >
                      {TotalLikes}
                      <FaHeart
                        style={{ marginLeft: '5px', color: '#965641' }}
                        size={21} />
                    </button>
                  ) :
                    <button
                      className='postBtn'
                      variant="text"
                      onClick={() => handleLiked(postData.id)}
                    >
                      {TotalLikes}
                      <GoHeart
                        style={{ marginLeft: '5px' }}
                        size={21} />
                    </button>
                  }
                </div>
                {commentButtonStatus &&
                  <AddComment />
                }
                <CommentSection/>
              </CardContent>
            </Card>
          </Col>
          )}
        </Row>
      </Container>
    </>
  )
}
export default ViewPage






// import React, { useContext, useEffect, useState } from 'react';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import { Row, Col, Container, Spinner } from 'react-bootstrap';
// import { GoHeart } from "react-icons/go";
// import { BiCommentAdd } from "react-icons/bi";
// import { useParams } from 'react-router-dom';
// import { getLikesAPI, getRecipieByPidAPI, likeAPI } from '../../Services/allAPI';
// import { SERVER_URL } from '../../Services/serverUrl';
// import { FaHeart } from "react-icons/fa";
// import AddComment from '../Components/AddComment';
// import { commentButtonStatusContext, totalCommentContext } from '../Context API/ContexShare';
// import CommentSection from '../Components/CommentSection';
// import userprofile from '../assets/profileimage.jpg';
// import moment from 'moment';

// function ViewPage() {
//   const [loading, setLoading] = useState(true); 
//   const [postData, setPostData] = useState({
//     postImage: "", title: "", category: "", ingredients: "", steps: "", username: "", profile: ""
//   });

//   const { pId } = useParams();
//   const [Liked, setLiked] = useState(false);
//   const [TotalLikes, setTotalLikes] = useState(0);
//   const { commentButtonStatus, setCommentButtonStatus } = useContext(commentButtonStatusContext);
//   const { totalComment } = useContext(totalCommentContext);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     fetchRecipe();
//     getLikes(pId);
//   }, [pId]);

//   const fetchRecipe = async () => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       const reqHeader = {
//         "Content-Type": "multipart/form-data",
//         "Authorization": `Bearer ${token}`
//       };
//       try {
//         const result = await getRecipieByPidAPI(pId, reqHeader);
//         setLoading(false);
//         if (result.status === 200) {
//           const fetchedData = result.data[0];
//           setPostData({
//             id: fetchedData._id,
//             postImage: fetchedData.postImage,
//             title: fetchedData.title,
//             category: fetchedData.category,
//             ingredients: fetchedData.ingredients,
//             steps: fetchedData.steps,
//             username: fetchedData.username,
//             profile: fetchedData.profile
//           });
//         }
//       } catch (error) {
//         alert(error);
//       }
//     }
//   };

//   const handleLiked = async (pId) => {
//     const token = sessionStorage.getItem("token");
//     if (token) {
//       const reqHeader = {
//         "Content-Type": "multipart/form-data",
//         "Authorization": `Bearer ${token}`
//       };
//       try {
//         const result = await likeAPI(pId, reqHeader);
//         if (result.status === 200) {
//           setLiked(false);
//         } else if (result.status === 201) {
//           setLiked(true);
//         }
//         getLikes(pId);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const getLikes = async (pId) => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       const reqHeader = {
//         "Content-Type": "multipart/form-data",
//         "Authorization": `Bearer ${token}`
//       };
//       try {
//         const result = await getLikesAPI(pId, reqHeader);
//         if (result.status === 200) {
//           setLiked(result.data.isLiked);
//           setTotalLikes(result.data.totalLikes);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <Container className='mt-5'>
//       {loading ? (
//         <div className='d-flex justify-content-center'>
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       ) : (
//         <Row className="justify-content-center align-items-center g-4">
//           <Col md={5} className='text-center'>
//             <CardMedia
//               component="img"
//               className='img-fluid rounded shadow'
//               style={{ width: '100%', maxHeight: '550px', objectFit: 'cover' }}
//               image={`${SERVER_URL}/uploads/${postData.postImage}`}
//               alt={postData.title}
//             />
//           </Col>
//           <Col md={7}>
//             <h2 className='text-center newfont fw-bold'>{postData.title}</h2>
//             <CardHeader
//               className='mt-3'
//               style={{ color: '#965641' }}
//               avatar={
//                 <Avatar 
//                   sx={{ bgcolor: '#965641' }} 
//                   aria-label="recipe"
//                   src={postData?.profile ? `${SERVER_URL}/uploads/${postData.profile}` : userprofile} 
//                 />
//               }
//               title={postData?.username}
//               subheader={moment(postData.createdAt).format("MMMM D, YYYY")}
//             />
//             <CardContent>
//               <Typography><strong>Ingredients:</strong> {postData.ingredients}</Typography>
//               <Typography variant="body2" className='mt-3'><strong>Steps:</strong> {postData.steps}</Typography>
//               <hr />
//               <div className='d-flex justify-content-between'>
//                 <button className='postBtn' onClick={() => setCommentButtonStatus(true)}>
//                   <BiCommentAdd size={21} /> {totalComment}
//                 </button>
//                 <button className='postBtn' onClick={() => handleLiked(postData.id)}>
//                   {TotalLikes} {Liked ? <FaHeart size={21} color='#965641' /> : <GoHeart size={21} />}
//                 </button>
//               </div>
//               {commentButtonStatus && <AddComment />}
//               <CommentSection />
//             </CardContent>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// }

// export default ViewPage;

