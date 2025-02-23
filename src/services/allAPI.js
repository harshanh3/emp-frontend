import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

// register 
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

 // add emp details 
export const addEmpDetailsAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-emp`,reqBody,reqHeader)
}
// dashboard
export const allempdetailsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/dash`,{},reqHeader)
}
// delete 
export const empRemoveAPI = async (id,reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/emp/${id}/remove`,{},reqHeader)
}