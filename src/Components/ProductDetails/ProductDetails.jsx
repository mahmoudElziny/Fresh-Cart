import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../Contexts/cartContext';
import Swal from 'sweetalert2';

export default function ProductDetails() {

    let { addToCart, setItemNum } = useContext(CartContext);
    let { _id } = useParams();
    let [productId, setProductId] = useState();

    useEffect(() => {
        setProductId(_id);
    }, []);

    let { data, isLoading } = useQuery(["productDetails", productId], getProductDetails);

    let product = data?.data.data;

    function getProductDetails(query) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${query.queryKey[1]}`);
    }

    function getImageSrc(e) {
        let imgPath = e.target.getAttribute("src");
        document.querySelector("#myImg").setAttribute("src", imgPath);
    }

    async function AddToCart(id) {
        let req = await addToCart(id).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: err.message,
                text: "something went wrong"
            });
        });
        if (req.data.status == 'success') {
            setItemNum(req.data.numOfCartItems);
            Swal.fire({
                icon: 'success',
                title: 'Added To Cart',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <>
            {isLoading ?
                <Spinner /> :
                <div className='container py-5'>
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="row g-1 align-items-center">
                                <div className="col-md-2">
                                    {product.images.map((e) => {
                                        return (
                                            <img src={e} className='w-100' id='imgs' onClick={getImageSrc} alt="" />
                                        )
                                    })}
                                </div>
                                <div className="col-md-10">
                                    <img src={product.imageCover} className='w-100' id='myImg' alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <h2>{product.title}</h2>
                            <p className='text-muted my-3'>{product.description}</p>
                            <h6 className='text-main'>{product.category.name}</h6>
                            <div className='d-flex justify-content-between'>
                                <span>{product.price}EGP</span>
                                <span><i className='fa-solid fa-star rating-color'></i> {product.ratingsAverage} </span>
                            </div>
                            <button onClick={() => AddToCart(product._id)} className='btn bg-main text-white d-block w-100 my-3'> + add to cart</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}
