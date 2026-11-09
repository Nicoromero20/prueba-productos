const BASE_URL = "http://127.0.0.1:5000/productos";

export class ErrorApi extends Error {
  constructor(mensaje, estado, detalles = {}) {
    super(mensaje);
    this.estado = estado;
    this.detalles = detalles;
  }
}

async function solicitar(url, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      ...opciones,
      headers: opciones.body ? { "Content-Type": "application/json" } : {},
    });
  } catch {
    throw new ErrorApi("No se pudo conectar con el servidor", 0);
  }

  if (respuesta.status === 204) {
    return null;
  }

  const datos = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    throw new ErrorApi(
      datos?.error ?? "Error inesperado",
      respuesta.status,
      datos?.detalles ?? {}
    );
  }

  return datos;
}

export const listarProductos = () => solicitar(BASE_URL);

export const obtenerProducto = (id) => solicitar(`${BASE_URL}/${id}`);

export const crearProducto = (producto) =>
  solicitar(BASE_URL, { method: "POST", body: JSON.stringify(producto) });

export const actualizarProducto = (id, producto) =>
  solicitar(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(producto),
  });

export const eliminarProducto = (id) =>
  solicitar(`${BASE_URL}/${id}`, { method: "DELETE" });
