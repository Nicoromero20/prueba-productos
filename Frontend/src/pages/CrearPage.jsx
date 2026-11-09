import { useNavigate } from "react-router-dom";

import { crearProducto } from "../api/productosApi";
import FormularioProducto from "../components/FormularioProducto";

function CrearPage() {
  const navigate = useNavigate();

  async function manejarEnvio(producto) {
    await crearProducto(producto);
    navigate("/", { state: { mensaje: "Producto creado correctamente" } });
  }

  return (
    <div>
      <h1>Nuevo producto</h1>
      <FormularioProducto textoBoton="Crear producto" onEnviar={manejarEnvio} />
    </div>
  );
}

export default CrearPage;