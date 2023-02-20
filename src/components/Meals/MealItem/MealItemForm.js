import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  //
  const [amountIsValid, setAmountIsValid] = useState(true);

  // use Ref
  const amountHandler = useRef();

  const sumbmitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountHandler.current.value;
    const enteredAmountNUmber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNUmber < 1 ||
      enteredAmountNUmber > 10
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddTOCart(enteredAmountNUmber);
  };

  return (
    <form onSubmit={sumbmitHandler} className={classes.form}>
      <Input
        ref={amountHandler}
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          min: 1,
          max: 10,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>please enter the valid amount (1-10)</p>}
    </form>
  );
};

export default MealItemForm;
