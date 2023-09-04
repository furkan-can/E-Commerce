import PropTypes from 'prop-types'

const Card = ({ children,width,height,backgroundColor }) => {
  return (
    <div className={`xl:shadow-xl ${width} ${height} ${backgroundColor} xl:bg-white flex flex-col px-5 py-3 gap-3 overflow-y-auto`}>
      {children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  backgroundColor: PropTypes.string
}

export default Card
