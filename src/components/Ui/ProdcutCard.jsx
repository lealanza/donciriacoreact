import React, { useState} from 'react'
import '../../styles/product-card.css'
import { Col } from 'reactstrap'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cartActions } from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify';


const ProductCard = ({ item }) => {
    const dispatch = useDispatch()
    const [stockProducts, setStockProducts] = useState(item.stock)

    const addToCart = () => {
        if (stockProducts === 0) {
          toast.error('No hay más productos');
          return;
        }
      
        dispatch(
          cartActions.addItem({
            id: item.id,
            productName: item.productName,
            price: item.price,
            imgUrl: item.imgUrl,
            stock: item.stockProducts - 1,
          }),
        );
        
        setStockProducts(stockProducts - 1); 
        toast.success('Producto agregado');
      };

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

                        <span className='price'>
                            Precio: ${item.price}
                        </span>

                    </div>
                    {stockProducts > 0 ?
                        <button onClick={addToCart} className='cart-button'>
                            <i class="ri-add-line"></i>
                        </button> :
                        <div className='stock-unavailable'>
                            Sin stock
                        </div>
                    }
                </div>
            </div>
        </Col>
    )
}



export default ProductCard