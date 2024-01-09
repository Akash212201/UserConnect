import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { validateRegister } from '../validation/validate'
import Convert from '../validation/convert'
import './style/user.css'
import { registerUser } from '../validation/helper'

const Register = () => {
  const navigate=useNavigate();
  const [file,setFile]=useState();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: validateRegister,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values= await Object.assign(values, {Profile:file || ''})
      let registerPromise = registerUser(values);
      toast.promise(registerPromise,{
      loading: 'Creating...',
      success: <b>Register SuccessFully</b>,
      error: <b>Couldn't register user</b>
    });
    registerPromise.then(function(){navigate('/')})
    }
  })

  

  const onUpload=async e=>{
    const base64 =await Convert(e.target.files[0]);
    setFile(base64)

  }
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="profile-box">
        <div className="title">
          <h4>Register</h4>
          <span className="title-span">Happy to Join with You</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="profile">
            <label htmlFor="Profile">
              <img src={file} alt="" />
            </label>
            <input type="file" id="Profile" name="Profile" onChange={onUpload}/>
          </div>
          <div className="textbox">
          <input {...formik.getFieldProps('email')} type="email" placeholder="Email Here*" />
            <input {...formik.getFieldProps('username')} type="text" placeholder="Enter username*" />
            <input {...formik.getFieldProps('password')} type="password" placeholder="Enter Password*" />
            <button type='submit'>Register</button>
          </div>
          <div className="register">
            <span>Already Register? <Link to="/">Sign In Here</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register