import classes from './Cart.module.css';
import { Button, Modal } from 'react-bootstrap';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';


const Cart = (props) => {

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

    return <>

        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>

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

            <Modal.Footer>

                <Button variant="secondary" onClick={props.onHide}> Close</Button>

                {hasItems && <Button variant="primary"> Order</Button>}

            </Modal.Footer>

        </Modal>
    </>
}

export default Cart;