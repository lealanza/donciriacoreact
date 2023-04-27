import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { signOut } from 'firebase/auth'
import { auth } from '../firabase.config'
import { toast } from 'react-toastify'
import '../styles/profile.css'

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Detectar cambios en el estado de autenticación
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario está autenticado
        console.log(user);
        setUser(user); // Guardar el objeto user en el estado local
      } else {
        // El usuario no está autenticado
        console.log('No autenticado');
        setUser(null);
      }
    });
    

    // Desuscribirse del listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);
  const logout = () =>{

    signOut(auth).then(()=>{
        toast.success('Cerro sesion')
    }).catch(err=>{
        toast.err(err.message)
    })
}
  return (
    <Helmet title='Perfil'>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              {user ? (
                <div>
                  <h2>Perfil de usuario</h2>
                <div className='profile__wrapper'>
                  
                  <div className='profile__content'>
                    <img src={user.photoURL} alt="Foto de perfil" className='img__profile' />
                    <h3 className='profile__username'>{user.displayName}</h3>
                  </div>
                  <div>
                    <button onClick={logout} className='buy__btn text-white'>Logout</button>
                  </div>
                </div>
                </div>
                
              ) : (
                <p>No estás autenticado</p>
              )}
            </Col>
          </Row>

        </Container>
      </section>

    </Helmet>
  );
}

export default Profile;
