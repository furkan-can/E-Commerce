import { PiShoppingBagOpenBold } from 'react-icons/pi'
import { RxHamburgerMenu } from 'react-icons/rx'
import { GoPerson } from 'react-icons/go'
import { SearchBar, Filters, Button } from '@/components'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

const Header = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const productsInCart = useSelector(state => state.cart.productsInCart);

  const calculateTotalPrice = () => {
    let price = 0;
    productsInCart.map((product) => {
      price += product.price * product.quantity;
    });
    return price;
  }

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [productsInCart])
  return (
    <div className="flex items-center justify-between w-full h-12 bg-blue-600 px-10 xl:px-3 md:px-6 2xl:px-60">
      <div className="flex items-center gap-40">
        <span onClick={() => navigate("/")} className='text-white font-bold text-2xl select-none cursor-pointer'>Eteration</span>
        <div className='xl:flex hidden'>
          <SearchBar title={"Search"} searchType={"product"} width={"w-80"} height={"h-10"} />
        </div>
      </div>
      <div className='hidden xl:flex items-center text-white gap-10'>
        <div className='flex items-center gap-2'>
          <PiShoppingBagOpenBold size={20} />
          <span className='select-none'>{totalPrice}<span className='select-none'> ₺</span></span>
        </div>
        <div className='flex items-center gap-2'>
          <GoPerson size={20} />
          <span className='select-none'>Furkan</span>
        </div>
      </div>
      <div onClick={toggleMenu} className={`${showMenu ? `fixed top-0 right-0 pt-3 pr-10` : `flex`}  xl:hidden z-20`}>
        <RxHamburgerMenu size={30} />
      </div>
      <div className={!showMenu ? `hidden` : ` z-10 pt-3 top-0 right-0 w-3/4 h-screen fixed  flex flex-col gap-4 select-none bg-gray-400 text-black`}>
        <div className='flex gap-2 px-5'>
          <GoPerson size={20} />
          <span className='select-none text-sm font-semibold'>Furkan</span>
        </div>
        <div className='flex gap-2 px-5'>
          <PiShoppingBagOpenBold size={20} />
          <span className='select-none text-sm font-semibold'>{totalPrice}<span className='select-none font-semibold'> ₺</span></span>
        </div>
        <div className="border-b-2 border-gray-200"></div>
        {
          location.pathname === "/" ?
            <>
              <div className='px-5'>
                <SearchBar title={"Search Product"} searchType={"product"} height={"h-10"} />
              </div>
              <div className="border-b-2 border-gray-200"></div>
              <Filters />
            </>
            :
            <div>
              <Button title={"Home Page"} handleClick={() => navigate("/")} />
            </div>
        }

      </div>
    </div>
  )
}

export default Header
