import React from 'react'
import './Spinner.module.css'

export default function Spinner() {
   return (
      <div className="loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 bottom-0 start-0">
         <i className='fa-solid fa-spinner fa-spin text-main fs-3'></i>
      </div>
   )
}
