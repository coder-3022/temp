import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const {loading} =useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }


  return (
    <div className=' text-white flex'>
        {
            loading ? (
                <div>loading.....</div>
            ) : (
                <div>
                    <h1>
                        {
                            !emailSent ? "Reset Your Password" : "Check Your Email" 
                        }
                    </h1>
                    <p>
                        {
                            !emailSent ? "reset ka paragraph add hoga " : `mail sent wala paragraph add hoga ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p>Email Address*</p>
                                    <input type="email" 
                                        required
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter Your Email'
                                    />
                                </label>
                            )
                        }

                        <button type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>


                    </form>

                    <div>
                        <Link to="/login">
                            Back to Login
                        </Link>

                    </div>

                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword