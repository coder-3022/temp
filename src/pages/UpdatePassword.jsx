import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password:'',
        confirmPassword:''
    })
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData( (prevData) => (
            {
                ...prevData,
                [e.target.name] :e.target.value,
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token))
    }


  return (
    <div>
        {
            loading ? (
                <div>Loading....</div>
            ) : (
                <div>
                    <h1>choose new Password</h1>
                    <p>Almost done. Enter your password and youre all set.</p>

                    <form onSubmit={handleOnSubmit}>

                        <label>
                            <p className=' text-[0.875rem] text-richblack-5 mb-1
                            leading-[1.375rem]'>Password <sup className=' text-pink-200'>*</sup> </p>
                            <input type={showPassword ? ("text"): ("password")}
                                required
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Enter Password'
                                name='password'
                                style = {{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                                className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5
                                w-full p-[12px]'
                            />

                            <span className=' absolute right-3 top-[38px] cursor-pointer'
                                onClick={() => setShowPassword((prev) => !prev)}>
                                    {
                                        showPassword ? (<AiOutlineEyeInvisible fontSize= {24} fill ="#AFB2BF" />) 
                                        : (<AiOutlineEye fontSize= {24} fill ="#AFB2BF" />)
                                    }
                            </span>
                        </label>

                        <label className=' relative'>   
                            <p className=' mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                Confirm Password 
                                <sup className=' text-pink-200'>*</sup>
                            </p>
                            <input type={showConfirmPassword ? ("text") : ("password")}
                                required
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm Password'
                                name='confirmPassword'
                                style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
                                className=' bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                            />

                            <span className=' absolute right-3 top-[38px] cursor-pointer'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    {
                                        showConfirmPassword ? (<AiOutlineEyeInvisible fontSize= {24} fill ="#AFB2BF" />) 
                                        : (<AiOutlineEye fontSize= {24} fill ="#AFB2BF" />)
                                    }
                            </span>

                        </label>

                        <button type='submit'
                        className=' bg-yellow-50 rounded-[8px] font-medium
                        text-richblack-900 px-[12px] py-[8px] mt-6'>
                            Reset Password
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

export default UpdatePassword