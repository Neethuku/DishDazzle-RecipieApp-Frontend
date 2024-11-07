import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import {GoogleAuthProvider,signInWithPopup,getAuth} from 'firebase/auth';
import {app} from '../firebase';
import { googleLoginAPI } from '../../Services/allAPI';
import { useNavigate } from 'react-router-dom';
import { currentUserContext } from '../Context API/ContexShare';


function GAuth() {
    const [userData, setUserData] = useState({
        username: "", email: "", profile: ""
    });
    const {currentUser,setCurrentUser} = useContext(currentUserContext)
    const navigate = useNavigate();
    const handlegoogleLogin = async () => {
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const reqBody = {
                username: result.user.displayName,
                email: result.user.email,
                profile: result.user.photoURL
            }
          

            const response = await googleLoginAPI(reqBody);
            console.log(response);
            if(response.status===200){
                console.log('login successfull');
                sessionStorage.setItem("username",response.data.userDetails.username)
                sessionStorage.setItem("token",response.data.token)
                sessionStorage.setItem("userDetails",JSON.stringify(response.data.userDetails))
                setCurrentUser(response.data.userDetails)
                if(response.data.userDetails.isAdmin){
                    navigate('/dashboard?tab=profile');
                }else{
                    navigate('/') 
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Button 
                onClick={handlegoogleLogin} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', color: '#965641' }} 
                className="button-style google-button w-100 mb-4" 
                variant="primary">
                <FcGoogle style={{ marginRight: '10px' }} size={24} />
                Continue with Google
            </Button>
        </div>
    );
}

export default GAuth;
