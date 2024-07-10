import React, { useState, useEffect } from 'react'
import Item from './Item'

const PopularProducts = () => {
  const [popular_products, setPopular_products] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/popularproducts')
      .then((response) => response.json())
      .then((data) => setPopular_products(data))
  }, [])

  return (
    <section className='max-padd-container bg-gray-100 p-12 xl:py-28'>
      {/* title */}
      <div className='text-center max-w-lg mx-auto mb-16'>
        <h3 className='h3 text-secondary mb-4'>Style Essentials</h3>
        <p className='text-gray-600'>
          Elevate your wardrobe with our curated selection of must-have pieces. Discover timeless styles that effortlessly blend fashion and functionality.
        </p>
      </div>
      {/* container */}
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12'>
        {popular_products.map((item) => (
          <div key={item.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='aspect-w-3 aspect-h-4 p-1'>
              <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-t-lg' />
            </div>
            <div className='p-1'>
              <Item
                id={item.id}
                name={item.name}
                old_price={item.old_price}
                new_price={item.new_price}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularProducts
