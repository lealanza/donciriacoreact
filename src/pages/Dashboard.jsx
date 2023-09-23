
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNavbar from '../admin/AdminNavbar';
import {Container, Col, Row} from 'react-bootstrap';


const Dashboard = () => {
   
  return (
    <div>
       <Container>
           <Row>
               <Col>
              <h4>dashboard</h4>
               </Col>
           </Row>
       </Container>
        
    </div>
  )
}

export default Dashboard