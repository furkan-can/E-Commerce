import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import PropTypes from 'prop-types'
const Pagination = ({
    currentPage,
    totalPageCount,
    handlePageChange,
    handlePrevPageChange,
    handleNextPageChange,
}) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPageCount; i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <button onClick={handlePrevPageChange} className="group text-gray-600 self-center items-center">
                <AiOutlineLeft />
            </button>
            {pageNumbers.length > 4 ? (
                <>
                    {currentPage === 1 ? (
                        <>
                            {pageNumbers.slice(0, 3).map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={`mx-2 rounded-lg h-8 w-8 items-center self-center ${pageNumber === currentPage ? "bg-white text-blue-600" : "text-gray-600"
                                        }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <span className="mx-2">...</span>
                            <button
                                className={`mx-2 rounded-lg h-8 w-8 items-center self-center text-gray-600`}
                                onClick={() => handlePageChange(totalPageCount)}
                            >
                                {totalPageCount}
                            </button>
                        </>
                    ) : currentPage === totalPageCount ? (
                        <>
                            <button
                                className={`mx-2 rounded-lg h-8 w-8 items-center self-center text-gray-600`}
                                onClick={() => handlePageChange(1)}
                            >
                                {1}
                            </button>
                            <span className="mx-2">...</span>
                            {pageNumbers.slice(-3).map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={`mx-2 rounded-lg h-8 w-8 items-center self-center ${pageNumber === currentPage ? "bg-white text-blue-600" : "text-gray-600"
                                        }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </>
                    ) : (
                        <>
                            <button
                                className={`mx-2 rounded-lg h-8 w-8 items-center ${totalPageCount - currentPage <= 2 ? "block" : "hidden"} self-center text-gray-600`}
                                onClick={() => handlePageChange(currentPage - 2)}
                            >
                                {currentPage - 2}
                            </button>
                            {pageNumbers.slice(currentPage - 2, currentPage + 1).map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={`mx-2 rounded-lg h-8 w-8 items-center self-center ${pageNumber === currentPage ? "bg-white text-blue-600" : "text-gray-600"
                                        }`}
                                    onClick={() => handlePageChange(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <span className={`mx-2 ${totalPageCount - currentPage <= 2 ? "hidden" : "block"}`}>...</span>
                            <button
                                className={`mx-2 rounded-lg h-8 w-8 items-center ${totalPageCount - currentPage <= 2 ? "hidden" : "block"} self-center text-gray-600`}
                                onClick={() => handlePageChange(totalPageCount)}
                            >
                                {totalPageCount}
                            </button>

                        </>
                    )}
                </>
            ) : (
                pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`mx-2 rounded-lg h-8 w-8 items-center self-center ${pageNumber === currentPage ? "bg-white text-blue-600" : "text-gray-600"
                            }`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))
            )}
            <button onClick={handleNextPageChange} className="group text-gray-600">
                <AiOutlineRight />
            </button>
        </>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPageCount: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    handlePrevPageChange: PropTypes.func.isRequired,
    handleNextPageChange: PropTypes.func.isRequired,
}

export default Pagination
