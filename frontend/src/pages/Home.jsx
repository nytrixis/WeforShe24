import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import PopularProducts from '../components/PopularProducts'
import Offer from '../components/Offer'
import NewArrivalS from '../components/NewArrivals'


const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <PopularProducts />
      <Offer />
      <NewArrivalS />
    </>
  )
}

export default Home