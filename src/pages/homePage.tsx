import React from 'react';
import { Header } from '../shared/ui/header/Header';
import { SpecialOffers } from '../features/specialOffers/components/specialOffer';

const HomePage = () => {
  return (
    <div>
      <Header />
      <SpecialOffers />
    </div>
  );
};

export default HomePage;
