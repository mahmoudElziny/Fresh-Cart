import React from 'react';
import appStoreImg from '../../assets/images/App_Store_(iOS)-Badge-Logo.wine.png';
import googleStoreImg from '../../assets/images/Google_Play-Badge-Logo.wine.png';
import amazonpayImg from '../../assets/images/amazon-pay.png';
import americanExpressImg from '../../assets/images/d68688491084b57d8db55b94821bbed9.png';
import masterCardImg from '../../assets/images/e90409e1e8f989e4a2938a179cb79bbe.png';
import paypalImg from '../../assets/images/pngwing.com.png';





export default function Footer() {
  return (
    <>
      <div className="footer bg-body-tertiary">
        <div className="container py-5">
          <h4 className='fw-bold'>Get FreshCart App </h4>
          <p className='text-muted'>We will send you a link, open on your phone to download the app.</p>
          <form className='d-flex justify-content-evenly'>
            <input className='form-control w-75' type="email" placeholder='Enter your email' />
            <button className='btn bg-main text-white'>Share App Link</button>
          </form>
          <div className='footer-line my-4'></div>
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <h6 className='fw-bold'>Payment Partners</h6>
              <img className='amazon-pay ms-3' src={amazonpayImg} alt="amazonpayImg" />
              <img className='american-express' src={americanExpressImg} alt="americanExpressImg" />
              <img className='master-card' src={masterCardImg} alt="masterCardImg" />
              <img className='paypal' src={paypalImg} alt="paypalImg" />
            </div>
            <div className='d-flex align-items-center'>
              <h6 className='fw-bold'>Get deliveries with FreshCart</h6>
              <img className='app-store ' src={appStoreImg} alt="appStore" />
              <img className='google-store' src={googleStoreImg} alt="google store" />
            </div>
          </div>
          <div className='footer-line my-4'></div>
        </div>
      </div>

    </>
  )
}
