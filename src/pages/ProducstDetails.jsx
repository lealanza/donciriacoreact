import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../data/data'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/Ui/CommonSection'
import '../styles/product-details.css'
import { motion } from 'framer-motion'
import ProductsList from '../components/Ui/ProductsList'
import { useDispatch } from 'react-redux'
import { cartActions } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify';

const ProducstDetails = () => {
  
  const [expanded, setExpanded] = useState([]);
  const [rating, setRating] = useState(null)
  const [tab, setTab] = useState('desc')
  const userReview = useRef('')
  const msgReview = useRef('')
  const dispatch = useDispatch()
  const { id } = useParams()
  const product = products.find((item) => item.id.toString() === id)
  const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, exp, category, stock } = product;
  const [stockProducts, setStockProducts] = useState(stock);
  const relatedProducts = products.filter((item)=>item.category===category)
  const handleSubmit = (e) =>{
    e.preventDefault()
    const reviewUserName = userReview.current.value
    const reviewUserText = msgReview.current.value

    const reviewObj={
      userName: reviewUserName,
      text:reviewUserText, 
      rating,
    };
    toast.success('Gracias por tu review!')
  }

  useEffect(()=>{
    window.scrollTo(0,0);
  }, [product]);

  const addToCart = () => {
    if (stockProducts === 0) {
      toast.error('No hay más productos');
      return;
    }
  
    dispatch(
      cartActions.addItem({
        id: id,
        productName: productName,
        price: price,
        imgUrl:imgUrl,
        stock: stockProducts - 1,
      }),
    );
    
    setStockProducts(stockProducts - 1); 
    toast.success('Producto agregado');
  };

  
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
                  <span><i class="ri-star-fill"></i></span>
                  <span>
                    <span>({avgRating}</span>Rating)
                  </span>
                </div>
                <div>
                  <p className='product__price'>${price}</p>
                  <p>Categoria: {category}</p>
                  <span className='mt-4'>{shortDesc}</span>
                </div>
                {console.log(stockProducts)}
                <motion.button whileTap={{ scale: 1.05 }} className='buy__btn text-white' onClick={addToCart} disabled={stockProducts === 0}>Comprar</motion.button>

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
                    <div className='exp__wrapper'>
                      {exp.map((item, index) => (
                        <div key={index} className='exp__section'>
                          <h6 className='exp__title'>
                            Componentes
                            <button className='btn__expand' onClick={() => setExpanded(expanded.includes(index) ? expanded.filter(item => item !== index) : [...expanded, index])}>
                              {expanded.includes(index) ? <i class="ri-arrow-up-s-line"></i> : <i class="ri-arrow-down-s-line"></i>}
                            </button>

                          </h6>
                          {expanded.includes(index) && (
                            <ul>
                              <li>
                                <p>Horquilla: <span>{item.horquilla}</span></p>
                                <p>Cuadro: <span>{item.cuadro}</span></p>
                                <p>Direccion: <span>{item.direccion}</span></p>
                                <p>Caja: <span>{item.caja}</span></p>
                                <p>Abrazadera: <span>{item.abrazadera}</span></p>
                                <p>Cadena: <span>{item.cadena}</span></p>
                                <p>Decarrilador Trasero: <span>{item.decarriladorTrasero}</span></p>
                                <p>Decarrilador Delantero: <span>{item.decarriladorDelantero}</span></p>
                                <p>Shifter: <span>{item.shifter}</span></p>
                                <p>Platos Palancas: <span>{item.platosPalancas}</span></p>
                                <p>Piñon: <span>{item.pinon}</span></p>
                                <p>Frenos: <span>{item.frenos}</span></p>
                                <p>Rotores: <span>{item.rotores}</span></p>
                                <p>Levas de Frenos: <span>{item.levasFrenos}</span></p>
                                <p>Asiento: <span>{item.asiento}</span></p>
                                <p>Avance: <span>{item.avance}</span></p>
                                <p>Manillar: <span>{item.manillar}</span></p>
                                <p>Mazas: <span>{item.mazas}</span></p>
                                <p>Aros: <span>{item.aros}</span></p>
                                <p>Cubierta Traserta: <span>{item.cubiertaTraserta}</span></p>
                                <p>cubierta Delantera: <span>{item.cubiertaDelantera}</span></p>
                                <p>Peso: <span>{item.peso}</span></p>
                              </li>
                            </ul>)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className='tab__wrapper d-flex align-item-center gap-5 mt-2'>
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={() => setTab('desc')}>Descripcion</h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6>
              </div>
              {
                tab === 'desc' ? (<div className="tab__content">
                  <p className='mt-2'>{description}</p>
                </div>) : (
                  <div className='product__review mt-2'>
                    <div className="review__wrapper">
                      <ul>
                        {
                          reviews?.map((item, index) => (
                            <li key={index} className='mb-4'>
                              <h6>Usuario: Dario</h6>
                              <span>Clasificación: {item.rating}</span>
                              <p>{item.text}</p>
                            </li>
                          ))
                        }
                      </ul>
                      <div className="review__form">
                        <h4>Deja tu experiencia</h4>
                        <form action="" onSubmit={handleSubmit}>
                          <div className="form__group">
                            <input type="text" placeholder='Ingrese su Nombre' ref={userReview}  required/>
                          </div>
                          <div className="form__group d-flex aling-items-center gap-2 rating__group">
                            <motion.span whileTap={{scale:1.05}} onClick={()=>setRating(1)}>1<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.05}} onClick={()=>setRating(2)}>2<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.05}} onClick={()=>setRating(3)}>3<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.05}} onClick={()=>setRating(4)}>4<i class="ri-star-fill"></i></motion.span>
                            <motion.span whileTap={{scale:1.05}} onClick={()=>setRating(5)}>5<i class="ri-star-fill"></i></motion.span>
                          </div>
                          <div className="form__group">
                            <textarea rows={3} type="text" placeholder='Ingrese su review' ref={msgReview} required/>
                          </div>
                          <button className='buy__btn text-white'>Enviar</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  )}
            </Col>
            <Col lg='12' className='mt-5'>
              <h2 className='related__title'>También podría gustarte</h2>
            </Col>
            <ProductsList data={relatedProducts}/>
          </Row>
        </Container>
      </section>
      
    </Helmet>
    
  )
  
}

export default ProducstDetails