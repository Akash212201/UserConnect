import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast'
import { profileValidate } from '../validation/validate'
import { updateUser } from '../validation/helper'
import Convert from '../validation/convert'
import useFetch from '../hooks/fetch.hook'
import './style/user.css'

const Profile = () => {
  const [file,setFile]=useState();
  const [{isLoading,apiData,serverError}]=useFetch(`/user${username}`)

  const navigate= useNavigate()

  const formik = useFormik({
    initialValues: {
      firstname: apiData?.firstname || '',
      lastname: apiData?.lastname || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values= await Object.assign(values, {Profile:file || apiData?.file || ''})
      let updatePromise = updateUser(values)
      toast.promise(updatePromise,{
        loading: 'Updating...',
        success: <b>Update SuccessFully</b>,
        error: <b>Couldn't update user details</b>
      });
    }
  })
//handler for file upload
  const onUpload=async e=>{
    const base64 =await Convert(e.target.files[0]);
    setFile(base64)

  }
//logout handler
const userLogout=()=>{
  localStorage.removeItem('token')
  navigate('/');
}

  if(isLoading)
    return <h1>isLoading</h1>
    if(serverError)
    return <h1>[serverError.message]</h1>
  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="profile-box">
        <div className="title">
          <h4>Profile</h4>
          <span className="title-span">Register your Profile Here</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="profile">
            <label htmlFor="Profile">
              <img src={apiData?.profile || file} alt="" />
            </label>
            <input type="file" id="Profile" name="Profile" onChange={onUpload}/>
          </div>
          <div className="textbox">
            <div className="name">
            <input {...formik.getFieldProps('firstName')} type="text" placeholder="First Name" />
            <input {...formik.getFieldProps('LastName')} type="text" placeholder="Last Name" />
            </div>
            <div className="name">
            <input {...formik.getFieldProps('email')} type="email" placeholder="Email Here" />
            <input {...formik.getFieldProps('mobile')} type="number" placeholder="Mobile Number" />
            </div>
            <input {...formik.getFieldProps('address')} type="text" placeholder="Enter your address here" />
            <button type='submit'>Update Profile</button>
          </div>
          <div className="register">
            <span>Come back later? <Link to="/" onClick={userLogout}>Logout</Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile