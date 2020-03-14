import React, { useEffect } from 'react';
import ApiStore from '../../lib/ApiStore';

const HomePage = () => {
  useEffect(() => {
    ApiStore.getParties();
  });
  return (
    <>
      <div>Home</div>
    </>
  );
};

export default HomePage;
