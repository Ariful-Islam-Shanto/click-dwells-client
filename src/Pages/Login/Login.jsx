import React from "react";
import Container from "../../Components/Container/Container";
import { Link } from "react-router-dom";

const Login = () => {
   const url = "https://i.ibb.co/LJdDfGJ/f12ce251f6443cefcce128b1b90f72aa.png"

   const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get('email');
    const password = form.get('password');
    console.log(email, password);
   }

  return (
    <div>
      <Container>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
             <img src="https://i.ibb.co/LJdDfGJ/f12ce251f6443cefcce128b1b90f72aa.png" alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
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
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className="text-neutral-100 font-thin text-center">New to ClickDwells? Please <Link><span className="text-blue-400 hover:underline"> #sign up</span></Link></p>
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default Login;
