import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
const SignUp = () => {
  const [error, setError] = useState(null);
  const { createUser, updateUserName, loginWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignUP = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Password didn't match. Please try again");
      return;
    }
    if (password.length < 8) {
      setError("Password should be at least 8 characters");
      return;
    } else {
      setError("");
    }
    updateUserName(name)
      .then(() => {})
      .catch((error) => console.error(error));

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserName(name);

        const currentUser = {
          email: user.email,
        };
        fetch("https://saiful-car-servicing-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("car-token", data.token);
          });

        form.reset();
        navigate("/");
        console.log(user);
      })
      .catch((error) => console.error(error));
  };
  const handleGoogleSignUP = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email: user.email,
        };
        fetch("https://saiful-car-servicing-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("car-token", data.token);
          });
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content md:grid-cols-2 gap-24 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img className="" src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-5xl font-bold text-center pt-10">Sign up</h1>
            <form onSubmit={handleSignUP} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="signup"
                />
              </div>
              <span className="text-lg text-red-700 text-center">{error}</span>
            </form>
            <span className="text-center text-2xl">
              <small>or</small>
            </span>
            <button onClick={handleGoogleSignUP} className="btn  btn-warning">
              Sign up with Google
            </button>
            <p className="text-center pb-10">
              already have an account? please
              <Link to="/login" className="text-orange-600 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
