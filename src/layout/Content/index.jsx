import { Card, RadioButton, Title, CheckButton, SearchBar, CartItem, Product, Pagination, Button, TotalPrice } from "@/components"
import { sortOptions } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '@/store/slices/cartSlice';
import { setAllProducts } from '@/store/slices/productsSlice';
import { setAllbrands } from '@/store/slices/brandSlice';
import { setAllmodels } from '@/store/slices/modelSlice';


const Content = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const allProducts = [
    {
      id: 0,
      url: "",
      title: "Samsung S22",
      price: "10.000",
    },
    {
      id: 1,
      url: "",
      title: "iPhone S22",
      price: "10.000",
    },
    {
      id: 2,
      url: "",
      title: "Huawei S22",
      price: "10.000",
    },
    {
      id: 3,
      url: "",
      title: "Oppo S22",
      price: "10.000",
    },
  ];

  const allBrands = [
    {
      id: 0,
      text: "Samsung",
      name: "checkbutton1",
    },
    {
      id: 1,
      text: "iPhone",
      name: "checkbutton2",
    },
    {
      id: 2,
      text: "Huawei",
      name: "checkbutton3",
    },
  ];

  const allModels = [
    {
      id: 0,
      text: "11",
      name: "checkbutton1",
    },
    {
      id: 1,
      text: "12",
      name: "checkbutton2",
    },
    {
      id: 2,
      text: "13",
      name: "checkbutton3",
    },
  ];



  useEffect(() => {
    dispatch(setAllProducts(allProducts));
    dispatch(setAllbrands(allBrands));
    dispatch(setAllmodels(allModels));
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

  const currentProducts = paginate(allProductsStore, currentPage, productsPerPage);

  const totalPageCount = Math.ceil(allProductsStore.length / productsPerPage);
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

  const [brandsCheckButtonsChecked, setBrandsCheckButtonsChecked] = useState({
    checkbutton1: false,
    checkbutton2: false,
    checkbutton3: false,
  });

  const handleBrandsCheckButtonChange = (event) => {
    const { name, checked } = event.target;
    setBrandsCheckButtonsChecked({ ...brandsCheckButtonsChecked, [name]: checked });
  };

  const [modelsCheckButtonsChecked, setModelsCheckButtonsChecked] = useState({
    checkbutton1: false,
    checkbutton2: false,
    checkbutton3: false,
  });

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
                  checked={brandsCheckButtonsChecked[brand.name]}
                  onChange={handleBrandsCheckButtonChange}
                />
              )) :
                allBrandsStore.map((brand, index) => (
                  <CheckButton
                    key={index}
                    text={brand.text}
                    name={brand.name}
                    checked={brandsCheckButtonsChecked[brand.name]}
                    onChange={handleBrandsCheckButtonChange}
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
                  checked={modelsCheckButtonsChecked[model.name]}
                  onChange={handleModelsCheckButtonChange}
                />
              )) :
                allModelsStore.map((model, index) => (
                  <CheckButton
                    key={index}
                    text={model.text}
                    name={model.name}
                    checked={modelsCheckButtonsChecked[model.name]}
                    onChange={handleModelsCheckButtonChange}
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
                    url={product.url}
                    price={product.price}
                    title={product.title}
                  />
                  {/* <button onClick={(e,index) =>handleAddToCart(e,index)} className="w-full bg-blue-600 text-white rounded h-8">Add to Cart</button> */}
                  <Button title={"Add to Cart"} handleClick={(e) => handleAddToCart(e, product.id)} />
                </div>
              </div>
            )) : currentProducts.map((product, index) => (
              <div onClick={() => handleProductClick(product.id)} className="w-1/4 px-2 cursor-pointer" key={index}>
                <div className="bg-white flex flex-col gap-2 w-44 h-min p-3">
                  <Product
                    url={product.url}
                    price={product.price}
                    title={product.title}
                  />
                  {/* <button onClick={(e,index) =>handleAddToCart(e,index)} className="w-full bg-blue-600 text-white rounded h-8">Add to Cart</button> */}
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
                  title={product.title}
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
