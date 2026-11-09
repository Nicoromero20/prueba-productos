function CampoFormulario({ etiqueta, nombre, valor, onChange, error, tipo = "text", ...resto }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={nombre}>{etiqueta}</label>
      <br />
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={valor}
        onChange={onChange}
        {...resto}
      />
      {error && (
        <p role="alert" style={{ color: "crimson", margin: "0.25rem 0 0" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default CampoFormulario;