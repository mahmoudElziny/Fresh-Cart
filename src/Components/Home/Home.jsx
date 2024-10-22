import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import { useQuery } from 'react-query';

export default function Home() {

  let [page, setPage] = useState(1);

  function getAllProducts(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`);
  }
  let { isLoading, isError, isFetching, data } = useQuery(['productsAPI', page], getAllProducts);

  function getPageNumber(event){
    let page = event.target.getAttribute('pageNum');
    setPage(page)
  }

  return (
    <>
      {isLoading ?
        <Spinner /> :
        <div className='container py-5'>
          <div className="row g-5">
            {data?.data.data.map((e) => {
              return (
                <div key={e._id} className="col-md-2">
                  <div className="product p-2">
                    <img src={e.imageCover} alt="" className="w-100" />
                    <h6 className='text-main mt-2'>{e.category.name}</h6>
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
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center my-5">
              <li className="page-item"><a className="page-link" onClick={()=>{setPage(page-1)}} >Previous</a></li>
              <li className="page-item"><a className="page-link"  pageNum ='1' onClick={getPageNumber} >1</a></li>
              <li className="page-item"><a className="page-link"  pageNum ='2' onClick={getPageNumber} >2</a></li>
              <li className="page-item"><a className="page-link" onClick={()=>{setPage(page+1)}}  >Next</a></li>
            </ul>
          </nav>
        </div>
      }



    </>
  )
}
