import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import { generateOTP, varifyOTP } from '../validation/helper'
import './style/user.css'
import { useNavigate } from 'react-router-dom'

const Recover = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState()
  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP)
        return toast.success("OTP has been send to your email")
      return toast.error("Problem occur while generating OTP")
    })
  }, [username])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let { status } = await varifyOTP({ username, code: OTP })
      if (status === 201) {
        toast.success("👍 Varify Successfully")
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error("Wrong OTP! Enter again")
    }
  }

  const resendOTP = () => {
    let sendPromise = generateOTP(username)
    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email</b>,
      error: <b>Couldn't send OTP</b>
    });
    sendPromise.then(OTP => console.log(OTP))
  }

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="profile-box">
        <div className="title">
          <h4>Recovery</h4>
          <span className="title-span">Enter OTP to Recover Password</span>
        </div>
        <form onSubmit={onSubmit}>
          <div className="profile">

          </div>
          <div className="textbox">
            <span>Enter OTP receive at your registered mail</span>
            <input type="password" onChange={(e) => setOTP(e.target.value)} placeholder="OTP" />
            <button type='submit'>Recover</button>
          </div>
        </form>
        <div className="register">
          <span>Didn't receive OTP? <button onSubmit={resendOTP} style={{ fontsize: 10 + "px" }}>Resend</button></span>
        </div>
      </div>
    </div>
  )
}

export default Recover