// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

import { Autoplay, Pagination, Navigation } from 'swiper';

import img1 from './../../assets/images/d9c1f6230cfd08ad3c5d0b4bc31a9fcf.jpg'
import img2 from './../../assets/images/R (2).jpg'
import img3 from './../../assets/images/R.jpg'

const Banner = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide className='relative'><img className='opacity-60' src={img1} alt="" />
                    <h1 className="absolute top-4 lg:top-1/4 left-24 text-neutral flex mx-auto lg:text-7xl text-3xl font-bold text-center lg:mt-24 mt-6 lg:mb-12 z-30">Sports Camp</h1>
                    <p className='absolute top-12 left-3 lg:top-1/4 lg:left-24 text-neutral flex mx-auto lg:text-3xl text-xs font-medium lg:text-start text-center lg:mt-44 mt-6 lg:mb-12 z-30'>Sport pertains to any form of competitive physical activity or game that aims to use, maintain or improve physical ability and skills while providing enjoyment to participants and, in some cases, entertainment to spectators. Sports can, through casual or organized participation, improve ones physical health.</p>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='opacity-60' src={img2} alt="" />
                    <h1 className="absolute top-4 lg:top-1/4 left-24 text-neutral flex mx-auto lg:text-7xl text-3xl font-bold text-center lg:mt-24 mt-6 lg:mb-12 z-30">Sports Camp</h1>
                    <p className='absolute top-12 left-3 lg:top-1/4 lg:left-24 text-neutral flex mx-auto lg:text-3xl text-xs font-medium lg:text-start text-center lg:mt-44 mt-6 lg:mb-12 z-30'>Sport pertains to any form of competitive physical activity or game that aims to use, maintain or improve physical ability and skills while providing enjoyment to participants and, in some cases, entertainment to spectators. Sports can, through casual or organized participation, improve ones physical health.</p>

                </SwiperSlide>
                <SwiperSlide><img className='opacity-60' src={img3} alt="" />
                <h1 className="absolute top-4 lg:top-1/4 left-24 text-neutral flex mx-auto lg:text-7xl text-3xl font-bold text-center lg:mt-24 mt-6 lg:mb-12 z-30">Sports Camp</h1>
                    <p className='absolute top-12 left-3 lg:top-1/4 lg:left-24 text-neutral flex mx-auto lg:text-3xl text-xs font-medium lg:text-start text-center lg:mt-44 mt-6 lg:mb-12 z-30'>Sport pertains to any form of competitive physical activity or game that aims to use, maintain or improve physical ability and skills while providing enjoyment to participants and, in some cases, entertainment to spectators. Sports can, through casual or organized participation, improve ones physical health.</p>

                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;