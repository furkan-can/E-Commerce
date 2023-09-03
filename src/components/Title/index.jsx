import PropTypes from 'prop-types'

const Title = ({ title }) => {
    return (
        <span className='text-gray-500 text-xs' >{title}</span>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired
}

export default Title
