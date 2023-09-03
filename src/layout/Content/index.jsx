import { Card, RadioButton, Title, CheckButton, SearchBar, CartItem, Product } from "@/components"
import { sortOptions } from "@/utils/constant";
import { useState } from "react";

const Content = () => {
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
      <div className="col-span-1  flex flex-col gap-5">
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
      <div className="col-span-3 grid grid-cols-4">
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
        <Product url={""} price={"117.000"} title={"iPhone 13 Pro Max 256Gb"} />
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
            <button className="w-full h-10 text-white bg-blue-600 rounded">Checkout</button>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Content
