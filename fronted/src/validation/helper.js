import axios from 'axios';
import jwt_decode from 'jwt-decode';
axios.defaults.baseURL='http://localhost:8080';

export const getUsername=async()=>{
    const token=localStorage.getItem('token');
    if(!token)
    return Promise.reject("Cannot find token");
    let decode=jwt_decode(token)
    return decode;
}
export const authenticate= async(username)=>{
    try {
        return await axios.post('/api/authenticate',{username})
    } catch (error) {
        return {error: "Username does not exist..."}
    }
}
export const getUser= async(username)=>{
    try {
       const {data} =await axios.get(`/api/user/${username}`)
       return data;
    } catch (error) {
        return {error: "Password didn't match..."}
    }
}
export const registerUser= async(credentials)=>{
    try {
        const {data: {msg},status}= await axios.post(`/api/register`,credentials)
        let {email,username}=credentials;
        if(status===201){
            await axios.post('/api/registerMail',{username,userEmail:email,text:msg})
        }
    } catch (error) {
        return Promise.reject({error})
    }
}

export const verifyPassword= async({username,password})=>{
    try {
        if(username){
            const {data} =await axios.get('/api/login',{username,password})
            return Promise.resolve({data})
        }
    } catch (error) {
        return Promise.reject({error: "Password didn't match..."})
    }
}
export const updateUser= async(response)=>{
    try {
            const {token} =await localStorage.getItem('token');
            const {data} =await axios.put('/api/updateUser',response,{headers: {"Authorization": `Bearer ${token}`}})
            return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error: "Couldn't update profile..."})
    }
}
export const generateOTP= async(username)=>{
    try {
        if(username){
            const {data: {code},status} =await axios.get('/api/generateOtp',{params: {username}})
            if(status===201){
                let {data: {email}} = await getUser({username})
                let text=`Your password recovery OTP is ${code}. Verify and recover your password`;
                await axios.post('/api/registerMail',{username,userEmail:email,text,subject:"Password Recovery OTP"});
            }
            return Promise.resolve({code});
        }
    } catch (error) {
        return Promise.reject({error})
    }
}
export const varifyOTP= async({username,code})=>{
    try {
            const {data,status} =await axios.get('/api/varifyOTP',{params: {username,code}})
            return {data,status};
    } catch (error) {
        return Promise.reject({error})
    }
}
export const resetPassword= async({username,password})=>{
    try {
            const {data,status} =await axios.put('/api/resetPassword',{params: {username,password}})
            return Promise.reject({data,status});
    } catch (error) {
        return Promise.reject({error})
    }
}