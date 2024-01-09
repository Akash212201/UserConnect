import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import {Toaster} from 'react-hot-toast'
import { resetPassword } from '../validation/validate'
import './style/user.css'

const Reset = () => {
    useAuthStore
    const formik=useFormik({
        initialValues : {
          password: '',
          CNFpassword: ''
        },
        validate: resetPassword,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values=>{
           let resetPromise = resetPassword({username})

        }
    })
  return (
    <div className="container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="profile-box">
            <div className="title">
                <h4>Reset Password</h4>
                <span className="title-span">Enter New Password</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="profile">
                </div>
                <div className="textbox">
                    <input {...formik.getFieldProps('password')} type="password" placeholder="New Password" />
                    <input {...formik.getFieldProps('CNFpassword')} type="password" placeholder="Confirm Password" />
                    <button type='submit'>Reset</button>
                </div>
                <div className="register">
                    <span>Forget Password? <Link to="/recover">Recover Now</Link></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Reset