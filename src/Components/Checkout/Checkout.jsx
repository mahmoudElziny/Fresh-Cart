import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Cart from '../Cart/Cart';
import { CartContext } from '../../Contexts/cartContext';

export default function Checkout() {

  let {checkoutPayment} = useContext(CartContext);

  let data = useParams();

  let validationSchema = Yup.object({
    phone: Yup.string().required('Phone is required').matches(/^01[0-2,5]{1}[0-9]{8}$/,"enter valid phone"),
    city: Yup.string().required('City is required').matches(/^[\w-]{3,}$/,"enter valid city"),
    details: Yup.string().required('Address Details is required').matches(/^[\w-]{3,}$/,"enter valid address details"),
  });

  let formik = useFormik({
    initialValues: {
      phone: "" ,
      city: "",
      details: "" ,
    },
    onSubmit: checkoutPaymentdata,
    validationSchema
  })

  async function checkoutPaymentdata(value){ 
      let req = await checkoutPayment(data.id, value).catch( (err) => {});
      if(req.data.status == 'success'){
        window.open(req.data.session.url, "_self");
      }
  }

  return (
    <div className='w-75 mx-auto my-5'>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control' placeholder='Enter City' name='city'/>
          {formik.touched.city && formik.errors.city ? <p className='text-danger'>{formik.errors.city}</p> : null}
        </div>
        <div className="mb-3">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control' placeholder='Enter Phone' name='phone'/>
          {formik.touched.phone && formik.errors.phone ? <p className='text-danger'>{formik.errors.phone}</p> : null}
        </div>
        <div className="mb-3">
          <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' placeholder='Enter Address Details' name='details'></textarea>
          {formik.touched.details && formik.errors.details ? <p className='text-danger'>{formik.errors.details}</p> : null}
        </div>
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white d-block w-100'>Pay <i className='fa-brands fa-cc-visa mx-2'></i></button>
      </form>
    </div>
  )
}
