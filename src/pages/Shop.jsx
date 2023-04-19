import React, {useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/Ui/CommonSection'
import { Container, Row, Col} from 'reactstrap'
import {FcSearch} from 'react-icons/fc'
import '../styles/shop.css'
import products from '../data/data'
import ProductsList from'../components/Ui/ProductsList'

const Shop = () => {
  const [productsData, setProductsData]= useState(products)
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    const filteredProducts =
      filterValue === "todos"
        ? products
        : products.filter((item) => item.category === filterValue);

    setProductsData(filteredProducts);
  };
  const handleFilterPrice = (e) => {
    const filterValue = e.target.value;
  
    // Ordenar productos por precio
    const sortedProducts =
      filterValue === "ascendente"
        ? [...products].sort((a, b) => a.price - b.price) // Ordenar de menor a mayor precio
        : filterValue === "descendente"
        ? [...products].sort((a, b) => b.price - a.price) // Ordenar de mayor a menor precio
        : products; // Mostrar productos en el orden original
  
    setProductsData(sortedProducts);
  };
  

  const handleSearch = (e) => {
    const searchTern = e.target.value
    const searchedProducts = products.filter(item => item.productName.toLocaleLowerCase().includes(searchTern.toLocaleLowerCase()))
    setProductsData(searchedProducts)
  }
  return (
    <Helmet title={"Shop"}>
       <CommonSection title="Productos"/>
       <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value='todos'>Filtro por Categorias</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="cascos">Cascos</option>
                  <option value="componentes">Componentes</option>
                  <option value="mtb">Mountain Bikes</option>
                  <option value="gravel">Gravel</option>
                  <option value="ruta">Ruta</option>
                  <option value="repuestos">Repuestos</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6'className='text-end'>
            <div className="filter__widget">
                <select onChange={(handleFilterPrice)}>
                  <option value='todos'>Ordenar por</option>
                  <option value="ascendente">Ascendente</option>
                  <option value="descendente">Descendente</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input  type="text" placeholder='Buscar......' onChange={handleSearch}/> <FcSearch className='search__icon'/>
              </div>
            </Col>
          </Row>
        </Container>
       </section>
       <section className='pt-0'>
        <Container>
          <Row>
            {
              productsData.length===0 ? (
              <h1 className='text-center fs-4'>No hay productos!!</h1>
              ):
              <ProductsList data={productsData}/>
            }
          </Row>
        </Container>
       </section>
    </Helmet>
   
  )
}

export default Shop