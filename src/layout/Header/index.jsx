import { PiShoppingBagOpenBold } from 'react-icons/pi'
import { GoPerson } from 'react-icons/go'
import { SearchBar } from '@/components'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Header = () => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
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
    <div className="flex items-center justify-between w-full h-12 bg-blue-600 px-60">
      <div className="flex items-center gap-40">
        <span onClick={() => navigate("/")} className='text-white font-bold text-2xl select-none cursor-pointer'>Eteration</span>
        <SearchBar searchType={"product"} width={"w-80"} height={"h-10"} />
      </div>
      <div className='flex items-center text-white gap-10'>
        <div className='flex items-center gap-2'>
          <PiShoppingBagOpenBold size={20} />
          <span className='select-none'>{totalPrice}<span className='select-none'> ₺</span></span>
        </div>
        <div className='flex items-center gap-2'>
          <GoPerson size={20} />
          <span className='select-none'>Furkan</span>
        </div>
      </div>
    </div>
  )
}

export default Header
