import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Contexts/cartContext';
import Spinner from '../Spinner/Spinner';
import { NavLink } from 'react-router-dom';

export default function Cart() {

  let { getUserCart, updateCart, removeFromCart, clearCart, setItemNum, itemNum } = useContext(CartContext);

  let [cartData, setCartData] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    setLoading(true);
    let req = await getUserCart().catch((err) => {
      if (err.response.data.statusMsg == 'fail') {
        setCartData(null);
        setLoading(false);
      }
    });
    if (req?.data?.status == 'success') {
      setLoading(false);
      if(req?.data?.numOfCartItems == 0){
        setItemNum(0);
      }else{
        setCartData(req?.data?.data);
      }
      
            
    }
  }

  async function removeItemCart(id) {
    let req = await removeFromCart(id).catch((err) => { });
    if (req.data.status == 'success') {
      setItemNum(req.data.numOfCartItems);
      setCartData(req?.data?.data);
    }
  }

  async function clearCartData() {
    let req = await clearCart().catch((err) => { });
    if (req?.data?.message == 'success') {
      setCartData(null);
    }
  }

  async function updateCartItem(id, count) {
    if (count == 0) {
      removeItemCart(id);
    } else {
      let req = await updateCart(id, count).catch((err) => { });
      if (req.data.status == 'success') {
        setCartData(req?.data?.data);
      }
    }
  }

  return (
    <>
      {loading ? <>
        <Spinner />
      </> : <>
        {cartData == null || itemNum == 0 ?
          <div className='alert alert-danger m-5'>Your Cart is Empty</div>
          : <>
            <div className='container bg-body-tertiary my-5'>

              <button onClick={clearCartData} className='btn btn-danger float-end m-4'>Empty Cart</button>
              <div className="clearfix"></div>

              {cartData.products.map((e) => {
                return (<>
                  <div className="row p-5 align-items-center ">
                    <div className="col-md-10">
                      <div className="row align-items-center">
                        <div className="col-md-1">
                          <img src={e.product.imageCover} className='w-100' alt="" />
                        </div>
                        <div className="col-md-10">
                          <h6>{e.product.title}</h6>
                          <h5 className='text-muted'>Price: {e.price}EGP</h5>
                          <button onClick={() => removeItemCart(e.product._id)} className='btn btn-danger btn-sm'>Remove <i className='fa-solid fa-trash'></i></button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <span onClick={() => updateCartItem(e.product._id, e.count += 1)} className='btn btn-success btn-sm'>
                        <i className="fa-solid fa-plus"></i>
                      </span>
                      <span className='mx-2 fw-bold'>
                        {e.count}
                      </span>
                      <span onClick={() => updateCartItem(e.product._id, e.count -= 1)} className='btn btn-danger btn-sm'>
                        <i className="fa-solid fa-minus"></i>
                      </span>
                    </div>
                  </div>
                  <div className='cart-line'></div>
                </>)
              })}
              <h4 className='text-main px-5 pt-3'>Total Price: {cartData.totalCartPrice}EGP</h4>
              <NavLink className='btn bg-main text-white mx-5 my-3' to={"/Fresh-Cart/checkout/"+cartData._id}>Check out payment </NavLink>
            </div>
          </>}

      </>}
    </>
  )
}
