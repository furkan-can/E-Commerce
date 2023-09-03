import { useParams } from 'react-router-dom';
import { Card, Title, CartItem, Button } from "@/components"

import { Header } from "@/layout";

const ProductDetails = () => {
    const { id } = useParams();
    const handleAddToCart = (e) => {
        console.log("add to cart", id);
        e.stopPropagation();
    };
    return (
        <>
            <Header />
            <div className="grid grid-cols-5 bg-gray-100 h-screen2 px-60 pt-8">
                <div className='col-span-4'>
                    <Card width={"w-full"}>
                        <div className='grid grid-cols-2 gap-10'>
                            <div className='col-span-1 w-full h-[30rem]'>
                                <img src="https://picsum.photos/200/300" alt="product" className="w-full h-full" />
                            </div>
                            <div className='col-span-1'>
                                <span className="text-2xl">iPhone 11 Pro Max</span>
                                <br />
                                <span className="text-blue-600 text-xl">10.000<span className="text-blue-600 text-xl">₺</span></span>
                                <Button optionalClassName={"mt-16"} title={"Add to Cart"} handleClick={(e) => handleAddToCart(e)} />
                                <p className='mt-7'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dolore ad laudantium cumque dicta. Cumque eveniet dolor officiis inventore culpa maiores commodi sint, repellendus eaque nam expedita nobis nemo laboriosam. Blanditiis repellendus voluptate cumque porro modi animi iste temporibus incidunt, dolorum tempore non quae libero adipisci laboriosam odio in vero, vel repellat nam tenetur, eos inventore consequuntur? Quisquam unde repudiandae beatae iusto facilis? Ut quam, fuga eius officiis placeat voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid obcaecati reiciendis odit nesciunt enim laudantium. Ut fuga voluptatibus nesciunt aperiam.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='col-span-1 flex flex-col gap-5 ml-4'>
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
                            <Button title={"Checkout"} handleClick={() => { }} />
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails
