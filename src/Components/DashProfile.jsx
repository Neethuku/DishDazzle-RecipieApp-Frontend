import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import Image from 'react-bootstrap/Image';
import { currentUserContext } from '../Context API/ContexShare';
import { updateProfileAPI } from '../../Services/allAPI';
import { SERVER_URL } from '../../Services/serverUrl';
import profileImage from '../assets/profileimage.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DashProfile() {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [preview, setPreview] = useState('')
  const [existingImage, setExistingImage] = useState("")
  const [fileStatus, setFileStatus] = useState(false)
  const [userProfileData, setUserProfileData] = useState({
    id: "", username: "", email: "", password: "", profile: ""
  });
  useEffect(() => {
    if (currentUser) {
      setUserProfileData({
        id: currentUser._id,
        username: currentUser.username,
        email: currentUser.email,
        password: "",
        profile: currentUser.profile
      })
    }
  }, [currentUser])
console.log('currentuser',currentUser);


  useEffect(() => {
    if (userProfileData.profile) {
      setExistingImage(userProfileData.profile)
      if (typeof userProfileData.profile == "string") {
        setPreview(`${SERVER_URL}/uploads/${userProfileData.profile}`)
        setFileStatus(false)
      } else if (
        userProfileData.profile.type === "image/png" ||
        userProfileData.profile.type === "image/jpg" ||
        userProfileData.profile.type === "image/jpeg"
      ) {
        setPreview(URL.createObjectURL(userProfileData.profile));
        setFileStatus(false);
      } else {
        setPreview("");
        setFileStatus(true);
      }
    }
  }, [userProfileData.profile])

  console.log(userProfileData);

  const handleEmailChange = (e) => {
    const email = e.target.value
    setUserProfileData({ ...userProfileData, email })
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (regex.test(email)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setUserProfileData({ ...userProfileData, password })
    if (password.length >= 8) {
      setPasswordValid(true)
    } else {
      setPasswordValid(false)
    }
  }

  const handleInputChange = (e) => {
    const username = e.target.value
    setUserProfileData({ ...userProfileData, username })
  }

  const updateProfile = async() => {
    const {username,email,password,profile} = userProfileData
    if(!username || !email){
      alert('plz fill the form')
    }else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
        "Content-Type":preview?"multipart/form-data":"application/json",
        "Authorization":`Bearer ${token}`
        }

        try {
          const result = await updateProfileAPI(reqBody,reqHeader)
          if(result.status == 200){
            sessionStorage.setItem("userDetails",JSON.stringify(result.data.userDetails))
            setCurrentUser(result.data.userDetails)
            setUserProfileData((prevState) => ({ ...prevState, password: '' }));
            toast.success( 'Profile updated successfully')
          }else{
            console.log(error);
            
          }
          
        } catch (error) {
          console.log(error);
          
        }
      }
    }
  }

  const handleCancel = () => {
    setUserProfileData({
      id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      password: "",
      profile: currentUser.profile
    })
  }

  console.log(existingImage);
  console.log('p',preview);
  

  return (
    <div className="dash-profile d-flex flex-column mt-4">
      <h2 className='newfont'>
      {currentUser?.isAdmin ? 'Admin profile' : 'Profile'}
      </h2>

      <div className='d-flex flex-column align-items-center mb-4 mt-2'>
        <label htmlFor="profile-pic-input" style={{ cursor: 'pointer' }}>
          {existingImage == "" ?
            <Image
              src={preview ? preview : profileImage}
              alt="Profile"
              roundedCircle
              style={{ width: '150px', height: '150px' }}
            /> :
            <Image
              src={
                typeof existingImage === 'string' && existingImage.startsWith('http')
                  ? existingImage
                  : preview
                  ? preview
                  : `${SERVER_URL}/uploads/${existingImage}`
              }
              
              alt="Profile"
              roundedCircle
              style={{ width: '150px', height: '150px' }}
            />
          }
        </label>
        <input
          type="file"
          accept="image/*"
          className="mt-3"
          id="profile-pic-input"
          style={{ display: 'none' }}
          onChange={e => setUserProfileData({ ...userProfileData, profile: e.target.files[0] })}
        />
        {fileStatus && <p style={{ color: 'red', fontSize: '13px' }}>* Please upload file with following extensions (png,jpg,jpeg) only</p>}

      </div>
      <div className='d-flex flex-column'>
        <TextField
          className='textfield mb-3'
          size="small"
          id="outlined-basic"
          variant="outlined"
          value={userProfileData.username}
          onChange={handleInputChange}

        />
        <TextField
          className='textfield mb-3'
          size="small"
          id="outlined-basic"
          variant="outlined"
          value={userProfileData.email}
          onChange={handleEmailChange}
        />
        {!emailValid && <p style={{ color: 'red', fontSize: '13px' }}>Please enter a valid email </p>}
        <TextField
          className='textfield mb-3'
          type='password'
          size="small"
          id="outlined-basic"
          variant="outlined"
          placeholder='password'
          value={userProfileData.password}
          onChange={handlePasswordChange}
        />
        {!passwordValid && <p style={{ color: 'red', fontSize: '13px' }}>Password must be in 8 character</p>}
        <Button
          className='mb-3 signin-button'
          style={{ backgroundColor: '#965641', color: 'white' }}
          onClick={updateProfile}
        >
          Update
        </Button>
        <Button 
         className='google-button' 
         style={{ borderColor: '#965641', color: '#965641' }} 
         variant="outlined"
         onClick={handleCancel}>
         Cancel</Button>
      </div>
      <ToastContainer
      autoClose={2000}
      hideProgressBar={true}
      position="top-center"
      />
    </div>
  );
}

export default DashProfile;
