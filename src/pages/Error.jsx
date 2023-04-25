import React from 'react'
import error404 from '../images/error404.png'
import '../styles/error.css'

const Error = () => {
  return (
    <div className='error'>
      <img src={error404} alt=""/>
    </div>
  )
}

export default Error