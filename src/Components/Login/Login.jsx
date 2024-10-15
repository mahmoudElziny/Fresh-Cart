import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 

export default function Login() {

  let navigate = useNavigate();
  let [errMessage, setErrMessage ] = useState(''); 
  let [loading, setLoading] = useState(true);
  async function loginForm(value){
    setLoading(false);
      let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value)
      .catch(function (err) { 
        setErrMessage(err.response.data.message);
        setLoading(true)
      });
      if(req?.data.message == 'success'){
        navigate('/home');
        setLoading(true);
      }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Enter valid Password"),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: loginForm,
    validationSchema
  }) 

  return (
    <div className='m-5'>
      <h2>Login Now :</h2>
      {errMessage != "" ? <div className='alert alert-danger'>{errMessage}</div>: ""}
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='email' type="email" id='email'/>
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>
          {formik.errors.email}
        </div>: ""}

        <label htmlFor="password">Password:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='password' type="password" id='password'/>
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>
          {formik.errors.password}
        </div>: ""}
        
        {loading ? <button disabled={!(formik.isValid && formik.dirty)} className=' btn text-white mt-3 bg-main' type='submit'>Login</button>
        : <button className=' btn text-white mt-3 ms-1 bg-main' type='button'> <i className='fa-solid fa-spinner fa-spin'></i></button> }
        
      </form>
    </div>
  )
}
