import React, { useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../../Services/serverUrl';
import moment from 'moment';
import userprofile from '../assets/profileimage.jpg'

function PostCard({recipe}) {
  const [commentStatus,setCommentStatus] = useState(false)

  const handleComment = () => {
    setCommentStatus(true)
 
  }
  const handleCancel = () => {
    setCommentStatus(false)
  }

  // console.log('images',`${SERVER_URL}/uploads/${recipe?.postImage}`);
  


  return (
    <>
   {recipe&& 
    <Card  sx={{ 
      maxWidth: 315, 
      boxShadow: 'none', 
      border: 'none'      
    }}>
      
    <CardHeader style={{color: '#965641'}}
      avatar={
        <Avatar 
          sx={{ bgcolor: '#965641' }} 
          aria-label="recipe"
          src={recipe?.profile ? `${SERVER_URL}/uploads/${recipe.profile}` : userprofile} 
        />
      }
      title ={recipe?.username}
      subheader={moment(recipe.createdAt).format("MMMM D, YYYY")}
    />
   <Link to={`/view/${recipe._id}`}>
   <CardMedia
    style={{borderRadius:'2px'}}
      component="img"
      height="330"
      image={`${SERVER_URL}/uploads/${recipe?.postImage}`}
      alt="Paella dish"
    />
   </Link>
    <CardContent>
      <Typography style={{fontSize:'20px',color: '#965641'}}>{recipe?.title}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }} className='mt-3'>
        {recipe?.steps.slice(0,80)}...       
      </Typography>
      <hr style={{color:'#965641',height:'1px'}}/>
      
      
    </CardContent>
  </Card>
   }
    </>
  )
}

export default PostCard


