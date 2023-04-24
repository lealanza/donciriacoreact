import React from 'react';
import ProdcutCard from './ProdcutCard';

const ProductsList = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <ProdcutCard 
          item={item} 
          key={index} 
          isOutOfStock={item.stock <= 0} 
        />
      ))}
    </>
  );
};

export default ProductsList;