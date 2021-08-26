import react from 'react';
import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';
// import Cart from './../Cart/Cart';

const Meals = () => {

    return (
        <react.Fragment>
            <MealsSummary />
            <AvailableMeals />
            {/* <Cart /> */}
        </react.Fragment>
    );
}

export default Meals;