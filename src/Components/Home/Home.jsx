import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import { useQuery } from 'react-query';

export default function Home() {

  function getAllProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let {isLoading, isError, isFetching, data} = useQuery('productsAPI', getAllProducts);

  return (
    <>
      {isLoading ?
        <Spinner /> :
        <div className='container py-5'>
          <div className="row g-5">
            {data?.data.data.map((e) => {
              return (
                <div key={e._id} className="col-md-2">
                  <div className="product">
                    <img src={e.imageCover} alt="" className="w-100" />
                    <h6 className='text-main'>{e.category.name}</h6>
                    <h5>{e.title.split(" ").slice(0, 2).join(" ")}</h5>
                    <div className='d-flex justify-content-between'>
                      <span>{e.price}EGP</span>
                      <span><i className='fa-solid fa-star rating-color'></i> {e.ratingsAverage} </span>
                    </div>
                    <button className='btn bg-main text-white d-block w-100'>Add Product</button>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      }



    </>
  )
}
