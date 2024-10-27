import axios from 'axios'
import React, { useContext, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { CartContext } from '../../Contexts/cartContext';
import Swal from 'sweetalert2';

export default function Home() {
  
  let {addToCart, setItemNum} = useContext(CartContext);

  let [page, setPage] = useState(1);

  function getAllProducts(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`);
  }
  let { isLoading, isError, isFetching, data } = useQuery(['productsAPI', page], getAllProducts);

  function getPageNumber(event) {
    let page = event.target.getAttribute('pagenum');
    setPage(page);
  }

  async function AddToCart(id){
    let req = await addToCart(id).catch( (err)=>{
      Swal.fire({
        icon: 'error',
        title: err.message,
        text: "something went wrong"
      });
    } );

    if(req.data.status == 'success'){
      setItemNum(req.data.numOfCartItems);
      Swal.fire({
        icon: 'success',
        title: 'Added To Cart',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  function addToWishlist(e, id){
    if(e.target.classList.contains('fa-regular')){
      e.target.classList.replace('fa-regular', 'fa-solid');
    }else {
      e.target.classList.replace('fa-solid', 'fa-regular');
    } 
  }

  return (
    <>
      {isLoading ?
        <Spinner /> :
        <>
        <MainSlider></MainSlider> 
        <CategorySlider></CategorySlider>
        <div className='container py-5'>
          <div className="row g-5">
            {data?.data.data.map((e) => {
              return ( 
                <div key={e._id} className="col-md-2">
                  <div className="product cursor-pointer p-2 position-relative">
                    <Link to={`/Fresh-Cart/productDetails/${e._id}`}>
                      <img src={e.imageCover} alt="" className="w-100" />
                      <h6 className='text-main mt-2'>{e.category.name}</h6>
                      <h5>{e.title.split(" ").slice(0, 2).join(" ")}</h5>
                      <div className='d-flex justify-content-between'>
                        <span>{e.price}EGP</span>
                        <span><i className='fa-solid fa-star rating-color'></i> {e.ratingsAverage} </span>
                      </div>
                    </Link>
                    <i onClick={(e) => { addToWishlist(e,e._id) }} className='fa-regular fa-heart fs-4 position-absolute top-0 end-0 m-3 text-danger'></i>
                    <button onClick={()=>{AddToCart(e._id)}}  className='btn bg-main text-white d-block w-100'>Add To Cart</button>
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
    </>
  )
}
