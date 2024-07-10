import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import banneroffer from '../assets/banneroffer.png'

const Offer = () => {
  return (
    <section className='max-padd-container bg-cover bg-center bg-banneroffer' >
      <div className='w-10xl mx-auto text-center py-20 bg-gray-800 bg-opacity-75 text-white'>
        <h2 className='h2 text-secondary mb-6'>Exclusive Winter Collection</h2>
        <p className='text-gray-300 mb-8'>
          Embrace the warmth of summer with our latest collection, designed to elevate your style and keep you cool and comfortable all season long.
        </p>
        <div className='flex justify-center'>
          <Link
            to={'/'}
            className='bg-white text-gray-800 py-3 px-6 rounded-full flex items-center gap-2 hover:bg-gray-800 hover:text-white transition-colors duration-300'
          >
            Explore Now
            <FaArrowRight className='text-lg' />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Offer
