import PropTypes from 'prop-types'

const CheckButton = ({ text, checked, onChange,name,value }) => {
    return (
        <label className='flex gap-3 capitalize'>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                name={name}
                value={value}
            />
            {text}
        </label>
    )
}

CheckButton.propTypes = {
    text: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
}

export default CheckButton
