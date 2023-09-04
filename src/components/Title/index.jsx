import PropTypes from 'prop-types'

const Title = ({ title }) => {
    return (
        <span className='text-black xl:px-0 px-5 text-sm xl:text-gray-500 xl:text-xs' >{title}</span>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title
