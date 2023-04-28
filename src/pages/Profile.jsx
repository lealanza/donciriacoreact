import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { signOut } from 'firebase/auth'
import { auth, db } from '../firabase.config'
import { collection, query, where  } from "firebase/firestore";
import { toast } from 'react-toastify'
import '../styles/profile.css'
 
function Profile() {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

  const [userOrders, setUserOrders] = useState(null);
  const newOrderRef = collection(db, 'orders')
  const q = query(newOrderRef, where(newOrderRef, "==", "ac8eAeyzuhOGD7neHfxQtGtrkcv1"));
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        console.log("No autenticado");
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Cerro sesion");
      })
      .catch((err) => {
        toast.err(err.message);
      });
  };

  useEffect(() => {
    if (user) {
      const userOrdersQuery = newOrderRef.where("id", "==", user.uid);

      const unsubscribe = userOrdersQuery.onSnapshot((querySnapshot) => {
        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserOrders(orders);
      });

      return () => unsubscribe();
    }
  }, [user]);
  console.log(q)
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
