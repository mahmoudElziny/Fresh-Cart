import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg';
import { UserContext } from '../../Contexts/userContext';
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  let {userToken, data, setUserToken} = useContext(UserContext);
  let navigate = useNavigate();

  function logout(){
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/"> <img src={logo} alt="logo" /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userToken != null ?
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
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
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="cart">Cart</NavLink>
              </li>
            </ul>: ""}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
                <i className='fa-brands  fa-facebook mx-2'></i>
                <i className='fa-brands  fa-twitter mx-2'></i>
                <i className='fa-brands  fa-instagram mx-2'></i>
                <i className='fa-brands  fa-youtube mx-2'></i>
                <i className='fa-brands  fa-pinterest mx-2'></i>
              </li>

              {userToken != null ? 
              <li className="nav-item">
                <span className='nav-link cursor-pointer' onClick={logout}> LogOut</span>
              </li>  : <>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="register">Register</NavLink>
              </li>
              </>  }
              
            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
