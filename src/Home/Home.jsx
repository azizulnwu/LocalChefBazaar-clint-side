import React from "react";
import ALlMeals from "../Component/MealSection/ALlMeals";
import CustomerReview from "../Component/MealSection/CustomerReview";
import HeroSection from "../Component/HeroSection/HeroSection";
import Footer from "../Component/Shared/Footer/Footer";
import ModalSection from "../Pages/ModalSection";
import PageTitle from "../Pages/PageTitle";

const Home = () => {
  return (
    <div>
      <PageTitle title="LocalChefBazaar | Home">
        <HeroSection></HeroSection>
        <ALlMeals></ALlMeals>
        <CustomerReview></CustomerReview>
        <ModalSection></ModalSection>
        <Footer></Footer>
      </PageTitle>
    </div>
  );
};

export default Home;
