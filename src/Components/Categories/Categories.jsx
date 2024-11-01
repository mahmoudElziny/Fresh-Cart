import axios from 'axios';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export default function Categories() {

  let [page, setPage] = useState(1);

  function getAllCategories(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories?page=${queryData.queryKey[1]}`);
  }

  let { isLoading, isError, isFetching, data } = useQuery(['categoriesAPI', page], getAllCategories);

  function getPageNumber(event) {
    let page = event.target.getAttribute('pagenum');
    setPage(page);
  }


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name='description' content='Categories' />
        <title>FreshCart | Categories</title>
      </Helmet>
      {isLoading ?
        <Spinner />
        : <>
          <div className='container py-5'>
            <div className="row g-5">
              {data?.data.data.map((e) => {
                return (
                  <div key={e._id} className="col-md-2">
                    <div className="product cursor-pointer p-2 position-relative">
                        <img src={e.image} alt="" className="w-100" />
                        <h5>{e.name}</h5>
                    </div>
                  </div>
                )
              })}

            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center my-5">
                <li className="page-item"><a className="page-link" onClick={() => { setPage(page - 1) }} >Previous</a></li>
                <li className="page-item"><a className="page-link" pagenum='1' onClick={getPageNumber} >1</a></li>
                <li className="page-item"><a className="page-link" pagenum='2' onClick={getPageNumber} >2</a></li>
                <li className="page-item"><a className="page-link" onClick={() => { setPage(page + 1) }}  >Next</a></li>
              </ul>
            </nav>
          </div>
        </>
      }
    </>)
}
