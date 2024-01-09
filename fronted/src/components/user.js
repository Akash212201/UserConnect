import { Link } from 'react-router-dom'
import './style/user.css'
import { useFormik } from 'formik'
import {Toaster} from 'react-hot-toast'
import { validateUsername } from '../validation/validate'

const User = () => {
    const formik=useFormik({
        initialValues : {
            username: ''
        },
        validate: validateUsername,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values=>{
            console.log(values)
        }
    })
  return (
    <div className="container">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="profile-box">
            <div className="title">
                <h4>Hello Again</h4>
                <span className="title-span">Explore More</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="profile">
                    <img src="./logo192.png" alt="" />
                </div>
                <div className="textbox">
                    <input {...formik.getFieldProps('username')} type="text" placeholder="Username" />
                    <button type='submit'>Send</button>
                </div>
                <div className="register">
                    <span>Not a member? <Link to="/register">Register Here</Link></span>
                </div>
            </form>
        </div>
    </div>
  )
}

export default User