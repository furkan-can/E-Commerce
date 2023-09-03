import { AiOutlineSearch } from 'react-icons/ai'
import PropTypes from 'prop-types'
import { useState } from 'react';
import { setFilteredProducts, clearFilterProduct } from '@/store/slices/productsSlice';
import { setFilteredbrands, clearFilterBrand } from '@/store/slices/brandSlice';
import { setFilteredmodels, clearFilterModel } from '@/store/slices/modelSlice';

import { useSelector, useDispatch } from 'react-redux';

const SearchBar = ({ width, height, optionalClassName, searchType }) => {
    const dispatch = useDispatch();
    const allProductsStore = useSelector((state) => state.products.allProducts);
    const allBrandsStore = useSelector((state) => state.brands.allbrands);
    const allModelsStore = useSelector((state) => state.models.allmodels);
    const [searchTerm, setSearchTerm] = useState("");


    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (searchType === 'product') {
            productSearch(value);
        } else if (searchType === 'brand') {
            brandSearch(value);
        } else if (searchType === 'model') {
            modelSearch(value);
        }
    }

    const productSearch = (value) => {
        if (value === "") {
            dispatch(clearFilterProduct());
            return;
        }
        const filterProducts = allProductsStore.filter((product) => {
            return product.title.toLowerCase().includes(value.toLowerCase());
        })
        dispatch(setFilteredProducts(filterProducts));
    }

    const brandSearch = (value) => {
        if (value === "") {
            dispatch(clearFilterBrand());
            return;
        }
        const filterBrands = allBrandsStore.filter((brand) => {
            return brand.text.toLowerCase().includes(value.toLowerCase());
        })
        dispatch(setFilteredbrands(filterBrands));
    }

    const modelSearch = (value) => {
        if (value === "") {
            dispatch(clearFilterModel());
            return;
        }
        const filterModels = allModelsStore.filter((model) => {
            return model.text.toLowerCase().includes(value.toLowerCase());
        })
        dispatch(setFilteredmodels(filterModels));
    }

    return (
        <label className='flex items-center'>
            <div className="relative">
                <input value={searchTerm} onChange={handleInputChange}
                    required type="text"
                    className={`text-black peer outline-none ${optionalClassName} ${width} ${height} pt-2 px-2 text-base`} />
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
    searchType: PropTypes.string
}

export default SearchBar
