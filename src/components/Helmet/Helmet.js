import React from 'react'

const Helmet = (props) => {
    document.title ='Don Ciriaco - ' + props.title
  return (
    <div className=''>
      {props.children}
    </div>
  )
}

export default Helmet
