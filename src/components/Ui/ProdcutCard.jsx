import React from 'react'
import '../../styles/product-card.css'
import { Col } from 'reactstrap'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ProdcutCard = ({ item }) => {
    return (
        <Col lg='3' md='4' className='mb-2'>
            <div className="product__item">
                <div className="product__img">
                    <motion.img whileHover={{ scale: .9 }} src={item.imgUrl} alt="img-product" />
                </div>
                <div className="p-2 product__info">
                    <h3 className='product__name'><Link to={`/shop/${item.id}`}>{item.productName}</Link></h3>
                    <span>{item.category}</span>
                </div>
                <div className="product__card-bottom d-flex align-item-center justify-content-between p-2">
                    <div className='price__details'>
                        {item.price.map((price, index) => (
                            <span key={index} className='price'>
                                Efectivo: ${price.Efectivo}
                            </span>
                        ))}
                        {item.price.map((price, index) => (
                            <span key={index} className='price'>
                                Tarjeta: ${price.Tarjeta}
                            </span>
                        ))}
                    </div>


                    <motion.span whileTap={{ scale: 1.3 }}><i class="ri-add-line"></i>
                    </motion.span>
                </div>
            </div>
        </Col>

    )
}

export default ProdcutCard