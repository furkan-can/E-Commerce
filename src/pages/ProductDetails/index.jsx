import { useParams } from 'react-router-dom';
import { Card, Title, CartItem, Button, TotalPrice } from "@/components"
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '@/store/slices/cartSlice';
import { Header } from "@/layout";

const ProductDetails = () => {
    const { id } = useParams();
    const productsInCart = useSelector(state => state.cart.productsInCart);
    const allProducts = useSelector((state) => state.products.allProducts);
    const dispatch = useDispatch();
    const product = allProducts.find((product) => product.id == parseInt(id));
    const handleAddToCart = () => {
        dispatch(addProductToCart(product));
    };
    return (
        <>
            <Header />
            <div className="xl:grid xl:grid-cols-5 bg-gray-100 h-screen2 xl:px-3 md:px-6 pt-8 2xl:px-60">
                <div className='col-span-4'>
                    <Card width={"w-full"}>
                        <div className='xl:grid xl:grid-cols-2 gap-10'>
                            <div className='col-span-1 w-full h-[30rem]'>
                                <img src={product.image} alt={product.name} className="w-full h-full" />
                            </div>
                            <div className='col-span-1'>
                                <span className="text-2xl">{product.name}</span>
                                <br />
                                <span className="text-blue-600 text-xl">{product.price}<span className="text-blue-600 text-xl">₺</span></span>
                                <Button optionalClassName={"mt-16"} title={"Add to Cart"} handleClick={() => handleAddToCart()} />
                                <p className='mt-7'>
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='col-span-1 flex flex-col gap-5 xl:ml-1 2xl:ml-4'>
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
        </>
    )
}

export default ProductDetails
