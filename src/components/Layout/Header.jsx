import react from 'react';
import styles from './Header.module.css';
import HeaderImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {

    return (
        <react.Fragment>

            <header className={styles.header}>
                <h1> React Meals </h1>
                <HeaderCartButton onClick={props.onshow} />
            </header>

            <div className={styles['main-image']}>
                <img src={HeaderImage} alt='' />
            </div>

        </react.Fragment>
    );
}

export default Header;