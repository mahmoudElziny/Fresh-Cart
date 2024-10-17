import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ResetPassword() {

    let [loading, setLoading] = useState(true);
    let [errMessage, setErrMessage] = useState('');
    let navigate = useNavigate();

    let validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        newPassword: Yup.string().required('New Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Enter valid Password"),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        onSubmit: ResetPasswordApi,
        validationSchema
    });

    async function ResetPasswordApi(value){
        setLoading(false);
        let req = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,value)
        .catch((err)=>{
        setErrMessage(err.response.data.message);
        setLoading(true);
        });

        if(req.data.token){
            setLoading(true);
            navigate('/login');
        }
    }

    return (
        <div className='m-5'>
            <h2>Reset Password :</h2>
            {errMessage != "" ? <div className='alert alert-danger'>{errMessage}</div> : ""}
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='email' type="email" id='email' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
                    {formik.errors.email}
                </div> : ""}

                <label htmlFor="newPassword">New Password:</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='newPassword' type="password" id='newPassword' />
                {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>
                    {formik.errors.password}
                </div> : ""}

                {loading ? <button disabled={!(formik.isValid && formik.dirty)} className=' btn text-white mt-3 bg-main' type='submit'>Update Password</button>
                    : <button className=' btn text-white mt-3 ms-1 bg-main' type='button'> <i className='fa-solid fa-spinner fa-spin'></i></button>}

            </form>
        </div>
    )
}
