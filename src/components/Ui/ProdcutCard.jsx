import React from 'react'
import productImg from '../../images/productImg01.jpg'
import '../../styles/product-card.css'
import { Col } from 'reactstrap'
import { motion } from 'framer-motion'

const ProdcutCard = () => {
    return (
        <Col lg='3' md='4'>
            <div className="product__item">
                <div className="product__img">
                    <img src={productImg} alt="img-product" />
                </div>
                <div className="p-2 product__info">
                    <h3 className='product__name'>Aceite para horquillas Rockshok</h3>
                    <span>Aceite</span>
                </div>
                <div className="product__card-bottom d-flex align-item-center justify-content-between p-2">
                    <span className='price'>$19000</span>
                    <span><montion.i whileTap={{scale:1.1}} class="ri-add-line"></montion.i>
                   </span>
                </div>
            </div>
        </Col>

    )
}

export default ProdcutCard