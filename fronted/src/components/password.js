import { Link } from 'react-router-dom'
import './style/user.css'
import { useFormik } from 'formik'
import toast, {Toaster} from 'react-hot-toast'
import { validatePassword } from '../validation/validate'
import useFetch from '../hooks/fetch.hook'
import { verifyPassword } from '../validation/helper'

const Password = () => {
    const {username}=useAutostore(state=>state.auth)
    const [{isLoading,apiData,serverError}]=useFetch(`/user${username}`)
    const formik=useFormik({
        initialValues : {
          password: ''
        },
        validate: validatePassword,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values=>{
            let loginPromise=verifyPassword({username,password:values.password})
            toast.promise(loginPromise,{
                loading: 'Checking...',
                success: <b>Login SuccessFully</b>,
                error: <b>Couldn't login user</b>
              });
        }
    })
    if(isLoading)
    return <h1>isLoading</h1>
    if(serverError)
    return <h1>[serverError.message]</h1>
  return (
    <div className="container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="profile-box">
            <div className="title">
                <h4>"Hello {apiData?.firstName || apiData?.username}"</h4>
                <span className="title-span">Explore More</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="profile">
                    <img src={apiData?.profile} alt="" />
                </div>
                <div className="textbox">
                    <input {...formik.getFieldProps('password')} type="password" placeholder="Password" />
                    <button type='submit'>Sign In</button>
                </div>
                <div className="register">
                    <span>Forget Password? <Link to="/recover">Recover Now</Link></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Password