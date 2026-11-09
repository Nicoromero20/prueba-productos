import { useState } from "react";

import CampoFormulario from "./CampoFormulario";

const VACIO = { nombre: "", descripcion: "", precio: "", stock: "", categoria: "" };

function validar(valores) {
  const errores = {};

  if (valores.nombre.trim().length < 3) {
    errores.nombre = "El nombre es obligatorio y debe tener al menos 3 caracteres";
  }

  if (!valores.categoria.trim()) {
    errores.categoria = "La categoría es obligatoria";
  }

  const precio = Number(valores.precio);
  if (valores.precio.trim() === "" || !Number.isFinite(precio)) {
    errores.precio = "El precio es obligatorio y debe ser un número";
  } else if (precio <= 0) {
    errores.precio = "El precio debe ser mayor a 0";
  }

  const stock = Number(valores.stock);
  if (valores.stock.trim() === "" || !Number.isInteger(stock)) {
    errores.stock = "El stock es obligatorio y debe ser un número entero";
  } else if (stock < 0) {
    errores.stock = "El stock no puede ser negativo";
  }

  return errores;
}

function FormularioProducto({ valoresIniciales = VACIO, textoBoton, onEnviar }) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setValores({ ...valores, [name]: value });
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorGeneral(null);

    const erroresLocales = validar(valores);
    setErrores(erroresLocales);
    if (Object.keys(erroresLocales).length > 0) {
      return;
    }

    setEnviando(true);
    try {
      await onEnviar({
        nombre: valores.nombre.trim(),
        descripcion: valores.descripcion.trim() || null,
        precio: Number(valores.precio),
        stock: Number(valores.stock),
        categoria: valores.categoria.trim(),
      });
    } catch (e) {
      setErrores(e.detalles ?? {});
      setErrorGeneral(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <CampoFormulario
        etiqueta="Nombre"
        nombre="nombre"
        valor={valores.nombre}
        onChange={manejarCambio}
        error={errores.nombre}
      />
      <CampoFormulario
        etiqueta="Descripción (opcional)"
        nombre="descripcion"
        valor={valores.descripcion}
        onChange={manejarCambio}
        error={errores.descripcion}
      />
      <CampoFormulario
        etiqueta="Categoría"
        nombre="categoria"
        valor={valores.categoria}
        onChange={manejarCambio}
        error={errores.categoria}
      />
      <CampoFormulario
        etiqueta="Precio"
        nombre="precio"
        tipo="number"
        step="0.01"
        valor={valores.precio}
        onChange={manejarCambio}
        error={errores.precio}
      />
      <CampoFormulario
        etiqueta="Stock"
        nombre="stock"
        tipo="number"
        valor={valores.stock}
        onChange={manejarCambio}
        error={errores.stock}
      />

      {errorGeneral && <p role="alert" style={{ color: "crimson" }}>{errorGeneral}</p>}

      <button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : textoBoton}
      </button>
    </form>
  );
}

export default FormularioProducto;