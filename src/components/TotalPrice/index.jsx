import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TotalPrice = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const productsInCart = useSelector(state => state.cart.productsInCart);

    const calculateTotalPrice = () => {
        let price = 0;
        productsInCart.map((product) => {
            // const priceWithoutSpecialCharacters = parseFloat(product.price.replace(".", "").replace(",", "."));
            price += product.price * product.quantity;
        });
        return price;
    }

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [productsInCart])
    return (
        <span>Total Price: <span className="text-blue-600 font-semibold">{totalPrice}<span className="text-blue-600 font-semibold">₺</span></span></span>
    )
}

export default TotalPrice
