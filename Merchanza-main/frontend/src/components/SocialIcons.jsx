import React from 'react'
import { FaTwitter, FaLinkedinIn, FaInstagram, FaFacebookF, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SocialIcons = () => {
  return (
    <div className='flex gap-4'>
      <Link to={''} className='text-primary hover:text-gray-800 transition-colors duration-300'>
        <FaTwitter className='text-2xl' />
      </Link>
      <Link to={''} className='text-primary hover:text-gray-800 transition-colors duration-300'>
        <FaLinkedinIn className='text-2xl' />
      </Link>
      <Link to={''} className='text-primary hover:text-gray-800 transition-colors duration-300'>
        <FaInstagram className='text-2xl' />
      </Link>
      <Link to={''} className='text-primary hover:text-gray-800 transition-colors duration-300'>
        <FaFacebookF className='text-2xl' />
      </Link>
      <Link to={''} className='text-primary hover:text-gray-800 transition-colors duration-300'>
        <FaGithub className='text-2xl' />
      </Link>
    </div>
  )
}

export default SocialIcons
