import PropTypes from 'prop-types'
const Product = ({url,price,title}) => {
    return (
        <>
            <img className="h-28" src={url} alt={title} />
            <span className="text-blue-600 font-semibold text-sm">{price}<span className="text-blue-600 font-semibold text-sm">₺</span></span>
            <span className="flex-wrap text-sm font-semibold">{title}</span>
            
        </>
    )
}

Product.propTypes = {
    url: PropTypes.string,
    price: PropTypes.string,
    title: PropTypes.string
}

export default Product
