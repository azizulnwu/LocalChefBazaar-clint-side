import React from 'react';
import ALlMeals from '../Component/MealSection/ALlMeals';
import CustomerReview from '../Component/MealSection/CustomerReview';
import HeroSection from '../Component/HeroSection/HeroSection';
import Footer from '../Component/Shared/Footer/Footer';
import ModalSection from '../Pages/ModalSection';

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <ALlMeals></ALlMeals>
      <CustomerReview></CustomerReview>
      <ModalSection></ModalSection>
      <Footer></Footer>

    </div>
  );
};

export default Home;