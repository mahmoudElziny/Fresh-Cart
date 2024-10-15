import React from 'react';
import notFound from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='d-flex justify-content-center align-content-center'>
      <img src={notFound} alt="notFound" />
    </div>
  )
}
