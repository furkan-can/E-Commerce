import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart, decreaseProductQuantity } from '@/store/slices/cartSlice';


const CartItem = ({ title, price, quantity, id }) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(state => state.cart.productsInCart);

  const handleDecreaseProductQuantity = () => {
    dispatch(decreaseProductQuantity(id));
  }
  const handleIncreaseProductQuantity = () => {
    const product = productsInCart.find((product) => product.id === id);
    dispatch(addProductToCart(product));
  }
  return (
    <div className="flex justify-between">
      <div className="flex flex-col leading-3 justify-center">
        <span>{title}</span>
        <span className="text-blue-600 text-xs font-semibold">{price}<span className="text-blue-600 text-xs font-semibold">₺</span></span>
      </div>
      <div className="flex items-center">
        <button onClick={() => handleDecreaseProductQuantity()} className="w-8 h-8 font-semibold hover:bg-gray-200 text-gray-600 rounded-md bg-gray-100 text-center self-center align-middle">-</button>
        <button className="w-8 h-8 text-white bg-blue-600" disabled>{quantity}</button>
        <button onClick={() => handleIncreaseProductQuantity()} className="w-8 h-8 font-semibold hover:bg-gray-200 text-gray-600 rounded-md bg-gray-100 text-center self-center align-middle">+</button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
}

export default CartItem
