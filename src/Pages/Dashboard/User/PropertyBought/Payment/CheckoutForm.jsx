import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
// import { getClientSecret, saveBookingInfo, updateBookingStatus } from '../../Api/stripe'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";

const CheckoutForm = ({ propertyInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // Create Payment Intent
  //   ? get client secret form server
  useEffect(() => {
    if (propertyInfo?.totalAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: propertyInfo?.totalAmount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [propertyInfo, axiosSecure]);

  console.log("client secret", clientSecret);

  const { mutate : updateStatus } = useMutation({
    mutationKey: ['updateStatus'],
    mutationFn: async (propertyInfo) => {
        const { data: updatedData } = await axiosSecure.patch('/updateBoughtStatus', propertyInfo);
        console.log(updatedData);
  
    }})

  const { mutate } = useMutation({
    mutationKey: ["payment"],
    mutationFn: async (propertyInfo) => {
      const { data } = await axiosSecure.post(
        `/purchased-properties`,
        propertyInfo
      );
     console.log(data);
     updateStatus(propertyInfo);
    },
    onSuccess : () => {
        toast.success("Payment Successful.");
    }
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null || !card) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      toast.error(error.message);
      return;
    } else {
      console.log("payment method", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
        return toast.error(confirmError);
      //   setCardError(confirmError.message)
    }

    console.log("payment intent", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      // save payment information to the server
      const paymentInfo = {
        ...propertyInfo,
        transactionId: paymentIntent.id,
        date: new Date(),
        status: "bought",
      };
      console.log(paymentInfo);
      setTransactionId(paymentIntent.id);
      mutate(paymentInfo);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className='text-4xl text-center font-bold text-black'>Make a Payment</h1>
      <form
        className="my-2 bg-[#122c4e] w-full md:w-1/2 p-10 rounded-md  mx-auto"
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex mt-2 justify-between">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe}
            // disabled={!stripe || !clientSecret || processing}
            className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            {transactionId ? transactionId : `Pay ${propertyInfo?.totalAmount}$`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
