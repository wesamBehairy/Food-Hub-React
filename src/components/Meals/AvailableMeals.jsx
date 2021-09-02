import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from './../UI/Card';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {

    const [meals, setmeals] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://react-http-49787-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();
            const loadedMeals = [];

            for (const key in responseData) {

                loadedMeals.push(
                    {
                        id: key,
                        name: responseData[key].name,
                        description: responseData[key].description,
                        price: responseData[key].price,
                    }
                );

            }
            setmeals(loadedMeals);
            setloading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return <section className = {classes.MealsLoading}>
            <p>... loading </p>
        </section>
    }

    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id} // this is new!
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />);

    return (
        <section className={classes.meals}>
            <Card>
                <ul> {mealsList} </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;