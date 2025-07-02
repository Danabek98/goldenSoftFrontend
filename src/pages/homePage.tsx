import React from 'react';
import { Header, WhyUs, Categories } from '../shared/ui/index';
import { SpecialOffers } from '../features/specialOffers/components/specialOffer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <SpecialOffers />
      <WhyUs />
      <Categories />
    </div>
  );
};

export default HomePage;
