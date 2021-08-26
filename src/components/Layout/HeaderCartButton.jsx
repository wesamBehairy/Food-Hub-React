import { useContext } from "react";
import CartContext from './../../store/cart-context';
import React from "react";
import styles from './HeaderCartButton.module.css';


const HeaderCartButton = (props) => {

    const cartctx = useContext(CartContext);

    const numberOfCartItems = cartctx.items.reduce( (CNumber , item ) => {
        return CNumber + item.amount;
    } , 0);

    return (
        <button className={styles.button} onClick={props.onClick}>
            <span className={styles.icon}>   <i class="fa fa-shopping-cart"></i> </span>
            <span> Your Cart  </span>
            <span className={styles.badge}> {numberOfCartItems} </span>
        </button>
    )
}

export default HeaderCartButton;