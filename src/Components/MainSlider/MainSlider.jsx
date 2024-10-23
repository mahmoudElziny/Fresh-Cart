import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import img1 from '../../assets/images/slider-image-1.jpeg';
import img2 from '../../assets/images/slider-image-2.jpeg';
import img3 from '../../assets/images/slider-image-3.jpeg';

export default function MainSlider() {
    return (
        <div className="row g-0 mt-5">
            <div className="col-md-9">
                <OwlCarousel items={1} loop autoplay dots autoplayTimeout={5000}>
                    <div className="item">
                    <img src={img1} className='w-100' height={500} alt="" />
                    </div>
                    <div className="item">
                    <img src={img2} className='w-100' height={500} alt="" />
                    </div>
                    <div className="item">
                    <img src={img3} className='w-100' height={500} alt="" />
                    </div>
                </OwlCarousel>
            </div>
            <div className="col-md-3">
                <img src={img2} className='w-100' height={250} alt="" />
                <img src={img3} className='w-100' height={250} alt="" />
            </div>
        </div>
    ) 
}
