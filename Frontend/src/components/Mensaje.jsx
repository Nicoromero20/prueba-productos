function Mensaje({ tipo, texto, onCerrar }) {
  const color = tipo === "exito" ? "seagreen" : "crimson";

  return (
    <div
      role={tipo === "exito" ? "status" : "alert"}
      style={{
        border: `1px solid ${color}`,
        color,
        padding: "0.5rem 1rem",
        marginBottom: "1rem",
      }}
    >
      {texto}
      {onCerrar && (
        <button onClick={onCerrar} aria-label="Cerrar mensaje" style={{ marginLeft: "1rem" }}>
          ×
        </button>
      )}
    </div>
  );
}

export default Mensaje;