import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
const Login = () => {
  const [error, setError] = useState(null);
  const [forgotEmail, setForgotEmail] = useState("");
  const { login, passwordReset, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
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
            navigate(from, { replace: true });
          });

        form.reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleBlurEmail = (event) => {
    const email = event.target.value;
    setForgotEmail(email);
  };

  const handleForgetPassword = () => {
    if (!forgotEmail) {
      alert("please enter your email in input field");
      return;
    }
    passwordReset(forgotEmail)
      .then(() => {
        alert("Password reset email sent your email");
      })
      .catch((error) => console.error(error));
  };

  const handleGoogleLogin = () => {
    loginWithGoogle().then((result) => {
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
          navigate(from, { replace: true });
        });
    });
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content md:grid-cols-2 gap-24 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img className="" src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-5xl font-bold text-center">Login</h1>
            <form onSubmit={handleLogin} className="card-body pb-0">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onBlur={handleBlurEmail}
                  type="email"
                  name="email"
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
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
              {error && (
                <span className="text-lg text-center text-red-600">
                  Error! Invalid email or password
                </span>
              )}
            </form>

            <button
              onClick={handleForgetPassword}
              className="btn-link mt-0 text-left ml-10"
            >
              Forgot Password
            </button>

            <span className="text-center text-2xl">
              <small>or</small>
            </span>
            <button onClick={handleGoogleLogin} className="btn  btn-warning">
              Login with Google
            </button>

            <p className="text-center py-5">
              Don't have an account? please
              <Link to="/signup" className="text-orange-600 font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
