import PropTypes from 'prop-types'

const CartItem = ({title,price}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col leading-3 justify-center">
        <span>{title}</span>
        <span className="text-blue-600 text-xs font-semibold">{price}<span className="text-blue-600 text-xs font-semibold">₺</span></span>
      </div>
      <div className="flex items-center">
        <button className="w-8 h-8 font-semibold hover:bg-gray-200 text-gray-600 rounded-md bg-gray-100 text-center self-center align-middle">-</button>
        <button className="w-8 h-8 text-white bg-blue-600" disabled>1</button>
        <button className="w-8 h-8 font-semibold hover:bg-gray-200 text-gray-600 rounded-md bg-gray-100 text-center self-center align-middle">+</button>
      </div>
    </div>
  )
}

CartItem.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
}

export default CartItem
