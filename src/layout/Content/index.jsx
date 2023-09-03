import { Card, RadioButton, Title, CheckButton, SearchBar, CartItem, Product, Pagination, Button, TotalPrice } from "@/components"
import { sortOptions } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '@/store/slices/cartSlice';
import { setAllProducts } from '@/store/slices/productsSlice';
import { setAllbrands } from '@/store/slices/brandSlice';
import { setAllmodels } from '@/store/slices/modelSlice';
import { fetchProductData } from '@/services/dataServices';


const Content = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProductData();
        console.log(data);
        if (data) {
          dispatch(setAllProducts(data));
          const brands = data.map((product, index) => {
            return {
              id: product.id,
              text: product.brand,
              name: `brand${index + 1}`,
            };
          });
          dispatch(setAllbrands(brands));
          const models = data.map((product, index) => {
            return {
              id: product.id,
              text: product.model,
              name: `model${index + 1}`,
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
  const isFilterActiveModel = useSelector((state) => state.models.isFilterActive);
  const filteredModels = useSelector((state) => state.models.filteredmodels);

  const allBrandsStore = useSelector((state) => state.brands.allbrands);
  const isFilterActiveBrand = useSelector((state) => state.brands.isFilterActive);
  const filteredBrands = useSelector((state) => state.brands.filteredbrands);

  const allProductsStore = useSelector((state) => state.products.allProducts);
  const isFilterActiveProduct = useSelector((state) => state.products.isFilterActive);
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

  let currentProducts = paginate(allProductsStore, currentPage, productsPerPage);

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


  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [brandsCheckButtonsChecked, setBrandsCheckButtonsChecked] = useState({});
  const [brandsCount, setBrandsCount] = useState(0);

  useEffect(() => {
    setBrandsCount(allBrandsStore.length);
  }, [allBrandsStore]);

  useEffect(() => {
    const newBrandsCheckButtonsChecked = {};
    for (let i = 1; i <= brandsCount; i++) {
      newBrandsCheckButtonsChecked[`brand${i}`] = false;
    }
    setBrandsCheckButtonsChecked(newBrandsCheckButtonsChecked);
  }, [brandsCount]);

  const handleBrandsCheckButtonChange = (event) => {
    const { name, checked } = event.target;
    setBrandsCheckButtonsChecked({ ...brandsCheckButtonsChecked, [name]: checked });

  };

  const [modelsCheckButtonsChecked, setModelsCheckButtonsChecked] = useState({});
  const [modelsCount, setModelsCount] = useState(0);

  useEffect(() => {
    setModelsCount(allModelsStore.length);
  }, [allModelsStore]);

  useEffect(() => {
    const newModelsCheckButtonsChecked = {};
    for (let i = 1; i <= modelsCount; i++) {
      newModelsCheckButtonsChecked[`model${i}`] = false;
    }
    setModelsCheckButtonsChecked(newModelsCheckButtonsChecked);
  }, [modelsCount]);

  const handleModelsCheckButtonChange = (event) => {
    const { name, checked } = event.target;
    setModelsCheckButtonsChecked({ ...modelsCheckButtonsChecked, [name]: checked });
  };

  return (
    <div className="grid grid-cols-5 h-screen2 px-60 pt-8 bg-gray-100">
      <div className="col-span-1 flex flex-col gap-5">
        <div>
          <Title title="Sort by" />
          <Card height={"h-40"} width={"w-60"}>
            {
              sortOptions.map((option, index) => (
                <RadioButton
                  key={index}
                  option={option.value}
                  text={option.label}
                  selectedOption={selectedOption}
                  onChange={handleOptionChange}
                />
              ))
            }
          </Card>
        </div>
        <div>
          <Title title="Brands" />
          <Card height={"h-40"} width={"w-60"}>
            <SearchBar searchType={"brand"} height={"h-10"} optionalClassName={"bg-gray-50"} />
            {
              isFilterActiveBrand ? filteredBrands.map((brand, index) => (
                <CheckButton
                  key={index}
                  text={brand.text}
                  name={brand.name}
                  value={brandsCheckButtonsChecked[brand.name]}
                  checked={brandsCheckButtonsChecked[brand.name] || false}
                  onChange={(e) => handleBrandsCheckButtonChange(e)}
                />

              )) :
                allBrandsStore.map((brand, index) => (
                  <CheckButton
                    key={index}
                    text={brand.text}
                    name={brand.name}
                    value={brandsCheckButtonsChecked[brand.name]}
                    checked={brandsCheckButtonsChecked[brand.name] || false}
                    onChange={(e) => handleBrandsCheckButtonChange(e)}
                  />
                ))
            }
          </Card>
        </div>
        <div>
          <Title title="Model" />
          <Card height={"h-40"} width={"w-60"}>
            <SearchBar searchType={"model"} height={"h-10"} optionalClassName={"bg-gray-50"} />
            {
              isFilterActiveModel ? filteredModels.map((model, index) => (
                <CheckButton
                  key={index}
                  text={model.text}
                  name={model.name}
                  value={modelsCheckButtonsChecked[model.name]}
                  checked={modelsCheckButtonsChecked[model.name] || false}
                  onChange={(e) => handleModelsCheckButtonChange(e)}
                />
              )) :
                allModelsStore.map((model, index) => (
                  <CheckButton
                    key={index}
                    text={model.text}
                    name={model.name}
                    value={modelsCheckButtonsChecked[model.name]}
                    checked={modelsCheckButtonsChecked[model.name] || false}
                    onChange={(e) => handleModelsCheckButtonChange(e)}
                  />
                ))
            }
          </Card>
        </div>
      </div>
      <div className="col-span-3 relative">
        <div className="flex flex-wrap -mx-2 gap-y-5">
          {
            isFilterActiveProduct ? filteredProducts.map((product, index) => (
              <div onClick={() => handleProductClick(product.id)} className="w-1/4 px-2 cursor-pointer" key={index}>
                <div className="bg-white flex flex-col gap-2 w-44 h-min p-3">
                  <Product
                    url={product.image}
                    price={product.price}
                    title={product.name}
                  />
                  <Button title={"Add to Cart"} handleClick={(e) => handleAddToCart(e, product.id)} />
                </div>
              </div>
            )) : currentProducts.map((product, index) => (
              <div onClick={() => handleProductClick(product.id)} className="w-1/4 px-2 cursor-pointer" key={index}>
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
        <div className="col-span-3 flex left-1/2 -translate-x-1/2 h-5 items-center absolute bottom-10">
          <Pagination
            currentPage={currentPage}
            totalPageCount={totalPageCount}
            handlePageChange={handlePageChange}
            handleNextPageChange={handleNextPageChange}
            handlePrevPageChange={handlePrevPageChange}
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-col gap-5 ml-4">
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
