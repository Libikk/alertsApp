import React from 'react';
import ProductsList from '../components/Shared/ProductsList';
import '../styles/currentDiscounts.scss';


const CurrentDiscounts = (props) =>
    <div className="container__current-discounts">
        <h2 className="current-discounts__title">
            Current Discounts
        </h2>
        <ProductsList products={props.currentDiscounts} pageName={'landingPage'} />
    </div>

export default CurrentDiscounts