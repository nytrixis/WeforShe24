import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Item from './Item'

const NewArrivals = () => {
  const [new_collection, setNew_collection] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => setNew_collection(data))
  }, [])

  return (
    <section className='max-padd-container bg-gray-100 p-12 xl:py-28'>
      {/* title */}
      <div className='text-center max-w-lg mx-auto mb-16'>
        <h3 className='h3 text-gray-800 mb-4'>Fresh Off the Runway</h3>
        <p className='text-gray-600'>
          Discover our latest arrivals, straight from the fashion capitals of the world. Elevate your style with these cutting-edge designs that are sure to turn heads.
        </p>
      </div>
      {/* container */}
      <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12'>
        {new_collection.map((item) => (
          <div key={item.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='aspect-w-3 aspect-h-4 p-1'>
              <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded-t-lg' />
            </div>
            <div className='p-4'>
              <Item
                id={item.id}
                name={item.name}
                old_price={item.old_price}
                new_price={item.new_price}
              />
              <div className='mt-4'>
                <Link
                  to={'/'}
                  className='bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition-colors duration-300'
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewArrivals
