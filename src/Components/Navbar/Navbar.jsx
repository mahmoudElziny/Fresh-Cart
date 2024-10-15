import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="home"> <img src={logo} alt="logo" /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="home">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="cart">Cart</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="products">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="brands">Brands</NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
                <i className='fa-brands  fa-facebook mx-2'></i>
                <i className='fa-brands  fa-twitter mx-2'></i>
                <i className='fa-brands  fa-instagram mx-2'></i>
                <i className='fa-brands  fa-youtube mx-2'></i>
                <i className='fa-brands  fa-pinterest mx-2'></i>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Register</NavLink>
              </li>
              
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
