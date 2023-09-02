import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../src/assets/logo/car logo.png";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut().then({});
  };
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/services">Services</Link>
      </li>
      <li>
        <Link to="/about">About us</Link>
      </li>

      <li>
        <Link to="/orders">Orders</Link>
      </li>
      <>
        {user?.uid ? (
          <li onClick={handleSignOut}>
            <Link to="/login">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </li>
        )}
      </>
    </>
  );
  return (
    <div data-theme="luxury" className="navbar p-5  text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-4  shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img style={{ height: "50px" }} src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
    </div>
  );
};

export default Header;
