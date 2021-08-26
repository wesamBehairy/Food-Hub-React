import classes from './Card.module.css';

const Card = (Props) => {

    return <div className={classes.card}> {Props.children} </div>

}
 
export default Card;