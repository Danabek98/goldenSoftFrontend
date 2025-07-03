import React from 'react';
import { Header, WhyUs, Categories } from '../shared/ui/index';
import { SpecialOffers } from '../features/specialOffers/components/specialOffer';
import { PopularProducts } from '../features/recentlyAndPopular';

const HomePage = () => {
  return (
    <div>
      <Header />
      <SpecialOffers />
      <WhyUs />
      <Categories />
      <PopularProducts />
    </div>
  );
};

export default HomePage;
