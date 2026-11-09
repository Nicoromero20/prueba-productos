import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { eliminarProducto, listarProductos } from "../api/productosApi";
import Mensaje from "../components/Mensaje";
import ModalConfirmacion from "../components/ModalConfirmacion";
import TablaProductos from "../components/TablaProductos";

function ListadoPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(
    location.state?.mensaje ? { tipo: "exito", texto: location.state.mensaje } : null
  );
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    listarProductos()
      .then(setProductos)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    if (location.state?.mensaje) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  async function confirmarEliminacion() {
    setEliminando(true);
    try {
      await eliminarProducto(productoAEliminar.id);
      setProductos((actuales) => actuales.filter((p) => p.id !== productoAEliminar.id));
      setMensaje({
        tipo: "exito",
        texto: `Producto «${productoAEliminar.nombre}» eliminado correctamente`,
      });
    } catch (e) {
      setMensaje({ tipo: "error", texto: e.message });
    } finally {
      setEliminando(false);
      setProductoAEliminar(null);
    }
  }

  let contenido;
  if (cargando) {
    contenido = <p>Cargando productos...</p>;
  } else if (error) {
    contenido = <p>Error: {error}</p>;
  } else if (productos.length === 0) {
    contenido = <p>No hay productos registrados.</p>;
  } else {
    contenido = <TablaProductos productos={productos} onEliminar={setProductoAEliminar} />;
  }

  return (
    <div>
      <h1>Productos</h1>

      {mensaje && (
        <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} onCerrar={() => setMensaje(null)} />
      )}

      {contenido}

      {productoAEliminar && (
        <ModalConfirmacion
          titulo="Eliminar producto"
          texto={`¿Seguro que quieres eliminar «${productoAEliminar.nombre}»? Esta acción no se puede deshacer.`}
          textoConfirmar="Eliminar"
          onConfirmar={confirmarEliminacion}
          onCancelar={() => setProductoAEliminar(null)}
          procesando={eliminando}
        />
      )}
    </div>
  );
}

export default ListadoPage;