import { Card, RadioButton, Title, CheckButton, SearchBar, CartItem, Product, Pagination, Button } from "@/components"
import { sortOptions } from "@/utils/constant";
import { useState } from "react";
import { useNavigate } from "react-router";

const Content = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const allProducts = [
    {
      url: "",
      title: "Samsung S22",
      price: "10.000",
    },
    {
      url: "",
      title: "Samsung S22",
      price: "10.000",
    },
    {
      url: "",
      title: "Samsung S22",
      price: "10.000",
    },
    {
      url: "",
      title: "Samsung S22",
      price: "10.000",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  };

  const currentProducts = paginate(allProducts, currentPage, productsPerPage);

  const totalPageCount = Math.ceil(allProducts.length / productsPerPage);
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

  const handleAddToCart = (e, index) => {
    console.log("add to cart", allProducts.at(index));
    e.stopPropagation();
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
            <SearchBar height={"h-10"} optionalClassName={"bg-gray-50"} />
            <CheckButton
              text="Adidas"
              name="checkbutton1"
              checked={brandsCheckButtonsChecked.checkbutton1}
              onChange={handleBrandsCheckButtonChange}
            />
          </Card>
        </div>
        <div>
          <Title title="Model" />
          <Card height={"h-40"} width={"w-60"}>
            <SearchBar height={"h-10"} optionalClassName={"bg-gray-50"} />
            <CheckButton
              text="11"
              name="checkbutton1"
              checked={modelsCheckButtonsChecked.checkbutton1}
              onChange={handleModelsCheckButtonChange}
            />
          </Card>
        </div>
      </div>
      <div className="col-span-3 relative">
        <div className="flex flex-wrap -mx-2 gap-y-5">
          {currentProducts.map((product, index) => (
            <div onClick={() => handleProductClick(index)} className="w-1/4 px-2 cursor-pointer" key={index}>
              <div className="bg-white flex flex-col gap-2 w-44 h-min p-3">
                <Product
                  url={product.url}
                  price={product.price}
                  title={product.title}
                />
                {/* <button onClick={(e,index) =>handleAddToCart(e,index)} className="w-full bg-blue-600 text-white rounded h-8">Add to Cart</button> */}
                <Button title={"Add to Cart"} handleClick={(e, index) => handleAddToCart(e, index)} />
              </div>
            </div>
          ))}
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
            <CartItem title={"Samsung S22"} price={"10.000"} />
          </Card>
        </div>
        <div>
          <Title title="Checkout" />
          <Card height={"h-24"} width={"w-64"}>
            <span>Total Price: <span className="text-blue-600 font-semibold">10.000<span className="text-blue-600 font-semibold">₺</span></span></span>
            {/* <button className="w-full h-8 text-white bg-blue-600 rounded">Checkout</button> */}
            <Button title={"Checkout"} handleClick={() => { }} />
          </Card>
        </div>
      </div>

    </div>
  )
}

export default Content
