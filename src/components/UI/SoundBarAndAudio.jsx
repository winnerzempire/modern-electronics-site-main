import React from 'react';
import ProductsList from './ProductsList';

const SoundBarAndAudio = () => {
  const soundBarFilter = (item) => item.category?.title === 'SoundBarAndAudio';

  return (
    <div>
      <h2 className="section__title">Sound Bar and Audio</h2>
      <ProductsList filterCriteria={soundBarFilter} />
    </div>
  );
};

export default SoundBarAndAudio;
