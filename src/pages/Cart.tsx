import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div>Cart</div>
  )
}

export default Cart