import PropTypes from 'prop-types'

const Button = ({ handleClick,title,optionalClassName }) => {
    return (
        <button onClick={(e) => handleClick(e)} className={`w-full h-8 text-white bg-blue-600 rounded ${optionalClassName}`}>{title}</button>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    optionalClassName: PropTypes.string,
}

export default Button
