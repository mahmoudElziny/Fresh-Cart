import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; 

export default function Register() {

  let navigate = useNavigate();
  let [errMessage, setErrMessage ] = useState(''); 
  let [loading, setLoading] = useState(true);
  async function registerForm(value){
    setLoading(false);
      let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value)
      .catch(function (err) { 
        setErrMessage(err.response.data.message);
        setLoading(true)
      });
      if(req?.data.message == 'success'){
        setLoading(true);
        navigate('/Fresh-Cart/login');
      }
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, "min character is 3").max(16, "max character is 16"),  
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Enter valid Password"),
    rePassword: Yup.string().required("Re Password is required").oneOf([Yup.ref('password')], 'Password does not match'),
    phone: Yup.string().required('Phone is required').matches(/^01[0-2,5]{1}[0-9]{8}$/),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    onSubmit: registerForm,
    validationSchema
  }) 

  return (
    <div className='m-5'>
      <h2>Register Now :</h2>
      {errMessage != "" ? <div className='alert alert-danger'>{errMessage}</div>: ""}
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">Name:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='name' type="text" id='name'/>
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>
          {formik.errors.name}
        </div>: ""}

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

        <label htmlFor="rePassword">rePassword:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='rePassword' type="password" id='rePassword'/>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>
          {formik.errors.rePassword}
        </div>: ""}

        <label htmlFor="phone">Phone:</label>
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control mb-3' name='phone' type="tel" id='phone'/>
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>
          {formik.errors.phone}
        </div>: ""}
        
        {loading ? <button disabled={!(formik.isValid && formik.dirty)} className=' btn text-white mt-3 bg-main' type='submit'>Register</button>
        : <button className=' btn text-white mt-3 ms-1 bg-main' type='button'> <i className='fa-solid fa-spinner fa-spin'></i></button> }
        
      </form>
    </div>
  )
}
