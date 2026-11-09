import { Link } from "react-router-dom";

function TablaProductos({ productos, onEliminar }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombre}</td>
            <td>{p.descripcion ?? "—"}</td>
            <td>{p.categoria}</td>
            <td>${p.precio.toFixed(2)}</td>
            <td>{p.stock}</td>
            <td>{p.fecha_creacion}</td>
            <td>
              <Link to={`/productos/${p.id}/editar`}>Editar</Link>{" "}
              <button type="button" onClick={() => onEliminar(p)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TablaProductos;