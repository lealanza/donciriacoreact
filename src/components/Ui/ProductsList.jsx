import React from 'react'
import ProdcutCard from './ProdcutCard'

const ProductsList = ({data}) => {
    return (
        <>
       
        {data.map( (item, index)=>(
            <ProdcutCard item={item} key={index}/>
        ))}
       
        </>
    )
}

export default ProductsList