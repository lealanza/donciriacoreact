import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase.config';

function ContadorVisitas() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const contadorDocRef = doc(db, 'contador', 'mi-contador');
    getDoc(contadorDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setContador(docSnapshot.data().contador);
      } else {
        setContador(1);
        setDoc(contadorDocRef, { contador: 1 });
      }
    });
  }, []);

  useEffect(() => {
    const contadorDocRef = doc(db, 'contador', 'mi-contador');
    if (contador > 0) {
      updateDoc(contadorDocRef, { contador: increment(1) });
    }
  }, [contador]);

  return (
    <div>
      <h1 className='text-white fs-4 mt-4 fw-bold'>Visitas: {contador}</h1>
      
    </div>
  );
}

export default ContadorVisitas;
