import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';

export default function Home() {

  let [productList, setProductList] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts();
  }, [])

  async function getAllProducts() {
    setLoading(true);
    let req = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    setProductList(req.data.data);
    setLoading(false);
  }

  return (
    <>
      {loading ?
        <Spinner /> :
        <div className='container py-5'>
          <div className="row g-5">
            {productList.map((e) => {
              return (
                <div className="col-md-2">
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
