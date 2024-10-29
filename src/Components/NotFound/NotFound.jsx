import React from 'react';
import notFound from '../../assets/images/error.svg'
import { Helmet } from 'react-helmet';

export default function NotFound() {
  return (
    <>
    <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content='Not found'/>
                <title>FreshCart | Not found</title>
    </Helmet>
    <div className='d-flex justify-content-center align-content-center'>
      <img src={notFound} alt="notFound" />
    </div>
    </>)
}
