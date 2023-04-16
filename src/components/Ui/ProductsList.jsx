import React from 'react'
import ProdcutCard from './ProdcutCard'

const ProductsList = ({data}) => {
    return (
        <>
       
        {data.map( item=>(
            <ProdcutCard item={item}/>
        ))}
       
        </>
    )
}

export default ProductsList