import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function CategorySlider() {
    
    let [categoryList, setCategoryList] = useState([]);
    
    useEffect(() => {
        getCategory();     
    },[]);
    
    useEffect(() => {
        if(categoryList.length <= 0){
            getCategory();     
        }
    },[categoryList]);
    
    async function getCategory(){
        let req = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategoryList(req?.data?.data);
    } 

    return (
        <div>
            <h2 className='mb-2'>Shop Popular Categories</h2>
            {}
            <OwlCarousel items={7} loop autoplay dots autoplayTimeout={4000}>
                {categoryList.map((e) => {
                    return (
                    <div className="item" key={e._id}>
                        <img src={e.image} height={200} alt="" />
                        <h6 className='text-black mt-2 fw-bold'>{e.name}</h6>
                    </div>
                    )
                })}
            </OwlCarousel>
        </div>
    )
}
