import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { AiOutlineLike } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { FaThumbsUp } from "react-icons/fa6";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { deleteCommentAPI, editCommentAPI, getPostCommentAPI, likeCommentAPI } from '../../Services/allAPI';
import { commentAddedContext, totalCommentContext } from '../Context API/ContexShare';
import userprofile from '../assets/profileimage.jpg'

function CommentSection() {
    const [allComments, setAllComments] = useState([])
    const { commentAdded, setCommentAdded } = useContext(commentAddedContext)
    const { totalComment, setTotalComment } = useContext(totalCommentContext)
    const { pId } = useParams()
    const currentUser = JSON.parse(sessionStorage.getItem('userDetails'));
    const currentUserId = currentUser._id
    setTotalComment(allComments.length)
    const [editcommentStatus, setEditCommentStatus] = useState(false)
    const [editCommentId, setEditCommentId] = useState(null);
    const [editComment, setEditComment] = useState(null);
    const [deletCommentStatus,setDeleteCommentStatus] = useState(false)

    useEffect(() => {
        getComments()
    }, [commentAdded,deletCommentStatus])

    const getComments = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getPostCommentAPI(pId, reqHeader)
                if (result.status === 200) {
                    console.log(result);
                    setAllComments(result.data)
                    setCommentAdded(false);
                } else {
                    console.log(result);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteComment = async (commentId) => {
        const token = sessionStorage.getItem('token');
        if (token && commentId) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await deleteCommentAPI({ commentId }, reqHeader)
                if (result.status === 200) {
                   setAllComments((prevComments)=>prevComments.filter((comment)=>comment._id !== commentId))
                    console.log('deleted successfully');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    

    const likeComment = async (commentId) => {
        const token = sessionStorage.getItem('token');
        if (token && commentId) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };
            const reqBody = {
                commentId
            };
            try {
                const result = await likeCommentAPI(reqBody, reqHeader);
                if (result.status === 200) {
                    getComments();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEditComment = (editcommentid, commentContent) => {
        setEditCommentStatus(true)
        setEditCommentId(editcommentid)
        setEditComment(commentContent)
    }

    const addEditComment = async (commentId) => {
        const token = sessionStorage.getItem('token')
        if (token && commentId) {
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const reqBody = {
                commentId, content: editComment
            }
            try {
                const result = await editCommentAPI(reqBody, reqHeader)
                if (result.status === 200) {
                    setEditCommentStatus(false)
                    console.log('comment edited');
                    getComments()
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const editcancel = () => {
        setEditCommentStatus(false)
    }

    return (
        <>
            <div>
                {allComments?.length > 0 ? allComments.map((comments, index) => (
                    <div key={index} className='row  d-flex flex-colum mt-3'>
                        <div className="col-1">
                     
                  <Avatar 
                    sx={{ bgcolor: '#965641' }} 
                    aria-label="recipe"
                    src={allComments?.profile ? `${SERVER_URL}/uploads/${allComments.profile}` : userprofile} 
                  />
                
                        </div>
                        <div className="col-1"></div>
                        <div style={{ marginLeft: '-20px' }} className="col-10">
                            <p className='commentFont'>
                                <span className='fw-bold'>{comments.username}</span>
                                <span className='ps-1'>{moment(comments.createdAt).fromNow()}</span></p>
                            {editCommentId === comments._id && editcommentStatus ?
                                (
                                    <div className='mt-4'>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <FloatingLabel controlId="floatingTextarea2" label="Edit comment...">
                                                    <Form.Control
                                                        className='inputtags'
                                                        as="textarea"
                                                        style={{ height: '100px', resize: 'none', border: 'none' }}
                                                        value={editComment}
                                                        onChange={(e) => setEditComment(e.target.value)}
                                                    />
                                                </FloatingLabel>
                                            </Form.Group>
                                            <div className='d-flex justify-content-end'>
                                                <Button
                                                    style={{ backgroundColor: 'white', color: '#965641', height: '30px' }}
                                                    className='d-flex  align-items-center me-2 google-button'
                                                    onClick={editcancel}
                                                >Cancel
                                                </Button>
                                                <Button
                                                    style={{ backgroundColor: '#965641', border: 'none', height: '30px' }}
                                                    className='d-flex  align-items-center button-style signin-button'
                                                    onClick={() => addEditComment(comments._id)}
                                                >Edit
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>) : null
                            }
                            <p
                                className='comment'
                                style={{ marginBottom: '2px' }}>
                                {comments.content}
                            </p>
                            <hr style={{ width: '140px', marginTop: '6px' }} className='hrclr' />
                            <div className=' d-flex flex-colum align-items-center justify-content-'>
                                <button
                                    className='like-btn mb-2'
                                    onClick={() => likeComment(comments._id)}>
                                    {comments.likedUsers.includes(currentUserId) ? (
                                        <FaThumbsUp size={20} />
                                    ) : (
                                        <AiOutlineLike size={20} />
                                    )}
                                </button>
                                {comments.numberOflikes > 0 ?
                                    (<div className='commentbtn ms-2 ' >{comments.numberOflikes}</div>
                                    ) : null

                                }
                                {comments.userId._id === currentUserId ?
                                    (
                                        <div>
                                            <button
                                                className='commentbtn d-btn e-btn ms-1'
                                                onClick={() => handleEditComment(comments._id, comments.content)}
                                            >Edit</button>
                                            <button
                                                className='commentbtn d-btn '
                                                onClick={() => deleteComment(comments._id)}
                                            >Delete</button>
                                        </div>
                                    ) : null
                                }
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) :
                    <p>No comments yet</p>
                }
            </div>
        </>
    )
}

export default CommentSection