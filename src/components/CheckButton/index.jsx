import PropTypes from 'prop-types'

const CheckButton = ({ text, checked, onChange,name }) => {
    return (
        <label className='flex gap-3 capitalize'>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                name={name}
            />
            {text}
        </label>
    )
}

CheckButton.propTypes = {
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
}

export default CheckButton
