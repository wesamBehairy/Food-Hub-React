import classes from './Cart.module.css';
import { Button, Modal } from 'react-bootstrap';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import React from 'react';


const Cart = (props) => {

    const [isSubmitting, setisSubmitting] = useState(false);

    const [didsubmit, setdidsubmit] = useState(false);

    const [isCheckout, setCheckout] = useState(false);

    const Cartctx = useContext(CartContext);

    const totalAmount = `$${Cartctx.totalAmount.toFixed(2)}`;

    const hasItems = Cartctx.items.length > 0;

    const CartItemRemoveHandler = (id) => {
        Cartctx.removeItem(id);
    }

    const CartItemAddHandler = (item) => {
        Cartctx.addItem({ ...item, amount: 1 });
    }

    const CartItems =
        <ul className={classes['cart-items']}>
            {Cartctx.items.map((item) => (
                <CartItem
                    key={item.id}
                    amount={item.amount}
                    price={item.price}
                    name={item.name}
                    onRemove={CartItemRemoveHandler.bind(null, item.id)}
                    onAdd={CartItemAddHandler.bind(null, item)} />
            ))}
        </ul>;

    const orderHandler = () => {
        setCheckout(true);
    }

    const submitorderHandler = (userData) => {

        setisSubmitting(true);

        fetch("https://react-http-49787-default-rtdb.firebaseio.com/orders.json", {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: Cartctx.items
            }),
        })
        setisSubmitting(false);
        setdidsubmit(true);
    }

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}> Close</Button>
            </Modal.Footer>
        </React.Fragment>
    );

    const modalContent =

        <React.Fragment>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {CartItems}

                <div className={classes.total}>
                    <span>Total Amount </span>
                    <span> {totalAmount} </span>
                </div>

            </Modal.Body>

            {!isCheckout &&

                <Modal.Footer>

                    <Button variant="secondary" onClick={props.onHide}> Close</Button>

                    {hasItems && <Button variant="primary" onClick={orderHandler}> Order</Button>}

                </Modal.Footer>
            }

            {isCheckout && <Checkout onCancel={props.onHide} onConfirm={submitorderHandler} />}
        </React.Fragment>;

    return <>

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

            {!didsubmit && !isSubmitting && modalContent}
            {isSubmitting && isSubmittingModalContent}
            {didsubmit && !isSubmitting && didSubmitModalContent}

        </Modal>
    </>
}

export default Cart;