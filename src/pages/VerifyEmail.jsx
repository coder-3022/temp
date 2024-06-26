import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';

const VerifyEmail = () => {

    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(!signupData){
            navigate("/signup");
        }
    },[]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const  {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }

  return (
    <div className=' text-white'>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit}>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} 
                            className=' bg-richblack-800'/>}
                        />
                        <button type='submit'>
                            Verify Email
                        </button>
                    </form>

                    <div>

                        <div>
                            <Link to="/signup">
                                Back to signup
                            </Link>

                        </div>

                        <button
                            onClick={() => dispatch(sendOtp(signupData.email,navigate))}
                        >
                            Resend it
                        </button>


                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail