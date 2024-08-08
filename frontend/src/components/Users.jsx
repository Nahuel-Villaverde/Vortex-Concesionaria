import React from 'react';
import './Users.css'; // Si tienes estilos, asegúrate de que este archivo exista

const Users = ({ users }) => {
  return (
    <div className="users-container">
      <h1>Lista de Usuarios</h1>
      {users.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
