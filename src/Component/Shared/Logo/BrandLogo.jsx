import React from 'react';
import Logo from "../Logo/Logo";



const BrandLogo = () => {
  return (
    <div className='flex items-center'>
      <Logo></Logo>
      <span className='text-2xl text-green-400 ml-0.5'>EcoTrack</span>
      
    </div>
  );
};

export default BrandLogo;