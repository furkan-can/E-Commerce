import { AiOutlineSearch } from 'react-icons/ai'
import PropTypes from 'prop-types'

const SearchBar = ({width,height,optionalClassName}) => {
    return (
        <label className='flex items-center'>
            <div className="relative">
                <input required type="text" className={`text-black peer outline-none ${optionalClassName} ${width} ${height} pt-2 px-2 text-base`} />
                <AiOutlineSearch className='absolute left-1 text-gray-600 transition-all text-base top-1/2 -translate-y-1/2 peer-focus:text-xs  peer-focus:top-2 peer-valid:text-xs  peer-valid:top-2' />
                <span className=" cursor-text text-gray-600 absolute left-6 transition-all text-base top-1/2 -translate-y-1/2  peer-focus:text-xs peer-focus:top-2 peer-valid:text-xs  peer-valid:top-2">Search</span>
            </div>
        </label>
    )
}

SearchBar.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    optionalClassName: PropTypes.string,
}

export default SearchBar
