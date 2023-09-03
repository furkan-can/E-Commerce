import PropTypes from 'prop-types'
const Product = ({url,price,title}) => {
    return (
        <div className="bg-white flex flex-col gap-2 w-44 h-min p-3">
            <img className="h-28" src="https://picsum.photos/200/300" alt={url} />
            <span className="text-blue-600 font-semibold text-sm">{price}<span className="text-blue-600 font-semibold text-sm">₺</span></span>
            <span className="flex-wrap text-sm font-semibold">{title}</span>
            <button className="w-full bg-blue-600 text-white rounded h-8">Add to Cart</button>
        </div>
    )
}

Product.propTypes = {
    url: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string
}

export default Product
