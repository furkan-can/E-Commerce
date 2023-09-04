import { Card, RadioButton, Title, CheckButton, SearchBar } from "@/components"
import { sortOptions } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setAllProducts } from '@/store/slices/productsSlice';
import { setAllbrands } from '@/store/slices/brandSlice';
import { setAllmodels } from '@/store/slices/modelSlice';
import { fetchProductData } from '@/services/dataServices';
import { setFilteredProducts, addFilteredProductsByBrands, addFilteredProductsByModels, clearFilterProductByBrands, clearFilterProductByModels } from '@/store/slices/productsSlice';

const Filters = () => {


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
  const isFilterActiveModel = useSelector((state) => state.models.isFilterActive);
  const filteredModels = useSelector((state) => state.models.filteredmodels);

  const allBrandsStore = useSelector((state) => state.brands.allbrands);
  const isFilterActiveBrand = useSelector((state) => state.brands.isFilterActive);
  const filteredBrands = useSelector((state) => state.brands.filteredbrands);

  const allProductsStore = useSelector((state) => state.products.allProducts);
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const dispatch = useDispatch();



  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    const temp = filteredProducts.length ? filteredProducts : allProductsStore;
    if (event.target.value === sortOptions[0].value) {
      dispatch(setFilteredProducts(temp.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))));
    }

    if (event.target.value === sortOptions[3].value) {
      dispatch(setFilteredProducts(temp.slice().sort((a, b) => a.price - b.price)));
    }
    if (event.target.value === sortOptions[2].value) {
      dispatch(setFilteredProducts(temp.slice().sort((a, b) => b.price - a.price)));

    }
    if (event.target.value === sortOptions[1].value) {
      dispatch(setFilteredProducts(temp.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))));
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
      dispatch(addFilteredProductsByBrands(Array.isArray(filterProduct) ? filterProduct : [filterProduct]));
    } else {
      dispatch(clearFilterProductByBrands());
    }
  }, [brandsCheckButtonsChecked]);

  const getFilteredProductsByBrands = () => {
    const selectedBrands = Object.keys(brandsCheckButtonsChecked).filter((brandName) => brandsCheckButtonsChecked[brandName]);
    return allProductsStore.filter((product) => selectedBrands.includes(product.brand));
  };

  const handleBrandsCheckButtonChange = (event) => {
    const { name, checked } = event.target;
    setBrandsCheckButtonsChecked((prevCheckButtons) => ({
      ...prevCheckButtons,
      [name]: checked,
    }));
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
      dispatch(addFilteredProductsByModels(Array.isArray(filterProduct) ? filterProduct : [filterProduct]));
    } else {
      dispatch(clearFilterProductByModels());
    }
  }, [modelsCheckButtonsChecked]);

  const getFilteredProductsByModels = () => {
    const selectedModels = Object.keys(modelsCheckButtonsChecked).filter((modelName) => modelsCheckButtonsChecked[modelName]);
    return allProductsStore.filter((product) => selectedModels.includes(product.model));
  };

  const handleModelsCheckButtonChange = (event) => {
    const { name, checked } = event.target;
    setModelsCheckButtonsChecked((prevCheckButtons) => ({
      ...prevCheckButtons,
      [name]: checked,
    }));
  };
  return (
    <>
      <div>
        <Title title="Sort by" />
        <Card backgroundColor={"bg-gray-400"} height={"h-40"} width={"xl:w-60"}>
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
      <div className="flex xl:hidden border-b-2 border-gray-200"></div>
      <div>
        <Title title="Brands" />
        <Card backgroundColor={"bg-gray-400"} height={"h-40"} width={"xl:w-60"}>
          <SearchBar title={"Search"} searchType={"brand"} height={"h-10"} optionalClassName={"bg-gray-50"} />
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
      <div className="flex xl:hidden border-b-2 border-gray-200"></div>

      <div>
        <Title title="Model" />
        <Card backgroundColor={"bg-gray-400"} height={"h-40"} width={"xl:w-60"}>
          <SearchBar title={"Search"} searchType={"model"} height={"h-10"} optionalClassName={"bg-gray-50"} />
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
    </>
  )
}

export default Filters
