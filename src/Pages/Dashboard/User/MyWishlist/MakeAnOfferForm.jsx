import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MakeAnOfferForm = () => {
  const {user} = useAuth();
  const { data: wishlist = {} } = useLoaderData();
  const axiosSecure = useAxiosSecure();

//   console.log(wishlist);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
   
    const title = data.title;
    const location = data.location;
    const agent = data.agent;
    const offeredAmount = data.amount;
    const buyerName = data.buyerName;
    const buyerEmail = data.buyerEmail;

    // console.log(title, location, agent, offeredAmount, buyerEmail, buyerName);

    const priceRangeMatch = wishlist?.price_range.match(/(\d[\d,.]*)/g);
    const minPrice = parseFloat(priceRangeMatch[0].replace(/,/g, ""));
    const maxPrice = parseFloat(priceRangeMatch[1].replace(/,/g, ""));

    if( offeredAmount < minPrice) {
        return toast.error("Sorry! Amount is too low.");
    }else if(offeredAmount > maxPrice) {
        return  toast.error("It's not in the range. Sorry!!");
    }

    
    // try {
        const offeredInfo = {
                buyer : {
                    name : buyerName,
                    email : buyerEmail,
                    image : user?.photoURL
                },
                title : title,
                propertyId : wishlist?.propertyId,
                wishlistId : wishlist?._id,
                image : wishlist?.image,
                location : location,
                description : wishlist?.description,
                offeredAmount : offeredAmount,
                date : new Date(),
                status : 'pending',
                agent : {
                    name : wishlist?.agent?.name || agent,
                    email : wishlist?.agent?.email,
                    image : wishlist?.agent?.image
                }
    
        }
    
        console.log(offeredInfo);

    //     const { data } = await axiosSecure.post('/offeredProperty', offeredInfo);
    //     if(data.insertedId) {
    //         toast.success('Successfully offered.')
    //         console.log(data);
    //     }
    // } catch (error) {
    //     console.log(error);
    //     toast.error(error.message);
    // }

    mutate(offeredInfo)
  };

  const { mutate } = useMutation({
    mutationFn : async (offeredInfo) => {
        const { data } = await axiosSecure.post('/offeredProperty', offeredInfo);
        if(data.insertedId) {
            toast.success('Successfully offered.')
            console.log(data);
        }
    } ,
    mutationKey : ['offered'],
})


  return (
    <div className="bg-[#0b161e] p-4 mt-4 rounded-md">
      <h1 className="text-4xl font-bold text-white text-center">
        Add Property
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body grid grid-cols-1 md:grid-cols-4"
      >
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            {...register("title")}
            name="title"
            value={wishlist?.title}
            type="text"
            placeholder="title"
            className="input input-bordered"
            required
          />
        </div>
        {/* <div className="form-control flex col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                 {...register("title")}
                  name="image"
                  type="file"
                  placeholder="image"
                  className="px-5 py-2"
                  required
                />
              </div> */}
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            {...register("location")}
            value={wishlist?.location}
            name="location"
            type="location"
            placeholder="location"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Agent Name</span>
          </label>
          <input
            {...register("agent")}
            value={wishlist?.agent?.name}
            name="agent"
            type="text"
            placeholder="Agent name"
            className="input input-bordered"
            required
          />
        </div>
        {/* <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Agent Email</span>
                </label>
                <input
                
                {...register("title")}
                  value={user?.email}
                  name="email"
                  type="text"
                  placeholder="Agent email"
                  className="input input-bordered"
                  required
                />
              </div> */}
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Offered Amount</span>
          </label>

          <input
            {...register("amount")}
            name="amount"
            type="text"
            placeholder="Offered Amount"
            className="input input-bordered"
            required
          />
        </div>
        {/* <div className="form-control col-span-1 md:col-span-4">
                <label className="label">
                  <span className="label-text"></span>
                </label>
                <textarea  {...register("title")} name="description" id="" cols="30" rows="2" className='px-5 py-5 rounded-lg' placeholder='Description'></textarea>
              </div> */}
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Buyer Email</span>
          </label>

          <input
            {...register("buyerEmail")}
            name="buyerEmail"
            value={wishlist?.user?.email}
            type="text"
            placeholder="Buyer Email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Buyer Name</span>
          </label>

          <input
            {...register("buyerName")}
            name="buyerName"
            value={wishlist?.user?.name}
            type="text"
            placeholder="Buyer Name"
            className="input input-bordered"
            required
          />
        </div>

        <div className="form-control mt-6 w-full">
          <button
            type="submit"
            className="btn bg-[#ffbb55] border-none text-gray-800 "
          >
            Make Offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeAnOfferForm;
