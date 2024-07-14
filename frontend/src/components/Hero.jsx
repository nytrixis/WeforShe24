import React from 'react'
import { Link } from 'react-router-dom'
import RelatedProducts from './RelatedProducts'
import ChatBot from './ChatBot'

const Hero = () => {
  return (
    <section className="relative">
      <div className="max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[800px] w-full">
        <div className="absolute top-1/4 left-1/4 transform -translate-y-1/2">
          <h4 className="uppercase medium-18 tracking-wider text-gray-50 mb-4">
            RUCHE
          </h4>
          <h2 className="h1 capitalize max-w-[40rem] text-gray-50 mb-6">
            Unleash Your Style, <span className="text-secondary">One Click at a Time.</span> Shop Now!
          </h2>
          <p className="my-5 max-w-[33rem] text-gray-600 mb-8">
            Discover a world of fashion where every piece tells a story. Embrace your individuality and let your style shine through our curated collection of trendsetting apparel.
          </p>
          {/* buttons */}
          <div className="inline-flex items-center justify-start gap-4 p-2 bg-white rounded-xl">
            <div className="text-left regular-14 leading-tight pl-5">
              <h5 className="uppercase font-bold">Limited Time</h5>
              <p className="regular-14">Exclusive Offers</p>
            </div>
            <Link to={''} className="btn-dark rounded-xl flexCenter !py-5 bg-secondary text-white hover:bg-blue-600 transition-colors duration-300">Explore Now</Link>
          </div>
        </div>
      </div>
      {/* NewCollection */}
      <div className="m-16">
        <RelatedProducts />
      </div>
      <ChatBot/>
    </section>
  )
}

export default Hero
