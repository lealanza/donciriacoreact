import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../data/data'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/Ui/CommonSection'
import '../styles/product-details.css'
import { motion } from 'framer-motion'

const ProducstDetails = () => {
  const [tab, setTab] = useState('desc')
  const { id } = useParams()
  const product = products.find((item) => item.id.toString() === id)
  const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, exp, category } = product;
  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt={id} />
            </Col>
            <Col lg='6'>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center mb-4">
                  <span><i class="ri-star-fill"></i></span>
                  <span><i class="ri-star-fill"></i></span>
                  <span><i class="ri-star-fill"></i></span>
                  <span><i class="ri-star-fill"></i></span>
                  <span><i class="ri-star-half-line"></i></span>
                  <span>
                    <span>({avgRating}</span>Rating)
                  </span>
                </div>
                <div>
                  <p className='product__price'>${price}</p>
                  <span className='mt-4'>{shortDesc}</span>
                </div>
                <motion.button whileTap={{ scale: 1.05 }} className='buy__btn text-white'>Comprar</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
                        <Container>
                          <Row>
                            <Col lg='12'>
                              {
                                (category === 'mtb' || category === 'gravel' || category === 'ruta') && (
                                  <div className='product__exp'>
                                    <h6 className='exp__title'>Experiencia</h6>
                                    <ul>
                                      <li>Horquilla: {exp?.horquilla}</li>
                                      <li>Cuadro: {exp?.cuadro}</li>
                                    </ul>
                                  </div>
                                )
                              }
                            </Col>
                          </Row>
                        </Container>
                      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='tab__wrapper d-flex align-item-center gap-5 mt-5'>
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Descripcion</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6>


              </div>

              <div className="tab__content">
                <p className='mt-4'>{description}</p>
              </div>

              <div className='product__review mt-4'>
                <div className="review__wrapper">
                  <ul>
                    {
                      reviews?.map((item, index) => (
                        <li key={index}>
                          <span>Clasificación: {item.rating}</span>
                          <p>{item.text}</p>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>



            </Col>
          </Row>
        </Container>
      </section>


    </Helmet>
  )
}

export default ProducstDetails