import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

export const registerAPI = async (user) => {
    return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

export const signInAPI = async (user) => {
    return await commonAPI("POST",`${SERVER_URL}/signin`,user,"")
}

export const addRecipeAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST",`${SERVER_URL}/addRecipe`,reqBody,reqHeader)
}

export const allRecipeAPI = async (searchTermFromUrl) => {
    return await commonAPI("GET",`${SERVER_URL}/allRecipe?search=${searchTermFromUrl || ""}`,"","")
}

export const homeRecipeAPI = async () => {
    return await commonAPI("GET",`${SERVER_URL}/home-Recipe`,"","")
}

export const recentRecipeAPI = async () => {
    return await commonAPI("GET",`${SERVER_URL}/recent-recipe`,"","")
}

export const getuserRecipeAPI = async(reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/userRecipe`,"",reqHeader)
}

export const deleteUserRecipeAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE",`${SERVER_URL}/deleteRecipe/${id}`,{},reqHeader)
}

export const getRecipieByPidAPI = async(id,reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/userRecipeByPid/${id}`,"",reqHeader)
}

export const editRecipieAPI = async(id,reqBody,reqHeader) => {
    return await commonAPI("PUT",`${SERVER_URL}/Recipe/edit/${id}`,reqBody,reqHeader)
}

export const likeAPI = async(pid,reqHeader) => {
    return await commonAPI("POST",`${SERVER_URL}/likepost/${pid}`,"",reqHeader)
}

export const getLikesAPI = async(pid,reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/getlikes/${pid}`,"",reqHeader)
}

export const postCommentAPI = async(pId,reqBody,reqHeader) => {
    return await commonAPI("POST",`${SERVER_URL}/addComment/${pId}`,reqBody,reqHeader)
}

export const getPostCommentAPI = async(pId,reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/getPostcomments/${pId}`,"",reqHeader)
}

export const deleteCommentAPI = async(reqBody,reqHeader) => {
    return await commonAPI("DELETE",`${SERVER_URL}/deleteComment`,reqBody,reqHeader)
}

export const editCommentAPI = async(reqBody,reqHeader) => {
    return await commonAPI("PUT",`${SERVER_URL}/editComment`,reqBody,reqHeader)
}

export const likeCommentAPI = async(reqBody,reqHeader) => {
    return await commonAPI("POST",`${SERVER_URL}/likeComment`,reqBody,reqHeader)
}

export const deleteAccountAPI = async(reqBody,reqHeader) => {
    return await commonAPI("DELETE",`${SERVER_URL}/deleteAccount`,reqBody,reqHeader)
}

export const updateProfileAPI = async (reqBody,reqHeader) => {
    return await commonAPI("PUT",`${SERVER_URL}/editProfile`,reqBody,reqHeader)
}

export const getAllUsersAPI = async(queryParams,reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/getAllUsers?${queryParams}`,"",reqHeader)
}

export const getAllPostsAPI = async(queryParams,reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/getAllPosts?${queryParams}`,"",reqHeader)
}

export const getAllCommentsAPI = async(queryParams,reqHeader) => {
    return await commonAPI("GET",`${SERVER_URL}/getAllComments?${queryParams}`,"",reqHeader)
}

export const googleLoginAPI = async(reqBody)=>{
return await commonAPI("POST",`${SERVER_URL}/googleLogin`,reqBody,"")
}