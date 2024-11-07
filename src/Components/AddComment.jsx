import React, { useContext, useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { commentAddedContext, commentButtonStatusContext } from '../Context API/ContexShare';
import { useParams } from 'react-router-dom';
import {postCommentAPI } from '../../Services/allAPI';
import { currentUserContext } from '../Context API/ContexShare';



function AddComment() {
    const { currentUser, setCurrentUser } = React.useContext(currentUserContext)
    const { commentButtonStatus, setCommentButtonStatus } = useContext(commentButtonStatusContext)
    const {commentAdded,setCommentAdded} = useContext(commentAddedContext)
    const [addComment, setAddComment] = useState({
        content:"",username:"",profile:""
    })
    console.log(addComment);
    const { pId } = useParams()
    useEffect(() => {
        if (currentUser) {
            setAddComment(prevData => ({
            ...prevData,
            username: currentUser.username || "",
            profile: currentUser.profile || ""
          }));
        }
      }, [currentUser]);
    const handleAddComment = async () => {
        const token = sessionStorage.getItem("token")
        if (token && addComment.content) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const reqbody = {
                content: addComment.content,
                username:addComment.username,
                profile:addComment.profile
            }
            try {
                const result = await postCommentAPI(pId, reqbody, reqHeader)
                if (result.status === 200) {
                    setCommentButtonStatus(false);
                    setCommentAdded(true)
                    console.log("comment added");
                    
                } else {
                    console.log(result.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }




    return (
        <div className='mt-4'>
            <Form>
                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingTextarea2" label="Add a comment...">
                        <Form.Control
                            className='inputtags'
                            as="textarea"
                            placeholder="Add a comment..."
                            style={{ height: '100px', resize: 'none', border: 'none' }}
                            onChange={(e) => setAddComment(prev => ({ ...prev, content: e.target.value }))}
                        />
                    </FloatingLabel>
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <Button
                        style={{ backgroundColor: 'white', color: '#965641', height: '30px' }}
                        className='d-flex  align-items-center me-2 google-button'
                        onClick={() => setCommentButtonStatus(false)}
                    >Cancel
                    </Button>
                    <Button
                        style={{ backgroundColor: '#965641', border: 'none', height: '30px' }}
                        className='d-flex  align-items-center button-style signin-button'
                        onClick={handleAddComment}
                    >Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default AddComment