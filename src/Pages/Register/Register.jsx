import React, { useState } from "react";
import Container from "../../Components/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import toast from "react-hot-toast";
import { FidgetSpinner } from "react-loader-spinner";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const image_hosting_key = import.meta.env.VITE_IMAGE_BB_API_KEY;
  const imageBB_Hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const image = form.get("image");
    console.log(name, email, password, image);

    if (!name || !email || !password || !image) {
      setProcessing(false)
      return toast.error("Please fill the form correctly.");
    }

    const haveSpecialCharacter =
      /[\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\:;\<\>,\.\?~\\\-=\|]/.test(password);

    if (!/.{6,}/.test(password)) {
      return toast.error("Password must be 6 characters long.");
    } else if (!/(?=.*[A-Z])/.test(password)) {
      return toast.error("Password must contain a uppercase letter.");
    } else if (!haveSpecialCharacter) {
      return toast.error("Password must have a special character.");
    }

    try {
      //? Host the item image into imageBB
      const imageFile = { image: image };
      const res = await axiosPublic.post(imageBB_Hosting_Api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const hostedImg = res.data.data.display_url;

        //? Now create user
        const user = await createUser(email, password);
        console.log(user);

        //? if user is successfully created then update the profile.
        if (user) {
         
          await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: hostedImg,
          });

          //? Save user to database.
          const user = {
            name: name,
            email: email,
            image: hostedImg,
            role: "guest",
          };
          const { data } = await axiosPublic.put(`/users/${email}`, user);
          console.log(data);
          if (data.modifiedCount > 0) {
            console.log(data);
          }
          setProcessing(false)
          toast.success("Successfully Created Account.");
          navigate("/");

        }
      }

      // Clear the form after successful submission
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <Container>
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Register Now!</h1>
              <img
                src="https://i.ibb.co/LJdDfGJ/f12ce251f6443cefcce128b1b90f72aa.png"
                alt=""
              />
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control flex ">
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
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div onClick={() => setProcessing(true)} className="form-control mt-6">
                <button
                    type="submit"
                    className="btn bg-[#d27a10] text-gray-800"
                  >
                    {processing ? (
                      <FidgetSpinner
                        visible={true}
                        height="20"
                        width="20"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                        ballColors={["#ff0000", "#00ff00", "#0000ff"]}
                        backgroundColor="#F4442E"
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </form>
              <p className=" pb-4 font-thin text-center">
                New to ClickDwells? Please{" "}
                <Link to={"/login"}>
                  <span className="text-blue-400 hover:underline">
                    {" "}
                    #sign in
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
