import React from 'react'
import { TbTruckReturn } from 'react-icons/tb'
import about from '../assets/about.png'

const About = () => {
  return (
    <section className='max-padd-container py-12 xl:py-32'>
      {/* container */}
      <div className='flex flex-col-reverse gap-16 xl:gap-8 xl:flex-row'>
        {/* right */}
        <div className='flex-1 flexCenter'>
          <div>
            <img src={about} alt="" height={488} width={488} className='rounded-lg shadow-lg' />
          </div>
        </div>

        {/* left */}
        <div className='flex-1'>
          <h3 className='h3 capitalize text-gray-800 mb-6'>Discover the Essence of Style</h3>
          <p className='text-gray-600 mb-8'>
            At our fashion boutique, we believe that style is more than just clothing – it's a reflection of your unique personality and a celebration of self-expression. Our carefully curated collection is designed to inspire and empower you to embrace your individuality.
          </p>

          <div className='flex flex-col items-start gap-y-6'>
            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondary flexCenter rounded-md'>
                <TbTruckReturn className='text-white text-2xl' />
              </div>
              <div>
                <h4 className='medium-18 text-gray-800 mb-2'>Effortless Returns</h4>
                <p className='text-gray-600'>
                  We understand that sometimes things don't quite fit or meet your expectations. That's why we offer a hassle-free returns process, ensuring your shopping experience is as smooth as possible.
                </p>
              </div>
            </div>

            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondary flexCenter rounded-md'>
                <TbTruckReturn className='text-white text-2xl' />
              </div>
              <div>
                <h4 className='medium-18 text-gray-800 mb-2'>Secure Payments</h4>
                <p className='text-gray-600'>
                  Your security is our top priority. We employ the latest encryption technologies to ensure your personal and financial information is always protected during every transaction.
                </p>
              </div>
            </div>

            <div className='flexCenter gap-x-4'>
              <div className='h-16 min-w-16 bg-secondary flexCenter rounded-md'>
                <TbTruckReturn className='text-white text-2xl' />
              </div>
              <div>
                <h4 className='medium-18 text-gray-800 mb-2'>Personalized Support</h4>
                <p className='text-gray-600'>
                  Our dedicated team is always ready to assist you with any questions or concerns you may have. We pride ourselves on providing exceptional customer service, ensuring your shopping experience is truly remarkable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
