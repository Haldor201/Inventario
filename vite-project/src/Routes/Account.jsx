import React, { useContext, useEffect, useState } from "react";
import { SfpContext } from '../context/GeneralContext.jsx';
import Spinner from 'react-bootstrap/Spinner'; // Opcional: para un spinner de carga

export default function Account() {
  const { fetchProfile, user } = useContext(SfpContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await fetchProfile();
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [fetchProfile]); // El array de dependencias asegura que se ejecuta solo cuando fetchProfile cambia

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container my-5 text-center">
        <h4>No estás autenticado. Por favor, inicia sesión.</h4>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: '400px' }}>
        <div className="card-header text-center">
          <h5 className="card-title mb-0">Información de la Cuenta</h5>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Email:</strong> {user.email}
            </li>
            <li className="list-group-item">
              <strong>Rol:</strong> {user.role}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}