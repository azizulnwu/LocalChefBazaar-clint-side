import React from "react";
import { Link } from "react-router";

const ModalSection = () => {
  return (
    <div className="w-full mt-10">
      <div
        className="hero w-full h-130"
        style={{
          backgroundImage: "url(https://i.ibb.co/fzGs7ynM/4891049.jpg)",
        }}
      >
        <div className="hero-overlay text-left"></div>
        <div className="hero-content text-neutral-content text-left">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold ">
              Discover Your Local Bazar, One Click Away{" "}
            </h1>
            <p className="mb-5 font-bold">
              Discover Your Local Bazar, One Click Away Get fresh updates on
              daily prices, new arrivals, and special offers from your
              neighborhood bazar—straight to your inbox. We respect your privacy
              and will never share your email address. Privacy Policy
            </p>
            <Link to="/register" className="btn btn-primary hover:bg-blue-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSection;
