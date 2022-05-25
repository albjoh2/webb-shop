import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./checkout.styles.scss";

const Checkout = () => {
  const { chartItems } = useContext(CartContext);

  return (
    <div>
      <h1>Checkout page</h1>
      <div>
        {chartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <span>decrement</span>
              <span>increment</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
