import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const PaymentForm = () => {
    const {data : propertyBought = {}} = useLoaderData();
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

    console.log(propertyBought);

    const propertyInfo = {
        buyer : {
            name : propertyBought?.buyer?.name,
            email : propertyBought?.buyer?.email,
            image : propertyBought?.buyer?.image
        },
        title : propertyBought?.title,
        propertyId : propertyBought?.propertyId,
        wishlistId : propertyBought?.wishlistId,
        offeredId : propertyBought?._id,
        image : propertyBought?.image,
        location : propertyBought?.location,
        description : propertyBought?.description,
        totalAmount : propertyBought?.offeredAmount,
        agent : {
            name : propertyBought?.agent?.name, 
            email : propertyBought?.agent?.email,
            image : propertyBought?.agent?.image
        }

}

    return (
        <div>
              <Elements stripe={stripePromise}>
                    <CheckoutForm propertyInfo={propertyInfo} />
                </Elements>
        </div>
    );
};

export default PaymentForm;