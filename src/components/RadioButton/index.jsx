import PropTypes from 'prop-types'

const RadioButton = ({ text, option, selectedOption, onChange }) => {
    return (
        <label className='flex gap-3 capitalize'>
            <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={onChange}
            />
            {text}
        </label>
    )
}

RadioButton.propTypes = {
    text: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
    selectedOption: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default RadioButton
