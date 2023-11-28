import React from 'react';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddProperty = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
    const imageBB_Hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


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
        
        //? Host the item image into imageBB
        const imageFile = { image : image }
        const res = await axiosPublic.post(imageBB_Hosting_Api, imageFile , {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        });
        if(res.data.success) {
           const hostedImg = res.data.data.display_url;
           console.log("Hosted Image", hostedImg);
           const property = {
            title : title,
            image :  hostedImg,
            description : description,
            location : location,
            status : 'pending',
            agent : {
                name : agentName,
                email : agentEmail,
                image : user?.photoURL
            },
            price_range : priceRange
           }
            //? Save the property info to database
            const {data} = await axiosSecure.post('/properties', property);
            console.log(data);
            if(data.insertedId) {
                toast.success("Successfully added property");
                console.log(data);
            }
        }

    // Clear the form after successful submission
    e.target.reset();

    } catch (error) {
        console.error('Error:', error);
        toast.error(error.message);
    }

    }
    return (
        <div className='bg-[#0b161e] p-4 mt-4 rounded-md'>
            <h1 className='text-4xl font-bold text-white text-center'>Add Property</h1>
             <form onSubmit={handleSubmit} className="card-body grid grid-cols-1 md:grid-cols-4">
              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
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
                  name="image"
                  type="file"
                  placeholder="image"
                  className="px-5 py-2"
                  required
                />
              </div>
              <div className="form-control col-span-1 md:col-span-2">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
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
                value={user?.displayName}
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
                  value={user?.email}
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
                <textarea name="description" id="" cols="30" rows="2" className='px-5 py-5 rounded-lg' placeholder='Description'></textarea>
              </div>


              <div className="form-control mt-6 w-full">
                <button type="submit" className="btn bg-[#ffbb55] border-none text-gray-800 ">Add Property</button>
              </div>
            </form>
        </div>
    );
};

export default AddProperty;