import React from 'react'
import LATEST from '../assets/latest'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { RiShoppingCart2Line } from 'react-icons/ri'

const RelatedProducts = () => {
  return (
    <div>
      <h4 className='border-l-4 pl-2 border-secondary bold-20'>Related Products</h4>
      {/* container */}
      <div className='mx-auto max-w-full'>
        <Swiper
          breakpoints={{
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className='h-[188px] mt-5'
        >
          {
            LATEST.map((item, i) => (
              <SwiperSlide key={i}>
                <Link to={`/product/${item.id}`} onClick={window.scrollTo(0, 0)} className='flexCenter gap-x-5 bg-white p-4 rounded-xl'>
                  <img 
                    src={item.image} 
                    alt='' 
                    height={77}
                    width={77}  
                    className='rounded-lg drop-shadow-xl'
                  />
                  
                  <div className='flex flex-col gap-y-1'>
                    <h4 className='line-clamp-1 medium-16'>
                      {item.name}
                    </h4>
                    <p className='line-clamp-1'>
                      Shop were you left!
                    </p>
                    <div className='flexBetween'>
                      <div className='flexBetween gap-x-2 medium-16'>
                        <span>Rs. {item.new_price}.00</span>
                        <span className='line-through text-secondary'>Rs. {item.old_price}.00</span>
                      </div>
                      <RiShoppingCart2Line className='text-xl hover:text-secondary '/>
                    </div>
                  </div>

                </Link>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default RelatedProducts