import CartItem from "../cartItem/CartItem";

import { Wrapper } from "./Cart.style";

import { CartItemType } from "../App";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id:number) => void;
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) =>{
    const calTotal = (items: CartItemType[])=>
        items.reduce((ark: number, item) => ark + item.amount * item.price, 0)
    
    return(
        <Wrapper>
            <h2>
                你的購物車車 🛒💨
            </h2>
            {cartItems.length ===0 ?<p>沒東西</p> : null}
            {cartItems.map(item => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
            ))}
            <h2>
                Total 💸: ${calTotal(cartItems).toFixed(2)}
            </h2>
        </Wrapper>
    )
}
export default Cart