import React, { createContext, useContext, useState } from 'react'
export const commentButtonStatusContext = createContext()
export const commentAddedContext = createContext()
export const totalCommentContext = createContext()
export const currentUserContext = createContext()

function ContexShare({children}) {
    const [commentButtonStatus,setCommentButtonStatus] = useState(false)
    const [commentAdded,setCommentAdded] = useState(false)
    const [totalComment,setTotalComment] = useState(0)
    const [currentUser,setCurrentUser] = useState(null)


  return (
    <>
    <currentUserContext.Provider value={{currentUser,setCurrentUser}}>
    <totalCommentContext.Provider value={{totalComment,setTotalComment}}>
    <commentAddedContext.Provider value={{commentAdded,setCommentAdded}}>
    <commentButtonStatusContext.Provider value={{commentButtonStatus,setCommentButtonStatus}}>
    {children}
    </commentButtonStatusContext.Provider>
    </commentAddedContext.Provider>
    </totalCommentContext.Provider>
    </currentUserContext.Provider>
    </>
  )
}

export default ContexShare