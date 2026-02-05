import React from "react";
import { Link } from "react-router";
import BrandLogo from "../Component/Shared/Logo/BrandLogo";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";
import PageTitle from "./PageTitle";

const SpecialOffer = () => {
  return (
    <div className="max-w-[80%] mx-auto">
      <PageTitle title="LocalChefBazaar | Special Offer"/>
      <Link to="/">
        <BrandLogo></BrandLogo>
      </Link>
      <div
        className="h-screen w-full bg-slate-100 mt-3 flex flex-col 
    justify-center items-center"
      >
        {/* <IoMdInformationCircleOutline className='text-4xl'/> */}
        <IoIosInformationCircleOutline className="text-5xl" />
        <h1 className="text-2xl font-bold">
          There are No special Offer Today.
        </h1>
        <p className="text-[20px] font-bold my-3">Pls. Check again</p>
        <Link to="/" className="btn btn-accent mt-2 font-bold hover:">
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default SpecialOffer;
