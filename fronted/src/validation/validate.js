import toast from "react-hot-toast"
export const validateUsername=async(values)=>{
    const errors=varifyUsername({},values)
    return errors;
}
export const validatePassword=async(values)=>{
    const errors=varifyPassword({},values)
    return errors;
}
const varifyUsername=(error= {},values)=>{
    if(!values.username){
        error.username=toast.error("Username is required...")
    }
    else if(values.username.includes(" ")){
        error.username=toast.error("Space is not allowed...")
    }
return error;
}

const varifyPassword=(error= {},values)=>{
    const specialChar=/`!@#$%^&*?~/
    if(!values.password){
        error.password=toast.error("Password is required...")
    }
    else if(values.password.includes(" ")){
        error.password=toast.error("Space is not allowed...")
    }
    else if(values.password.length<6){
        error.password=toast.error("Password is short")
    }
    else if(!specialChar.test(values.password)){
        error.password=toast.error("Password should have special character...")
    }
return error;
}

export const resetPassword=async(values)=>{
    const error=varifyPassword({},values)
    if(values.password!==values.CNFpassword)
    error.exist=toast.error("Password not matched...")
return error;
}
export const validateRegister=async(values)=>{
    const errors=varifyUsername({},values)
    varifyPassword(errors,values)
    varifyEmail(errors,values)
    return errors;
}
const varifyEmail=(error={},values)=>{
    if(!values.email){
        error.email=toast.error("Email is required...")
    }
    else if(values.email.includes(" ")){
        error.email=toast.error("Email is required...")
    }
    else if(/^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-Z][2,4]$/i.test(values.email)){
        error.email=toast.error("Invalid email address...")
    }
    return error;
}
export const profileValidate=(values)=>{
    const errors=varifyEmail({},values)
    return errors;
}