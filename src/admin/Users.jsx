import { useEffect, useState } from 'react'
import { getUser } from '../axios/axios-user'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUser();
        setUsers(response.users);
      } catch (error) {
      }
    };

    fetchOrders();
  }, []);
  console.log(users)
  return (
    <>
   
    <div style={{margin:'auto', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <table >
          <thead style={{margin:10}}>
            <tr style={{textAlign:'center', margin:10, fontSize:20, fontWeight:'bold', color:'blue'}}>
              <th style={{margin:10}}>Nombre</th>
              <th style={{margin:10}}>Email</th>
              <th style={{padding:10}}>Rol</th>
             
            </tr>
          </thead>
            {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 'us3r' ? 'Usuario' : 'Administrador'}</td>
                </tr>
            ))}
        </table>
    </div>
    </>
  )
}

export default Users
