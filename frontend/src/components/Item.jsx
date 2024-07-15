import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiShoppingCart2Line } from 'react-icons/ri'

const Item = ({ id, name, image, old_price, new_price }) => {
  const navigate = useNavigate();
  const handleTryOn = (e) => {
    e.preventDefault(); // Prevent the Link from navigating
    navigate(`/try-on/${id}`);
  };

  return (
    <Link to={`/product/${id}`} className='bg-white p-4 rounded-xl relative' onClick={window.scrollTo(0, 0)}>
      <div className='flexCenter'>
        <img
          src={image}
          alt=''
          heigth={211}
          width={211}
          className='rounded-lg drop-shadow-xl absolute bottom-44'
        />
      </div>
      <div className='flex flex-col gap-y-3 pt-24'>
        <h4 className='line-clamp-2 medium-16'>{name}</h4>
        <p>
          Dive headfirst into the best shopping collections of today!
        </p>
        <div className='flexBetween'>
          <div className='flex gap-x-4 medium-16'>
            <span>Rs. {new_price}.00</span>
            <span className='line-through text-secondary'>Rs. {old_price}.00</span>
          </div>
          <RiShoppingCart2Line className='p-2 h-10 w-10 hover:text-secondary'/>
        </div>
        <button 
        onClick={handleTryOn}
        className='bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300'>
          Try On
        </button>
      </div>
    </Link>
  )
}

export default Item
