import classes from './Checkout.module.css';
import { useRef } from 'react';
import { useState } from 'react';

const Checkout = (props) => {

    const [formInputsValidity, setformInputsValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    });

    const isEmpty = (val) => val.trim() === '';
    const isfiveChar = (val) => val.trim().length === 5;

    const NameRef = useRef();
    const StreetRef = useRef();
    const PostalCodeRef = useRef();
    const CityRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = NameRef.current.value;
        const enteredStreet = StreetRef.current.value;
        const enterePostal = PostalCodeRef.current.value;
        const enteredCity = CityRef.current.value;

        const nameinputisvalid = !isEmpty(enteredName);
        const streetinputisvalid = !isEmpty(enteredStreet);
        const postalinputisvalid = !isEmpty(enterePostal);
        const cityinputisvalid = isfiveChar(enteredCity);

        setformInputsValidity({
            name: nameinputisvalid,
            street: streetinputisvalid,
            postal: postalinputisvalid,
            city: cityinputisvalid
        });

        const formisvalid =
            nameinputisvalid &&
            streetinputisvalid &&
            postalinputisvalid &&
            cityinputisvalid;

        if (!formisvalid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enterePostal,
            city: enteredCity
        })
    }

    return (

        <div className="container mb-3">

            <form onSubmit={confirmHandler}>

                <div className={` ${formInputsValidity.name ? '' : classes.invalid}`}>
                    <label htmlfor="name" className="form-label">your name</label>
                    <input type="text" className="form-control" id="name" ref={NameRef} />
                    {!formInputsValidity.name && <p> Error name </p>}
                </div>

                <div className={`${formInputsValidity.street ? '' : classes.invalid}`}>
                    <label htmlfor="street" className="form-label">address</label>
                    <input type="text" className="form-control" id="street" ref={StreetRef} />
                    {!formInputsValidity.street && <p> Error street </p>}
                </div>

                <div className={`${formInputsValidity.postal ? '' : classes.invalid}`}>
                    <label htmlfor="postal" className="form-label">postal code</label>
                    <input type="text" className="form-control" id="postal" ref={PostalCodeRef} />
                    {!formInputsValidity.postal && <p> Error posatl </p>}
                </div>

                {/* className="col-8 mb-3" */}

                <div className={`${formInputsValidity.city ? '' : classes.invalid}`}>
                    <label htmlfor="city" className="form-label" > City </label>
                    <input type="text" className="form-control" id="city" ref={CityRef} />
                    {!formInputsValidity.city && <p> Error city </p>}
                </div>

                <button type="button" className="btn btn-primary m-2" onClick={props.onCancel}> cancel </button>
                <button type="submit" className="btn btn-danger"> confirm </button>

            </form>
        </div>
    )

}

export default Checkout;