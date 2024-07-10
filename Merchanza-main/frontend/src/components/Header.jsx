import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import logout from '../assets/logout.svg'
import user from '../assets/user.svg';
import Navbar from './Navbar';
import { MdMenu, MdClose } from 'react-icons/md'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { ShopContext } from '../context/ShopContext';

const Header = () => {

  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const [header, setHeader] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);
  

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0) {
        // Close them menu if open when scroll occurs
        if(menuOpened){
          setMenuOpened(false)
        }
      }
    }

    const scrollYPos = window.addEventListener('scroll', () => {
      window.scrollY > 50
        ? setHeader(true)
        : setHeader(false)
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('scroll', scrollYPos);
    }
  }, [menuOpened]);

  return (
    <header className={`
      ${header ? 'shadow-md !py-3' : ''}
      sticky top-0 transition-all max-padd-container w-full bg-primary py-5 z-50
    `}>
      <div className='flexBetween py-3'>
        
        {/* logo */}
        <Link to={"/"} className='flex items-center gap-x-2'>
          <img 
            src={logo}
            alt='logoimg'
            height={31}
            width={31}
          />
          <span className='bold-24 hidden xs:flex'>Ruche</span>
        </Link>

        {/* Navbar & Buttons */}
        <div className='flexCenter gap-x-4'>
          {/* desktop Navbar */}
          <div>
            <Navbar containerStyles={'hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1'}/>
          </div>
          {/* mobile navbar */}
          <div>
            <Navbar containerStyles={`
              ${menuOpened 
                ? "flex flex-col items-start gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50" 
                : "flex flex-col items-start gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50 -right-[100%]"}
            `} />
          </div>
          {/* buttons */}
          <div className='flexBetween gap-x-3 sm:gap-x-2 bold-16'>
            {/* Button mobileNav */}
            {!menuOpened ? (
              <MdMenu 
                className='xl:hidden cursor-pointer text-3xl hover:text-secondary'
                onClick={toggleMenu}
              />  
            ) : (
              <MdClose 
                className='xl:hidden cursor-pointer text-3xl hover:text-secondary'
                onClick={toggleMenu}
              />
            )}
            {/* Button ShoppingCart */}
            <div className='flexBetween sm:gap-x-6'>
              <NavLink to={'/cart-page'} className='flex'>
                <RiShoppingCart2Line  className='p-2 h-10 w-10 hover:text-secondary'/>
                <span className='relative flexCenter w-5 h-5 rounded-full bg-secondary text-primary medium-14 -top-2 right-3'>
                  {getTotalCartItems()}
                </span>
              </NavLink>
              {/* Button login */}
              { localStorage.getItem('auth-token') ? (
                <NavLink 
                  to={'/logout'}
                  onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}} 
                  className={'btn-secondary flexCenter gap-x-2 medium-16 rounded-xl'}
                >
                  <img src={logout} alt='' height={19} width={19} />
                  Logout
                </NavLink>
              ):(
                <NavLink 
                  to={'/login'} 
                  className={'btn-secondary flexCenter gap-x-2 medium-16 rounded-xl'}
                >
                  <img src={user} alt='' height={19} width={19}/>
                  Login
                </NavLink>
              )
              }
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header