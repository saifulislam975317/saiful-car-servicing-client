import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";

const Checkout = () => {
  const { title, img, price, _id } = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleOrderConfirm = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;

    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };

    fetch("https://saiful-car-servicing-server.vercel.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Your order placed successfully.");
          form.reset();
          navigate("/orders");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <div className="mb-5">
        <img className="w-full rounded-lg h-96" src={img} alt="" />
        <h1 className="text-3xl">Service Name: {title}</h1>
        <p className="text-4xl text-orange-400">Price:${price}</p>
      </div>
      <form onSubmit={handleOrderConfirm}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-3">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            defaultValue={user?.displayName}
            className="input input-bordered w-full "
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            className="input input-bordered w-full "
          />
          <input
            type="email"
            placeholder="Your email"
            name="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full "
            required
          />
          <input
            type="text"
            placeholder="You phone number"
            name="phone"
            className="input input-bordered w-full"
            required
          />
        </div>
        <textarea
          className="textarea textarea-success w-full mb-2"
          placeholder="write your message here..."
          name="message"
          required
        ></textarea>
        <input
          className="btn btn-block btn-warning mb-5"
          type="submit"
          value="Order confirm"
        />
      </form>
    </div>
  );
};

export default Checkout;
