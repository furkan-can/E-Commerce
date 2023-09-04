import { Card, Title, CartItem, Product, Pagination, Button, TotalPrice, Filters } from "@/components"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '@/store/slices/cartSlice';
import { setAllProducts } from '@/store/slices/productsSlice';
import { setAllbrands } from '@/store/slices/brandSlice';
import { setAllmodels } from '@/store/slices/modelSlice';
import { fetchProductData } from '@/services/dataServices';
import { setFilteredProducts, clearFilterProduct } from '@/store/slices/productsSlice';



const Content = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProductData();
        if (data) {
          dispatch(setAllProducts(data));
          const brands = data.map((product) => {
            return {
              id: product.id,
              text: product.brand,
              name: product.brand,
            };
          });
          dispatch(setAllbrands(brands));
          const models = data.map((product) => {
            return {
              id: product.id,
              text: product.model,
              name: product.model,
            };
          });
          dispatch(setAllmodels(models));
        } else {
          console.error('Error fetching product data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);


  const allModelsStore = useSelector((state) => state.models.allmodels);

  const allBrandsStore = useSelector((state) => state.brands.allbrands);

  const allProductsStore = useSelector((state) => state.products.allProducts);
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const productsInCart = useSelector(state => state.cart.productsInCart);
  const dispatch = useDispatch();

  const handleAddToCart = (e, id) => {
    const product = allProductsStore.find((product) => product.id === id);
    dispatch(addProductToCart(product));
    e.stopPropagation();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    let itemsToPaginate = filteredProducts.length > 0 ? filteredProducts : allProductsStore;
    setCurrentProducts(paginate(itemsToPaginate, currentPage, productsPerPage));
  }, [currentPage, allProductsStore, filteredProducts]);


  let totalPageCount = Math.ceil(allProductsStore.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleNextPageChange = () => {
    if (currentPage < totalPageCount) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPageChange = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const [brandsCheckButtonsChecked, setBrandsCheckButtonsChecked] = useState({});
  const [brandsCount, setBrandsCount] = useState(0);

  useEffect(() => {
    setBrandsCount(allBrandsStore.length);
  }, [allBrandsStore]);

  useEffect(() => {
    const newBrandsCheckButtonsChecked = {};
    allBrandsStore.forEach((brand) => {
      newBrandsCheckButtonsChecked[brand.name] = false;
    });
    setBrandsCheckButtonsChecked(newBrandsCheckButtonsChecked);
  }, [brandsCount, allBrandsStore]);

  useEffect(() => {
    const selectedBrands = Object.keys(brandsCheckButtonsChecked).filter((brandName) => brandsCheckButtonsChecked[brandName]);

    if (selectedBrands.length > 0) {
      const filterProduct = getFilteredProductsByBrands();
      dispatch(setFilteredProducts(filterProduct));
    } else {
      dispatch(clearFilterProduct());
    }
  }, [brandsCheckButtonsChecked]);

  const getFilteredProductsByBrands = () => {
    const selectedBrands = Object.keys(brandsCheckButtonsChecked).filter((brandName) => brandsCheckButtonsChecked[brandName]);
    return allProductsStore.filter((product) => selectedBrands.includes(product.brand));
  };

  const [modelsCheckButtonsChecked, setModelsCheckButtonsChecked] = useState({});
  const [modelsCount, setModelsCount] = useState(0);

  useEffect(() => {
    setModelsCount(allModelsStore.length);
  }, [allModelsStore]);

  useEffect(() => {
    const newModelsCheckButtonsChecked = {};
    allModelsStore.forEach((model) => {
      newModelsCheckButtonsChecked[model.name] = false;
    });
    setModelsCheckButtonsChecked(newModelsCheckButtonsChecked);
  }, [modelsCount, allModelsStore]);

  useEffect(() => {
    const selectedModels = Object.keys(modelsCheckButtonsChecked).filter((modelName) => modelsCheckButtonsChecked[modelName]);

    if (selectedModels.length > 0) {
      const filterProduct = getFilteredProductsByModels();
      dispatch(setFilteredProducts(filterProduct));
    } else {
      dispatch(clearFilterProduct());
    }
  }, [modelsCheckButtonsChecked]);

  const getFilteredProductsByModels = () => {
    const selectedModels = Object.keys(modelsCheckButtonsChecked).filter((modelName) => modelsCheckButtonsChecked[modelName]);
    return allProductsStore.filter((product) => selectedModels.includes(product.model));
  };

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-5 h-full md:px-6  xl:px-3 xl:pt-0 2xl:pt-8 2xl:px-60 bg-gray-100">
      <div className="hidden col-span-1 xl:flex flex-col gap-5">
        <Filters />
      </div>
      <div className="col-span-3 relative">
        <div className="flex flex-wrap xl:-mx-2 gap-y-5">
          {
            currentProducts.map((product, index) => (
              <div onClick={() => handleProductClick(product.id)} className="w-1/2 xl:w-1/4 md:w-1/3 px-2 cursor-pointer" key={index}>
                <div className="bg-white flex flex-col gap-2 w-44 h-min p-3">
                  <Product
                    url={product.image}
                    price={product.price}
                    title={product.name}
                  />
                  <Button title={"Add to Cart"} handleClick={(e) => handleAddToCart(e, product.id)} />
                </div>
              </div>
            ))
          }
        </div>
        <div className="col-span-3 flex left-1/2 -translate-x-1/2 h-5 items-center absolute xl:bottom-5 2xl:bottom-10 -bottom-10">
          <Pagination
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            handlePageChange={handlePageChange}
            handleNextPageChange={handleNextPageChange}
            handlePrevPageChange={handlePrevPageChange}
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-5 xl:ml-1 2xl:ml-4 mt-10  xl:mt-0 xl:py-0 py-5">
        <div>
          <Title title="Cart" />
          <Card height={"h-36"} width={"w-64"}>
            {
              productsInCart.map((product, index) => (
                <CartItem
                  key={index}
                  id={product.id}
                  price={product.price}
                  title={product.name}
                  quantity={product.quantity}
                />
              ))
            }
          </Card>
        </div>
        <div>
          <Title title="Checkout" />
          <Card height={"h-24"} width={"w-64"}>
            <TotalPrice />
            <Button title={"Checkout"} handleClick={() => { }} />
          </Card>
        </div>
      </div>

    </div>
  )
}

export default Content
