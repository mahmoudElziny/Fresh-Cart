import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function ProductDetails() {

    let { _id } = useParams();
    let [productId, setProductId] = useState();

    useEffect(() => {
        setProductId(_id);
    }, []);

    let { data, isLoading } = useQuery(["productDetails",productId], getProductDetails );

    let product = data?.data.data;

    function getProductDetails(query) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${query.queryKey[1]}`);
    }

    return (
        <>
            {isLoading ?
                <Spinner /> :
                <div className='container py-5'>
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <img src={product.imageCover} className='w-100' alt="" />
                        </div>
                        <div className="col-md-9">
                            <h2>{product.title}</h2>
                            <p className='text-muted my-3'>{product.description}</p>
                            <h6 className='text-main'>{product.category.name}</h6>
                            <div className='d-flex justify-content-between'>
                                <span>{product.price}EGP</span>
                                <span><i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage} </span>
                            </div>
                            <button className='btn bg-main text-white d-block w-100 my-3'> + add to cart</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}
