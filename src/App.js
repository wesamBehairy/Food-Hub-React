import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';


function App() {

  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);

  return (

    <CartProvider>

      <Cart
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Header onshow={handleShow} />

      <main>
        <Meals />
      </main>

    </CartProvider>
  );
}

export default App;
