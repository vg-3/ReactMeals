import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import { Fragment, useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  //UseState

  const [formIsshown, setFromIsShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  //Use Context

  const cartCxt = useContext(CartContext);
  const totalAmount = ` $${cartCxt.totalAmount.toFixed(2)}`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const onOrderHandler = () => {
    setFromIsShown(true);
  };

  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-86425-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCxt.items,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCxt.clearCart();
  };

  // jsx

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["btn-alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            price={item.price}
            name={item.name}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          ></CartItem>
        );
      })}
    </ul>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formIsshown && (
        <Checkout onConfirm={submitHandler} onCancel={props.onClose} />
      )}
      {!formIsshown && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data....</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
