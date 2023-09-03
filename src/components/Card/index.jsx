import PropTypes from 'prop-types'

const Card = ({ children,width,height }) => {
  return (
    <div className={`bg-white shadow-xl ${width} ${height} flex flex-col px-5 py-3 gap-3 overflow-y-auto`}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default Card
