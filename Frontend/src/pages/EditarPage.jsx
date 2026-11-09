import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { actualizarProducto, obtenerProducto } from "../api/productosApi";
import FormularioProducto from "../components/FormularioProducto";

function EditarPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(setProducto)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [id]);

  async function manejarEnvio(datos) {
    await actualizarProducto(id, datos);
    navigate("/", { state: { mensaje: "Producto actualizado correctamente" } });
  }

  let contenido;
  if (cargando) {
    contenido = <p>Cargando producto...</p>;
  } else if (error) {
    contenido = <p>Error: {error}</p>;
  } else {
    contenido = (
      <FormularioProducto
        valoresIniciales={{
          nombre: producto.nombre,
          descripcion: producto.descripcion ?? "",
          precio: String(producto.precio),
          stock: String(producto.stock),
          categoria: producto.categoria,
        }}
        textoBoton="Guardar cambios"
        onEnviar={manejarEnvio}
      />
    );
  }

  return (
    <div>
      <h1>Editar producto</h1>
      {contenido}
    </div>
  );
}

export default EditarPage;