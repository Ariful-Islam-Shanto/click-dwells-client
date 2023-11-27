import React from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const UpdateProperty = () => {

    const {data : updateProperty } = useLoaderData();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();


    const handleSubmit = async e => {
        e.preventDefault();

        const form = new FormData(e.target);
        const title = form.get('title');
        const location = form.get('location');
        const image = form.get('image');
        const agentName = form.get('agent');
        const agentEmail = form.get('email');
        const priceRange = form.get('price');
        const description = form.get('description');
      
        if(!title || !location || !image || !agentName || !agentEmail || !priceRange || !description) {
            return toast.error('Please fill out the form correctly.')

        }
        
        console.log(title, location, priceRange, agentEmail , agentName, description);
        
    try {
        
           const property = {
            title : title || updateProperty?.title,
            image :  image || updateProperty?.image,
            description : description || updateProperty?.description,
            location : location || updateProperty?.location,
            status : updateProperty?.status,
            agent : {
                name : agentName || updateProperty?.agent?.name,
                email : agentEmail || updateProperty?.agent?.email,
                image : user?.photoURL || updateProperty?.agent?.image,
            },
            price_range : priceRange || updateProperty?.price_range
           }

           console.log('updated property', property);
            //? Save the property info to database
            const {data} = await axiosSecure.patch(`/updateProperty/${updateProperty?._id}`, property);

            console.log(data);
            if(data.modifiedCount > 0) {
                toast.success("Successfully updated property");
                console.log(data);
            }
        // }

    // Clear the form after successful submission
    e.target.reset();

    } catch (error) {
        console.error('Error:', error);
        toast.error(error.message);
    }

    }

    
    return (
        <div className='bg-[#0b161e] p-4 mt-4 rounded-md'>
            <h1 className='text-4xl font-bold text-white text-center'>Update Property</h1>
             <form onSubmit={handleSubmit} className="card-body grid grid-cols-1 md:grid-cols-4">
              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                 defaultValue={updateProperty?.title}
                  name="title"
                  type="text"
                  placeholder="title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                defaultValue={updateProperty?.image}
                  name="image"
                  type="text"
                  placeholder="image"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                defaultValue={updateProperty?.location}
                  name="location"
                  type="text"
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
                value={updateProperty?.agent?.name}
                  name="agent"
                  type="text"
                  placeholder="Agent name"
                  className="input input-bordered"
                  required
                />
              
              </div>
              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Agent Email</span>
                </label>
                <input
                 value={updateProperty?.agent?.email}
                  name="email"
                  type="text"
                  placeholder="Agent email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Price Range</span>
                </label>
               
                <input
                defaultValue={updateProperty?.price_range}
                  name="price"
                  type="text"
                  placeholder="Price range"
                  className="input input-bordered"
                  required
                />
               
              </div>
              <div className="form-control col-span-1 md:col-span-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea defaultValue={updateProperty?.description} name="description" id="" cols="30" rows="2" className='px-5 py-5 rounded-lg' placeholder='Description'></textarea>
              </div>


              <div className="form-control mt-6 w-full">
                <button type="submit" className="btn bg-[#ffbb55] border-none text-gray-800 ">Update</button>
              </div>
            </form>
        </div>
    );
};

export default UpdateProperty;