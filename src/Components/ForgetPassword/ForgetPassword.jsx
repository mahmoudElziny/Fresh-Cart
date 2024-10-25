import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function ForgetPassword() {

  let [errMessage, setErr] = useState('');
  let [formStatus, setFormStatus] = useState(true);
  let navigate = useNavigate();

  let validtionSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  let validtionSchema2 = Yup.object({
    resetCode: Yup.string().required('resetCode required').matches(/^[0-9]{5,6}$/),
  });

  let Formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: ForgetPasswordApi, 
    validtionSchema 
  });

  let Formik2 = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: verifyResetCode , 
    validtionSchema: validtionSchema2
  });

  async function ForgetPasswordApi(value){
      let req = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value)
      .catch((err) => {
        setErr(err.response.data.message);
      });
      if(req.data.statusMsg == 'success'){
        setFormStatus(false);
      }
  }

  async function verifyResetCode(value){
    let req = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value)
    .catch((err) => {
      setErr(err.response.data.message);  
    });
    if(req.data.status == 'Success'){
      navigate('Fresh-Cart/resetPassword');
    }
  }


  return (
    <div className='m-5'>

      {errMessage ? <div className='alert alert-danger'>{errMessage}</div> : ""}

      {formStatus ?
      <form onSubmit={Formik.handleSubmit}>
      <label htmlFor='email'>Enter Your Email</label>
      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control mb-3' name='email' type="email" id='email'/>
      <button type='submit' className='btn bg-main text-white'>Send</button>
    </form> :
      <form onSubmit={Formik2.handleSubmit} className='mt-5'>
        <label htmlFor='resetCode'>Enter Reset Code</label>
        <input value={Formik2.values.resetCode} onBlur={Formik2.handleBlur} onChange={Formik2.handleChange} className='form-control mb-3' name='resetCode' type="resetCode" id='resetCode'/>
        {Formik2.errors.resetCode && Formik2.touched.resetCode ?
        <div className='alert alert-danger'>{Formik2.errors.resetCode}</div> : ""}
        <button type='submit' className='btn bg-main text-white'>Verify Code</button>
      </form>
    }
      
    </div>
  )
} 
