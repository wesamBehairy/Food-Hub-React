import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {

    const inputref = useRef();

    const [validInput, setvalidInput] = useState(true);

    const SubmitHandler = (e) => {
        e.preventDefault();

        const enteredAmount = inputref.current.value;
        const enteredAmountnumber = +enteredAmount;

        if (enteredAmount.trim().length === 0
            || enteredAmountnumber < 1
            || enteredAmountnumber > 5) {
            setvalidInput(false);
            return;
        }
        props.onAddToCart(enteredAmountnumber);
    }

    return (
        <form className={classes.form} onSubmit={SubmitHandler}>

            <Input
                ref={inputref}
                label='Amount'
                input={{
                    id: 'amount_' + props.id, // this changed!
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />

            <button> + Add</button>

            {!validInput && <p> Error </p>}

        </form>
    )
}

export default MealItemForm;